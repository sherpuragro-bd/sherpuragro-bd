export default function LineErro({ children }) {
  return (
    <>
      <span className="text-red-500 text-sm flex items-center gap-2">
        {children}
      </span>
    </>
  );
}
