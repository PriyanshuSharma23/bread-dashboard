import { TextQuestion } from "../types/question";

export function AddQuestion({ addQuestion }) {
  return (
    <button
      onClick={() => addQuestion({ question: new TextQuestion({}) })}
      className=" grid  h-44 w-[80%]  max-w-2xl  place-content-center rounded-3xl border border-dashed border-neutral-600  px-6 py-3 text-neutral-800  focus-within:outline-1 focus-within:outline-offset-4 focus-within:outline-neutral-600/30"
    >
      <span className="mx-auto flex  h-20 w-20 items-center justify-center rounded-full bg-neutral-500 text-4xl text-white">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 17H33"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 1V33"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="mt-4 text-2xl font-medium text-neutral-500">
        Add a question
      </span>
    </button>
  );
}
