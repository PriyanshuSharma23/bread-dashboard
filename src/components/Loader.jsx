export const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-14 w-14 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-slate-100"></div>
      </div>
    </div>
  );
};
