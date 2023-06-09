import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AddOption } from "./AddOption";
import {
  BranchQuestion,
  OptionQuestion,
  QuestionFromType,
  QuestionIconFromType,
  TextQuestion,
  getIconFromInstance,
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
}) => {
  let questionType = question.type;
  const setQuestionType = (type) => {
    updateQuestion({
      idx: questionIdx,
      question: QuestionFromType(type, question.getObj()),
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

  return (
    <div className="w-[80%] max-w-2xl  rounded-3xl border-black  bg-white  px-6 py-4 text-neutral-800 shadow-md lg:min-w-[36rem]">
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
            <Listbox.Button className="mx-auto flex h-full items-center justify-center gap-1 text-white">
              <span>{getIconFromInstance(question)}</span>
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
                  "absolute mt-1 max-h-60 w-full max-w-max  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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

      <div className="mt-6 flex items-center justify-between px-3">
        <div className="flex gap-3">
          {(isOption || isText) && (
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
