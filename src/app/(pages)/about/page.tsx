"use client";
import CommonPage from "@/app/app-components/core/common-page";
import DevGitHub from "./dev-github";
import TechContainer from "./tech-container";

export default function About() {
  return (
    <CommonPage title="About this project" rightOf={<TechContainer />}>
      <article className="space-y-12">
        <AboutParagraph title="What is this project?">
          Shorten (SHRT) is a URL shortening service that allows users to
          shorten long URLs into short, shorter-to-embed links.
        </AboutParagraph>
        <AboutParagraph title="Why did I create this project?">
          I created this project to learn and practice FullStack development,
          using both frontend and backend technologies, authentication and
          authorization strategies, as well as practice working with MongoDB as
          a document-based database and Redis as a caching database service.
        </AboutParagraph>
        <AboutParagraph title="How does it work?">
          Users can paste a long URL into the input field, and the server will
          generate a unique short URL that will redirect to the original URL.
          Authenticated users can create and manage links, as well as deriving
          business-value from their analysis dashboard.
          <br />
          <br />
          I'm using MongoDB for storing Users, Links, and Stats, Redis for
          storing <i>shortId-to-URL</i> and quickly accessing it. For each visit
          on a redirect link the system will register an event and include the
          redirected user's geolocation which is retrieved using Vercel
          Functions.
          <br />
          <br />
          The frontend is built with Next.js, and the backend is built with
          Express. I'm using Next.js API as a facade to the express backend for
          various reasons such as dealing with blockage of third-party cookies,
          securly enforcing illegal visits, etc...
        </AboutParagraph>
        <DevGitHub />
      </article>
    </CommonPage>
  );
}

interface IAboutParagraph {
  title: string;
  children?: React.ReactNode;
}

function AboutParagraph({ title, children }: IAboutParagraph) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-slate-800">{title}</h3>
      <p className="border-l-4 pt-1 pl-4 ml-[0.55rem]">{children}</p>
    </div>
  );
}
