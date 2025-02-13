export default function LineErro({ className, children }) {
  return (
    <>
      <span
        className={`text-red-500 text-sm flex items-center gap-2 ${
          className || ""
        }`}
      >
        {children}
      </span>
    </>
  );
}
