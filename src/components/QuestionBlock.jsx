import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AddOption } from "./AddOption";
import {
  BranchQuestion,
  OptionQuestion,
  QuestionFromType,
  SliderQuestion,
  QuestionIconFromType,
  TextQuestion,
} from "../types/question";
import { allQuestionTypes } from "../types/question";
import { Option } from "./Option";
import { BranchOption } from "./BranchOption";

export const QuestionBlock = ({
  question,
  updateQuestion,
  questionIdx,
  questions,
  addQuestion,
  deleteQuestion,
}) => {
  let questionType = question.type;
  const setQuestionType = (type) => {
    updateQuestion({
      idx: questionIdx,
      question: QuestionFromType(type, question),
    });
  };

  const update = (key) => (value) => {
    updateQuestion({
      idx: questionIdx,
      question: new question.constructor({
        ...question.getObj(),
        [key]: value,
      }),
    });
  };

  const isBranch = question.constructor === BranchQuestion;
  const isOption = question.constructor === OptionQuestion;
  const isText = question.constructor === TextQuestion;
  const isSlider = question.constructor === SliderQuestion;

  return (
    <div className="group/main-card relative w-[80%]  max-w-2xl rounded-3xl  border-black  bg-white px-6 py-4 text-neutral-800 shadow-md lg:min-w-[36rem]">
      <button
        onClick={() => deleteQuestion({ idx: questionIdx })}
        className={`pointer-events-none  absolute -right-1 -top-1 flex  h-4 w-4 items-center justify-center rounded-full bg-neutral-800 opacity-0  transition-opacity group-hover/main-card:pointer-events-auto group-hover/main-card:opacity-100`}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3857 8.17773L8.38574 16.1777"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.38574 8.17773L16.3857 16.1777"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex h-[3.25rem] overflow-hidden rounded-full border border-neutral-800 focus-within:outline-1 focus-within:outline-offset-4 focus-within:outline-neutral-600/30">
        <input
          type="text"
          className="h-full w-full rounded-2xl px-4 outline-none"
          placeholder="Type your question here*"
          value={question.text}
          onChange={(e) => update("text")(e.target.value)}
        />
        <div className="h-full w-1/4  bg-neutral-800">
          <Listbox value={questionType} onChange={setQuestionType}>
            <Listbox.Button className="mx-auto flex h-full items-center justify-center gap-1 text-white disabled:opacity-40">
              <span>{question.constructor.getIcon()}</span>
              <span>
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.83301 10L9.99967 15L14.1663 10"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={
                  "absolute z-50  mt-1 max-h-60 w-full max-w-max  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                }
              >
                {allQuestionTypes.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      `${
                        active
                          ? "bg-neutral-100 text-neutral-900"
                          : "text-gray-900"
                      }
                            relative cursor-default select-none py-2 pl-10 pr-4`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } ml-4 block truncate`}
                        >
                          {option}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-neutral-600" : "text-neutral-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3 `}
                          >
                            {QuestionIconFromType(option, {})}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>
      <div className="mt-4 flex items-center ">
        <div className=" h-12  w-full max-w-[15rem] flex-shrink-0 overflow-hidden rounded-full border border-neutral-800  py-2">
          <input
            type="text"
            className="h-full w-full  px-4 outline-none"
            placeholder="Key*"
            required
            value={question.key}
            onChange={(e) => update("key")(e.target.value)}
          />
        </div>
        <Wand selected={question.aiEnhance} setSelected={update("aiEnhance")} />
        {!isBranch && (
          <div className="relative ml-8">
            <Listbox
              disabled={question.key === "" || question.text === ""}
              value={question.next}
              onChange={(next) => {
                if (next === "add-new-question") {
                  const newQuestionId = addQuestion({
                    question: new TextQuestion({}),
                    idx: questionIdx,
                  });

                  next = newQuestionId;
                }

                update("next")(next);
              }}
            >
              <div className="group relative">
                <Listbox.Button className="relative flex min-w-max items-center  justify-center gap-1 rounded-full bg-neutral-800 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-30">
                  {question.next === undefined ? "Branch To" : question.next}
                  <span>
                    <svg
                      width="20"
                      height="24"
                      viewBox="0 0 20 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.83301 10L9.99967 15L14.1663 10"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                {/* tooltip */}
                {(question.key === "" || question.text === "") && (
                  <div className="pointer-events-none absolute left-0 top-full z-50 mt-2  h-12 w-48 rounded-md bg-neutral-600 p-2 text-xs text-white opacity-0 shadow-md group-hover:opacity-100">
                    Please fill in the question and key before branching
                  </div>
                )}
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={
                    "absolute right-0 z-50 mt-1 max-h-60  w-max  max-w-max overflow-auto  rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  }
                >
                  {questions
                    .filter((q, idx) => idx > questionIdx)
                    .map((question) => (
                      <Listbox.Option key={question.id} value={question.id}>
                        {({ selected, active }) => (
                          <div
                            className={`

                        ${
                          selected
                            ? "bg-neutral-100 text-neutral-900"
                            : "font-normal"
                        }

                        ${
                          active
                            ? "bg-neutral-100 text-neutral-900"
                            : "text-gray-900"
                        } relative flex max-w-xs cursor-pointer select-none items-center gap-1 overflow-hidden text-ellipsis px-7 py-2`}
                          >
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } ml-4 block truncate text-xs`}
                            >
                              <span className="text-sm">{question.id}</span>{" "}
                              <br />
                              {question.text}
                            </span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}

                  <Listbox.Option
                    className={({ active }) =>
                      `${
                        active
                          ? "bg-neutral-100 text-neutral-900"
                          : "text-gray-900"
                      } relative flex cursor-pointer select-none items-center gap-1 px-7 py-2`
                    }
                    value={"add-new-question"}
                  >
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.4502 7.44751V17.4475"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.4502 12.4475H17.4502"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.4502 21.4475C17.4208 21.4475 21.4502 17.4181 21.4502 12.4475C21.4502 7.47695 17.4208 3.44751 12.4502 3.44751C7.47964 3.44751 3.4502 7.47695 3.4502 12.4475C3.4502 17.4181 7.47964 21.4475 12.4502 21.4475Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Add New Question
                  </Listbox.Option>
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        )}
      </div>

      {isText && <div className="mt-10" />}

      {isOption && (
        <div className="mt-8 flex flex-wrap gap-2 px-2">
          {/* <Option /> */}
          {question.options.map((option, idx) => (
            <Option
              key={idx}
              option={option}
              onDelete={() => {
                update("options")(question.options.filter((_, i) => i !== idx));
              }}
              className={"max-w-[9rem] "}
              onChange={(e) => {
                update("options")(
                  question.options.map((o, i) =>
                    i === idx ? e.target.value : o
                  )
                );
              }}
              placeholder={`Option ${idx + 1}`}
            />
          ))}
          <AddOption
            onClick={() => {
              update("options")([...question.options, ""]);
            }}
            className={`max-w-max border-neutral-600`}
          />
        </div>
      )}

      {isBranch && (
        <div className="mt-8 flex flex-col gap-2 px-2">
          {question.options.map((option, idx) => (
            <BranchOption
              key={idx}
              option={option}
              optionIdx={idx}
              // update={update}
              updateBranchOption={(newOption) => {
                update("options")(
                  question.options.map((o, i) => (i === idx ? newOption : o))
                );
              }}
              questions={questions}
              currQuestionIdx={questionIdx}
              addQuestion={addQuestion}
              deleteOption={() => {
                update("options")(question.options.filter((_, i) => i !== idx));
              }}
            />
          ))}

          <AddOption
            onClick={() => {
              update("options")([
                ...question.options,
                { next: null, option: "" },
              ]);
            }}
            className={`w-full border-neutral-600`}
          />
        </div>
      )}

      {isSlider && (
        <div className="mt-8 flex flex-col gap-2 px-2">
          <div className="flex items-center gap-2">
            <span className="w-16 text-neutral-700">Min</span>
            <input
              type="number"
              className="w-full max-w-[15rem] flex-shrink-0 overflow-hidden rounded-sm border border-dashed border-neutral-500  px-2 py-1"
              placeholder="Min"
              required
              value={question.min}
              onChange={(e) => update("minRange")(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-16 text-neutral-700">Max</span>
            <input
              type="number"
              className="w-full max-w-[15rem] flex-shrink-0 overflow-hidden rounded-sm border border-dashed border-neutral-500  px-2 py-1"
              placeholder="Max"
              required
              value={question.max}
              onChange={(e) => update("maxRange")(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between px-3">
        <div className="flex gap-3">
          {!isBranch && (
            <div className="flex items-center accent-neutral-700">
              <input
                type="checkbox"
                id="required-check"
                className="mr-2 h-4 w-4"
                checked={question.required}
                onChange={(e) => update("required")(e.target.checked)}
              />
              <label htmlFor="required-check" className="">
                Required
              </label>
            </div>
          )}
          {isOption && (
            <div className="flex items-center accent-neutral-700">
              <input
                type="checkbox"
                id="multiple-choice"
                className="mr-2 h-4 w-4"
                checked={question.multipleCorrect}
                onChange={(e) => update("multipleCorrect")(e.target.checked)}
              />
              <label htmlFor="multiple-choice" className="">
                Multiple Choice
              </label>
            </div>
          )}
        </div>
        <span>
          Id:{" "}
          <span className="font-semibold text-neutral-700">{question.id}</span>
        </span>
      </div>
    </div>
  );
};

const Wand = ({ selected, setSelected, className, ...props }) => {
  return (
    <button
      className={` ml-8 flex items-center gap-1 ${className}}`}
      onClick={() => setSelected(!selected)}
      {...props}
    >
      {/* {selected ? { gradientWand } : { wand }} */}
      <img
        src={selected ? "/grad-wand.png" : "/wand.png"}
        className="h-8 w-8"
        alt="wand"
      />
      <span className={`${selected ? "gradient-text" : ""}`}>AI Enhance</span>
    </button>
  );
};
