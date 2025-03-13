"use client";
// import {socket} from "@/app/Provider"
import { useEffect } from "react";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { getCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setNewMessage } from "@/redux/slices/user";

const URI = process.env.NEXT_PUBLIC_SERVER_URL;
const WS = process.env.NEXT_PUBLIC_WS

export const socket = io(WS, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
  transports: ['websocket'],
});

export default function ChatHOC({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const token = getCookie("chattoken");

    if (token) {
      socket.emit("join", { uid: token });
    }
    socket.on("connected", (data) => {
      //   console.log(data);
    });

    socket.on("new_message", ({ message, sender, reciver }) => {
     
      let paramId = window.location.pathname.split("/");

      if (sender != paramId[2]) {
        toast("New Message", {
          position: "top-right",
          description: `${message}`,
        });
      }
      dispatch(
        setNewMessage({ message: { message, sender, reciver }, uid: sender })
      );
    });
  }, []);

  return <>{children}</>;
}
