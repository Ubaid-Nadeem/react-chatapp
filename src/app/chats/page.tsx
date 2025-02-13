"use client";
import { Avatar, Separator, TextField } from "ui";
import Sidebar from "@/components/sidebar/page";
import { useEffect, useState } from "react";
import Loaders from "@/components/loader/page";

export default function Chats() {
  const [isLoaded, setIsloaded] = useState(true);
  useEffect(() => {
    setIsloaded(false);
  }, []);

  return isLoaded ? (
    <Loaders />
  ) : (
    <div className="flex">
      <Sidebar />
      <Separator
        orientation="vertical"
        className="hidden h-[calc(100vh-49px)]  md:block"
      />
    </div>
  );
}
