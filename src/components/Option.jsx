export function Option({ onDelete, className, ...props }) {
  return (
    <div className={"group relative " + className}>
      <input
        className={`w-full rounded-md border border-neutral-800  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-600/30 `}
        type="text"
        placeholder="Option 1"
        {...props}
      />
      <button
        onClick={onDelete}
        className="pointer-events-none absolute -right-1 -top-1 flex  h-4 w-4 items-center justify-center rounded-full bg-neutral-800 opacity-0  transition-opacity group-hover:pointer-events-auto group-hover:opacity-100"
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
    </div>
  );
}
