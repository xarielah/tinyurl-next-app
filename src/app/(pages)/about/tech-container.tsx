"use client";
import {
  ExpressJS,
  MongoDB,
  NextJS,
  ReactJS,
  Redis,
  TypeScript,
} from "./tech-svgs";

export default function TechContainer() {
  return (
    <article className="flex items-center gap-3">
      <button className="tech-icons">
        <TypeScript />
      </button>
      <button className="tech-icons">
        <NextJS />
      </button>
      <button className="tech-icons">
        <ReactJS />
      </button>
      <button className="tech-icons">
        <Redis />
      </button>
      <button className="tech-icons">
        <MongoDB />
      </button>
      <button className="tech-icons">
        <ExpressJS />
      </button>
    </article>
  );
}
