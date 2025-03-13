"use client";
import { Separator} from "ui";
import Sidebar from "@/components/sidebar/page";
import { useEffect, useRef, useState } from "react";
import Loaders from "@/components/loader/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/user";
import { getCookie } from "cookies-next";
import { setLoader } from "@/redux/slices/loader";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const URI = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Chats() {
  const [isLoaded, setIsloaded] = useState(true);

  const user = useAppSelector((state) => state.user);
  const loader = useAppSelector((state) => state.loader);
  const route = useRouter();
  const errorRef = useRef<any | null>(null);
  const dispatch = useAppDispatch();


  useEffect(() => {
    const token = getCookie("chattoken");

    if (token) {
      if (!user.fetchUser) {
        setIsloaded(false);
        dispatch(setLoader(true));
        fetchUser(token);
      }
    } else {
      route.push("/login");
    }
  }, []);

  async function fetchUser(token: any) {
    await axios
      .post(`${URI}/fetchuser`, { token: token })
      .then((response) => {
        dispatch(setLoader(false));
        dispatch(setUser(response.data.data));
      })
      .catch((error) => {
        dispatch(setLoader(false));
        setTimeout(() => {
          errorRef.current?.click();
        }, 1000);
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
      <AlertDialog>
        <AlertDialogTrigger ref={errorRef}></AlertDialogTrigger>
        <AlertDialogContent className="w-[450px] max-w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Network Error</AlertDialogTitle>
            <AlertDialogDescription>
              Unable to connect to the server. Please check your internet
              connection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Try Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
