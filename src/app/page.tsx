"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  useEffect(() => {
    route.push("/chats");
  });

  return (
    <div></div>
  );
}
