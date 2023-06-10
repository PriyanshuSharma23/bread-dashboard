import React, { useState, useRef, useEffect } from "react";

import { QuestionBlock } from "./components/QuestionBlock";
import { BranchQuestion } from "./types/question";
import { AddQuestion } from "./components/AddQuestion";
import { useFormQuery } from "./hooks/useFormQuery";
import { useParams } from "react-router-dom";

import { useFormQuestions } from "./hooks/useFormQuestions";
import { useFormMutation } from "./hooks/mutations/updateForm";

function App() {
  let { formId } = useParams();
  const formQuery = useFormQuery({ formId });
  const formMutation = useFormMutation({ formId });
  const questionsQuery = useFormQuestions({ formId });
  console.log("questionsQuery", questionsQuery);

  const [formQuestions, setFormQuestions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [surveyTitle, setSurveyTitle] = useState("");
  const titleRef = useRef(null);

  console.log("formQuestions", formQuestions);

  useEffect(() => {
    if (formQuery.isSuccess) {
      // setFormQuestions(formQuery.data.questions);
      setSurveyTitle(formQuery.data.formName);
    }
  }, [formQuery.isSuccess, formQuery.data]);

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="fixed left-0 top-0 flex items-center rounded-br-lg bg-white px-4 py-2 shadow-md">
        <div className="flex text-ellipsis text-2xl">
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

      <div className="app mx-auto flex  min-h-screen flex-col items-center  gap-8 bg-slate-100  pb-44 pt-20">
        {formQuestions.map((formQuestion, idx) => (
          <QuestionBlock
            question={formQuestion}
            updateQuestion={updateQuestion}
            questionIdx={idx}
            key={idx}
            questions={formQuestions}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
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
              Synced 2 minutes ago.
              {syncButtonSvg}
            </button>
          </div>

          <button
            className="rounded-md bg-neutral-800 px-4 py-2 text-white"
            onClick={() => {
              const questionsJSON = convertQuestionsToJSON(formQuestions);
              console.log(JSON.stringify(questionsJSON));
            }}
          >
            Share Survey
          </button>
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

  function updateQuestion({ idx, question }) {
    setFormQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[idx] = question;
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
    formMutation.mutate({
      form: formId,
      updates: {
        formName: surveyTitle,
      },
    });
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
