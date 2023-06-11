import React, { useState, useRef, useEffect } from "react";

import { QuestionBlock } from "./components/QuestionBlock";
import { BranchQuestion } from "./types/question";
import { AddQuestion } from "./components/AddQuestion";
import { useFormQuery } from "./hooks/useFormQuery";
import { Link, useParams } from "react-router-dom";

import { useFormQuestions } from "./hooks/useFormQuestions";
import { relativeTime } from "./utils/relTime";
import { useFormMutation } from "./hooks/mutations/updateForm";
import { useSyncQuestionsMutation } from "./hooks/mutations/syncQuestions";
import { ShareWindow } from "./components/Share";
import { Loader } from "./components/Loader";
import { Switch } from "@headlessui/react";

function App() {
  let { formId } = useParams();
  const formQuery = useFormQuery({ formId });
  const formMutation = useFormMutation({ formId });
  const questionsQuery = useFormQuestions({ formId });

  const [formQuestions, setFormQuestions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [surveyTitle, setSurveyTitle] = useState("");
  const titleRef = useRef(null);
  const syncDBMutation = useSyncQuestionsMutation({ formId });
  let debounceTimerRef = useRef(null);
  let updatedOnce = useRef(false);

  const [shareOpen, setShareOpen] = useState(false);

  console.log("Fuck me sideways", formQuestions);

  useEffect(() => {
    if (formQuery.isSuccess && formQuery.data && !formQuery.isFetching) {
      setSurveyTitle(formQuery.data.formName);
      setLastSyncTime(new Date(formQuery.data.updatedAt.seconds * 1000));
    }
  }, [formQuery.isSuccess, formQuery.data, formQuery.isFetching]);

  useEffect(() => {
    console.log("questionsQuery.isSuccess", questionsQuery.data);
    setLastSyncTime(new Date());
    if (questionsQuery.isSuccess && updatedOnce.current === false) {
      setFormQuestions(questionsQuery.data);
      updatedOnce.current = false;
    }
  }, [questionsQuery.isSuccess, questionsQuery.data]);

  useEffect(() => {
    // debouching the sync with db
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);

      console.log("Debouncing sync");

      debounceTimerRef.current = setTimeout(() => {
        // execute the sync
        syncDBMutation.mutate({
          formQuestions,
        });
      }, 2000);
    } else {
      debounceTimerRef.current = setTimeout(() => {
        // execute the sync
        syncDBMutation.mutate({
          formQuestions,
        });
      }, 2000);
    }

    return () => {
      clearTimeout(debounceTimerRef.current);
    };
  }, [formQuestions]);

  useEffect(() => {
    let timeOut;
    if (editMode) {
      timeOut = setTimeout(() => {
        titleRef.current.focus();
      }, 0);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [editMode]);

  if (formQuery.isLoading) {
    return (
      <div className="fixed inset-0">
        <div className="m-auto">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <ShareWindow
        url={`www.google.com`}
        open={shareOpen}
        setOpen={setShareOpen}
        form={formQuery.data}
      />

      <div className="fixed right-1 top-1 flex items-center gap-2">
        For Volunteer
        <Switch
          checked={formQuery?.data.isVolunteer}
          onChange={() => {
            formMutation.mutate({
              form: formQuery.data,
              updates: {
                isVolunteer: !formQuery?.data.isVolunteer,
              },
            });
          }}
          disabled={formMutation.isLoading}
          className={`${
            formQuery.data.isVolunteer ? "bg-neutral-900" : "bg-neutral-700"
          }
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75
            disabled:opacity-50
          `}
        >
          <span className="sr-only">Volunteer</span>
          <span
            aria-hidden="true"
            className={`${
              formQuery.data.isVolunteer ? "translate-x-5" : "translate-x-0"
            }
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <button
          className=" grid h-16 w-16 place-content-center rounded-full  p-1  hover:bg-neutral-200 active:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          disabled={formQuery.data.isDraft}
          onClick={() => setShareOpen((prev) => !prev)}
        >
          <svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.3156 16.6578L8.6938 13.3469M8.68439 10.6578L15.3125 7.34377M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18ZM21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
      <div className="fixed left-0 top-0 z-20 flex items-center rounded-br-lg bg-white px-4 py-2 shadow-md">
        <div className="flex items-center gap-2 text-ellipsis text-2xl">
          <Link to={"/forms"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L20 12M4 12L10 6M4 12L10 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <input
            type="text"
            className="h-full w-full text-ellipsis bg-transparent text-2xl outline-none focus:min-w-max"
            placeholder="Untitled Form"
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
            ref={titleRef}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setEditMode(false);
              }
            }}
          />
        </div>
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className="rounded-lg p-2 active:bg-slate-100"
        >
          {editPen}
        </button>
        {formQuery?.data.formName !== surveyTitle && (
          <>
            <button
              onClick={updateTitle}
              className="rounded-lg p-2 active:bg-slate-100"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 9L9.99998 16L6.99994 13"
                  stroke="#001A72"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => setSurveyTitle(formQuery.data.formName)}
              className="rounded-lg p-2 active:bg-slate-100"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 8L8 16M8.00003 8L16 16"
                  stroke="#001A72"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="app mx-auto flex  min-h-screen flex-col items-center  gap-8 bg-slate-100  px-2 pb-44 pt-20">
        {formQuestions.map((formQuestion, idx) => (
          <QuestionBlock
            question={formQuestion}
            updateQuestion={updateQuestion}
            questionIdx={idx}
            key={idx}
            questions={formQuestions}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
            setFormQuestions={setFormQuestions}
          />
        ))}
        {formQuestions[formQuestions.length - 1]?.constructor !==
          BranchQuestion &&
          formQuestions.length === 0 && (
            <AddQuestion addQuestion={addQuestion} />
          )}
      </div>
      <div className=" fixed inset-x-0 bottom-0 flex h-20  items-center  bg-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-2 lg:px-32">
          <div className="flex flex-col">
            <span className="text-lg">
              Total Questions:{" "}
              <span className="text-2xl font-bold">{formQuestions.length}</span>
            </span>
            <button className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 hover:underline">
              {lastSyncTime && `Synced ${relativeTime(lastSyncTime)}`}
              {syncButtonSvg}
            </button>
          </div>

          <div className="flex items-center gap-8">
            <span
              className={`rounded-full px-4 py-1 ${
                formQuery.data.isDraft ? "bg-orange-300" : "bg-green-300"
              }`}
            >
              {formQuery.data.isDraft ? "Draft" : "Published"}
            </span>

            {formQuery.data.isDraft ? (
              <button
                className="rounded-md bg-neutral-800 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                disabled={formMutation.isLoading || syncDBMutation.isLoading}
                onClick={() => {
                  formQuestions.forEach((question) => {
                    if ("checkValid" in question) {
                      try {
                        if (question.checkValid()) {
                          syncDBMutation.mutate({
                            formQuestions,
                          });
                          formMutation.mutate({
                            updates: {
                              isDraft: false,
                            },
                          });
                        }
                      } catch (e) {
                        alert(e.message);
                        return;
                      }
                    }
                  });
                }}
              >
                Publish Survey
              </button>
            ) : (
              <button
                className="rounded-md bg-neutral-800 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                disabled={formMutation.isLoading}
                onClick={() => {
                  formMutation.mutate({
                    updates: {
                      isDraft: true,
                    },
                  });
                }}
              >
                Draft and Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function addQuestion({ question, idx = formQuestions.length - 1 }) {
    // setFormQuestions((prevQuestions) => [...prevQuestions, question]);

    setFormQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(idx + 1, 0, question);
      return newQuestions;
    });

    return question.id;
  }

  function updateQuestion({ idx, questionFn }) {
    setFormQuestions((prevQuestions) => {
      const newQuestions = prevQuestions.map((q, i) => {
        return i === idx ? questionFn(q) : q;
      });
      return newQuestions;
    });
  }

  function deleteQuestion({ idx }) {
    setFormQuestions((prevQuestions) => {
      let delItem = prevQuestions.splice(idx, 1);

      // check all questions if they have a branch option that points to the deleted question
      let newQuestions = prevQuestions.map((question) => {
        if (question.constructor === BranchQuestion) {
          let newBranchOptions = question.branchOptions.filter((option) => {
            return option.next !== delItem[0].id;
          });

          return new question.constructor({
            ...question.getObj(),
            options: newBranchOptions,
          });
        } else {
          if (question.next === delItem[0].id) {
            return new question.constructor({
              ...question.getObj(),
            });
          } else {
            return question;
          }
        }
      });

      return newQuestions;
    });
  }

  function updateTitle() {
    formMutation.mutate(
      {
        form: formId,
        updates: {
          formName: surveyTitle,
        },
      },
      {
        onSuccess: () => {
          setLastSyncTime(new Date());
        },
      }
    );
  }
}

function convertQuestionsToJSON(questions) {
  let questionsJSON = [];

  for (const question of questions) {
    if ("checkValid" in question) {
      console.log(question.checkValid);
    }

    try {
      question.checkValid();
      questionsJSON.push(question.getObj());
    } catch (e) {
      alert(e.message);
      return;
    }
  }

  return questionsJSON;
}

export default App;

const editPen = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 16L3.46967 15.4697C3.32902 15.6103 3.25 15.8011 3.25 16H4ZM17 3L17.5303 2.46967C17.2374 2.17678 16.7626 2.17678 16.4697 2.46967L17 3ZM21 7L21.5303 7.53033C21.8232 7.23744 21.8232 6.76256 21.5303 6.46967L21 7ZM8 20V20.75C8.19891 20.75 8.38968 20.671 8.53033 20.5303L8 20ZM4 20H3.25C3.25 20.4142 3.58579 20.75 4 20.75V20ZM12 19.25C11.5858 19.25 11.25 19.5858 11.25 20C11.25 20.4142 11.5858 20.75 12 20.75V19.25ZM20.5 20.75C20.9142 20.75 21.25 20.4142 21.25 20C21.25 19.5858 20.9142 19.25 20.5 19.25V20.75ZM4.53033 16.5303L17.5303 3.53033L16.4697 2.46967L3.46967 15.4697L4.53033 16.5303ZM16.4697 3.53033L20.4697 7.53033L21.5303 6.46967L17.5303 2.46967L16.4697 3.53033ZM20.4697 6.46967L7.46967 19.4697L8.53033 20.5303L21.5303 7.53033L20.4697 6.46967ZM8 19.25H4V20.75H8V19.25ZM4.75 20V16H3.25V20H4.75ZM13.4697 6.53033L17.4697 10.5303L18.5303 9.46967L14.5303 5.46967L13.4697 6.53033ZM12 20.75H20.5V19.25H12V20.75Z"
      fill="currentColor"
    />
  </svg>
);

const syncButtonSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 7V10H9M18 17V14H15M17 10C16.4904 8.99609 15.6247 8.16548 14.5334 7.63331C13.442 7.10113 12.1842 6.89624 10.9494 7.04949C9.71458 7.20274 8.56967 7.70583 7.68719 8.48297L6 9.81861M7 14C7.50963 15.0039 8.37532 15.8345 9.46665 16.3667C10.558 16.8989 11.8158 17.1038 13.0506 16.9505C14.2854 16.7973 15.4303 16.2942 16.3128 15.517L18 14.1814"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
