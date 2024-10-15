"use client";

interface ICommonPage {
  children?: React.ReactNode;
  title?: string;
  rightOf?: React.ReactNode;
}

export default function CommonPage({ title, children, rightOf }: ICommonPage) {
  return (
    <div className="w-full max-w-6xl">
      <div
        className={`mb-12 pb-3 flex flex-col gap-4 md:flex-row md:gap-0 items-center justify-between ${
          title ? "border-b-4 border-b-slate-200" : ""
        }`}
      >
        {title && (
          <h1 className="font-bold text-3xl md:text-5xl m-0">{title}</h1>
        )}
        {rightOf}
      </div>
      <section>{children}</section>
    </div>
  );
}
