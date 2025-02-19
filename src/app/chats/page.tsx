"use client";
import { Avatar, Separator, TextField } from "ui";
import Sidebar from "@/components/sidebar/page";
import { useEffect, useState } from "react";
import Loaders from "@/components/loader/page";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/user";

export default function Chats() {
  const [isLoaded, setIsloaded] = useState(true);

  const dispatch = useAppDispatch();

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
