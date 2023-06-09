import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Option } from "./Option";
import { TextQuestion } from "../types/question";

// updateOption: (option) => void;

export function BranchOption({
  option,
  optionIdx,
  updateBranchOption,

  //   rendering options
  questions,
  currQuestionIdx,

  //   actions
  addQuestion,
  deleteOption,
}) {
  console.log("optionIdx", optionIdx);

  return (
    <div className="flex w-full gap-2">
      <Option
        value={option.text}
        onChange={(e) =>
          updateBranchOption({ ...option, text: e.target.value })
        }
        className="w-full flex-1"
        onDelete={deleteOption}
        placeholder={`Option ${optionIdx + 1}`}
      />
      <div className="relative">
        <Listbox
          value={option.next}
          onChange={(next) => {
            if (next === "add-new-question") {
              const newQuestionId = addQuestion({
                question: new TextQuestion({}),
                idx: currQuestionIdx,
              });

              next = newQuestionId;
            }

            updateBranchOption({ ...option, next });
          }}
        >
          <Listbox.Button className="relative flex min-w-max items-center  justify-center gap-1 rounded-full bg-neutral-800 px-4 py-2 text-sm text-white">
            {option.next === null ? "Branch To" : option.next}
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
                "absolute right-0 z-50 mt-1 max-h-60  w-max  max-w-max overflow-auto  rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              }
            >
              {questions
                .filter((q, idx) => idx > currQuestionIdx)
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
                          <span className="text-sm">{question.id}</span> <br />
                          {question.text}
                        </span>
                      </div>
                    )}
                  </Listbox.Option>
                ))}

              <Listbox.Option
                className={({ active }) =>
                  `${
                    active ? "bg-neutral-100 text-neutral-900" : "text-gray-900"
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
    </div>
  );
}
