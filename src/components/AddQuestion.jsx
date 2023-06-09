import { TextQuestion } from "../types/question";

export function AddQuestion({ addQuestion }) {
  return (
    <button
      onClick={() => addQuestion({ question: new TextQuestion({}) })}
      className="lg:min-w-[36rem grid  h-44 w-[80%]  max-w-2xl  place-content-center rounded-3xl border border-dashed border-neutral-600 bg-white px-6 py-3 text-neutral-800 shadow-md focus-within:outline-1 focus-within:outline-offset-4 focus-within:outline-neutral-600/30"
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900 text-4xl text-white">
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
    </button>
  );
}
