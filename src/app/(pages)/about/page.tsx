"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import ExpressContent from "./tech-content/express-content";
import MongoDBContent from "./tech-content/mongodb-content";
import NextJSContent from "./tech-content/nextjs-content";
import ReactJSContent from "./tech-content/reactjs-content";
import RedisContent from "./tech-content/redis-content";
import TSContent from "./tech-content/ts-content";
import ExpressJS from "./tech-svgs/express";
import MongoDB from "./tech-svgs/mongodb";
import NextJS from "./tech-svgs/nextjs";
import ReactJS from "./tech-svgs/reactjs";
import Redis from "./tech-svgs/redis";
import TypeScript from "./tech-svgs/typescript";

type DrawerData = {
  title: string;
  content: any;
};

type DrawerDataKeys =
  | "ts"
  | "redis"
  | "mongodb"
  | "reactjs"
  | "nextjs"
  | "express";
type DrawerDataObject = {
  [key in DrawerDataKeys]: DrawerData;
};

export default function About() {
  const github = "https://github.com/xarielah";
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const close = () => setDrawerOpen(false);
  const [data, setData] = useState<DrawerData>({
    title: "",
    content: () => <></>,
  });

  const techInformation: DrawerDataObject = {
    ts: {
      title: "TypeScript",
      content: TSContent,
    },
    redis: {
      title: "Redis",
      content: RedisContent,
    },
    mongodb: {
      title: "MongoDB",
      content: MongoDBContent,
    },
    reactjs: {
      title: "React",
      content: ReactJSContent,
    },
    nextjs: {
      title: "Next.js",
      content: NextJSContent,
    },
    express: {
      title: "Express",
      content: ExpressContent,
    },
  };

  const openTechInfo = (key: DrawerDataKeys) => {
    setData(techInformation[key]);
    setDrawerOpen(true);
  };

  return (
    <section>
      <TechDrawer data={data} close={close} isOpen={drawerOpen} />
      <div className="max-w-3xl space-y-8 mx-auto">
        <h1 className="font-bold text-4xl mb-2">About</h1>
        <p>
          TinyURL is a shortening urls service that{" "}
          <a href={github} className="font-bold" target="_blank">
            I
          </a>{" "}
          developed in order to learn more about web development, caching,
          Next.js server actions, authentication and governing data.
        </p>
        <p>The project includes the following technologies:</p>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col gap-2 space-y-8">
            <h2 className="font-bold text-2xl">Programming Languages:</h2>
            <article className="mt-8">
              <button className="tech-icons" onClick={() => openTechInfo("ts")}>
                <TypeScript />
              </button>
            </article>
          </div>
          <div className="flex flex-col gap-2 space-y-8 mt-8 md:mt-0">
            <h2 className="font-bold text-2xl">Frontend Technologies:</h2>
            <article className="space-x-2">
              <button
                className="tech-icons"
                onClick={() => openTechInfo("nextjs")}
              >
                <NextJS />
              </button>
              <button
                className="tech-icons"
                onClick={() => openTechInfo("reactjs")}
              >
                <ReactJS />
              </button>
            </article>
          </div>
        </div>
        <h2 className="font-bold text-2xl">Backend Technologies:</h2>
        <article className="space-x-2">
          <button className="tech-icons" onClick={() => openTechInfo("redis")}>
            <Redis />
          </button>
          <button
            className="tech-icons"
            onClick={() => openTechInfo("mongodb")}
          >
            <MongoDB />
          </button>
          <button
            className="tech-icons"
            onClick={() => openTechInfo("express")}
          >
            <ExpressJS />
          </button>
        </article>
      </div>
    </section>
  );
}

interface ITechDrawer {
  close: () => void;
  isOpen: boolean;
  data: DrawerData;
}

function TechDrawer({ close, isOpen, data }: ITechDrawer) {
  const { title, content: Content } = data;
  return (
    <Drawer open={isOpen}>
      <DrawerContent className="md:max-w-4xl mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-5xl">{title}</DrawerTitle>
          {/* <DrawerDescription className="text-xl"></DrawerDescription> */}
          <article className="space-y-4 mt-4">
            <Content />
          </article>
        </DrawerHeader>
        <DrawerFooter>
          <Button asChild className="w-max md:w-full mx-auto" onClick={close}>
            <DrawerClose>Close</DrawerClose>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
