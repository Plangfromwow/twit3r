export function Container({
  children,
  classNames = "",
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return <div className={`m-auto max-w-xl bg-slate-400 ${classNames}`}>{children}</div>;
}
