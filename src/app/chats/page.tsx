"use client";
import { Avatar, Separator, TextField } from "ui";
import Sidebar from "@/components/sidebar/page";

export default function Chats() {
  

  return (
    <div className="flex">
      <Sidebar />
      <Separator
        orientation="vertical"
        className="hidden h-[calc(100vh-49px)]  md:block"
      />
    </div>
  );
}
