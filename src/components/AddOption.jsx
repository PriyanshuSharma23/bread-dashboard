const plus = (
  <svg
    width={18}
    height={18}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 11H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 1V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AddOption = ({ children, className, ...props }) => {
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md border border-dashed px-4 py-2 ${className}`}
      {...props}
    >
      {plus}
      Add Option
    </button>
  );
};
