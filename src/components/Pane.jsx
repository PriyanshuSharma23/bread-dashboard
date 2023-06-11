export const Pane = ({ className, ...props }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 min-h-screen w-1/3 min-w-[24rem] max-w-xl ${className}}`}
      {...props}
    ></div>
  );
};
