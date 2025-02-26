"use client";
import { Avatar, Separator, TextField } from "ui";
import Sidebar from "@/components/sidebar/page";
import { useEffect, useState } from "react";
import Loaders from "@/components/loader/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/user";
import { getCookie, setCookie } from "cookies-next";
import { setLoader } from "@/redux/slices/loader";
import { useRouter } from "next/navigation";
export default function Chats() {
  const [isLoaded, setIsloaded] = useState(true);

  const user = useAppSelector((state) => state.user);
  const loader = useAppSelector((state) => state.loader);
  const route = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie("chattoken");
    if (token) {
      setIsloaded(false);

      dispatch(setLoader(true));
      if (!user.fetchUser) {
        dispatch(
          setUser({
            user: {
              name: "Ubaid Nadeem",
              email: "ubaidahmed233@gmail.com",
              uid: "123456789",
            },
            isLogin: true,

            friends: [
              {
                uid: "12728uonu8u198237",
                name: "Ubaid",
                email: "ubaid@gmail.com",
                lastMessage: undefined,
                messages: [],
                lastMessageTime: 1739827437656,
              },
              {
                name: "Shahzain Tariq",
                email: "shahzain@gmail.com",
                lastMessage: undefined,
                messages: [],
                lastMessageTime: 1739827437656,
                uid: "12728uonu8u198976",
              },
              {
                uid: "12728uonu3232237",
                name: "Haider",
                email: "haider@gmail.com",
                lastMessage: undefined,
                lastMessageTime: 1739827437656,
                messages: [],
              },
            ],
            fetchUser: true,
          })
        );
      }
      dispatch(setLoader(false));

      if (!user.isLogin) {
        console.log("fetch data");
      }
    } else {
      route.push("/login");
    }
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
