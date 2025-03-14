import ChatHOC from "@/HOC/Chat-hoc";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Chats",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const storeCookies = await cookies();
  // const token = storeCookies.get("chattoken");
  // console.log(token);

  return (
    <>
      <ChatHOC>{children}</ChatHOC>
    </>
  );
}
