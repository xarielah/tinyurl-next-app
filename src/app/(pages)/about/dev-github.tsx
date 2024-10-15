"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PartialGithubUser {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
}

export default function DevGitHub() {
  const [user, setUser] = useState<PartialGithubUser | null>();

  function saveGithubToCache(user: PartialGithubUser) {
    const userDto = {
      login: user.login,
      avatar_url: user.avatar_url,
      url: user.url,
      html_url: user.html_url,
    };
    sessionStorage.setItem("github", JSON.stringify(userDto));
    return userDto;
  }

  useEffect(() => {
    try {
      const cachedGithub = sessionStorage.getItem("github");
      if (!cachedGithub) throw new Error("No cached github data");
      setUser(JSON.parse(cachedGithub));
    } catch (error) {
      fetch("https://api.github.com/users/xarielah")
        .then((res) => res.json())
        .then((data) => saveGithubToCache(data))
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);
  if (!user) <></>;
  if (user)
    return (
      <div className="flex items-center text-sm justify-center">
        <span className="border-b-[1px] border-b-gray-200">
          Go visit my GitHub account
          <span className="text-xl ml-1">👉</span>
        </span>
        <Link
          href={user.html_url}
          className="flex gap-2 p-2 items-center w-max ease-in-out duration-300 hover:-translate-y-2 cursor-pointer rounded-md"
        >
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={30}
            height={30}
            className="rounded-full shadow-md"
          />
          <article>
            <p className="font-bold">{user.login}</p>
          </article>
        </Link>
      </div>
    );
}
