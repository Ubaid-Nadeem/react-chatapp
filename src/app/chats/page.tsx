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
import axios from "axios";
export default function Chats() {
  const [isLoaded, setIsloaded] = useState(true);

  const user = useAppSelector((state) => state.user);
  const loader = useAppSelector((state) => state.loader);
  const route = useRouter();
  const dispatch = useAppDispatch();
  const URI = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const token = getCookie("chattoken");

    if (token) {
      if(!user.fetchUser){
        setIsloaded(false);
        dispatch(setLoader(true));
        fetchUser(token)
      }
    } else {
      route.push("/login");
    }
  }, []);

  async function fetchUser(token: any) {
    await axios
      .post(`${URI}/fetchuser`, { token: token })
      .then((response) => {
        console.log(response.data.data);
        dispatch(setLoader(false));
        dispatch(setUser(response.data.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoader(false));

        // setPendingReq(false);
      });
  }

  return loader ? (
    <Loaders />
  ) : (
    <div className="flex z-1">
      <Sidebar />
      <Separator
        orientation="vertical"
        className="hidden h-[calc(100vh-49px)]  md:block"
      />
    </div>
  );
}
