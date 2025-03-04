"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

export default function Home() {
  const route = useRouter();
  useEffect(() => {
    const token = getCookie("chattoken");
    let code = window.localStorage.getItem("CHAT_USER_VERIFY");
    if (code) {
      route.push(`/verification`);
    } else if (token) {
      route.push("/chats");
    } else {
      route.push(`/login`);
    }
  });

  return <div></div>;
}
