"use client";
import { Button } from "@/components/ui";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loaders from "@/components/loader/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/user";
import { getCookie, setCookie } from "cookies-next";

export default function Verify() {
  const [resend, setResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingReq, setPendingReq] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const route = useRouter();
  const dispatch = useAppDispatch();

  const user =
    typeof window !== "undefined"
      ? window.localStorage.getItem("CHAT_USER_VERIFY")
      : null;

  const uri = process.env.NEXT_PUBLIC_SERVER_URL;
  useEffect(() => {
    if (user) {
      setIsLoading(false);
      Timer();
      setEmail(JSON.parse(user).email);
    } else {
      route.push("/login");
    }
  }, []);

  function Timer() {
    let a = 30;
    let timer = setInterval(() => {
      if (a == 0) {
        setResend(true);
        return clearInterval(timer);
      }
      a = a - 1;
      setTimer(a);
    }, 1000);
  }

  async function verificationCode(userCode: any) {
    setPendingReq(true);
    if (user) {
      let { code } = JSON.parse(user);
      console.log(code, userCode);
      if (Number(userCode) === code) {
        await axios
          .post(`${uri}/auth/verifyuser`, {
            token: JSON.parse(user).token,
            userCode: userCode,
          })
          .then((response) => {
            setPendingReq(false);
            if (response.data.error) {
              console.log(response.data);
              setErrorMsg(response.data.error);
            } else {
              console.log(response.data.data);

              let { email, username, friends, _id } = response.data.data;
              let user = {
                user: { email, name: username },
                isLogin: true,
                uid: _id,
                friends,
                fetchUser: false,
              };
              setCookie("chattoken", _id);
              window.localStorage.removeItem("CHAT_USER_VERIFY");
              route.push("/chats");
            }
          })
          .catch((error) => {
            setPendingReq(false);
            alert("Failed to verify code. Please try again.");
          });
      } else {
        setPendingReq(false);
      }
    } else {
      setPendingReq(false);
      alert("Failed to verify code. Please try again.");
    }
  }

  function handleError() {
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  }

  async function resendCode() {
    if (user) {
      const { email } = JSON.parse(user);
      console.log(email);

      try {
        const response = await axios
          .post(`${uri}/auth/resendcode`, { email })
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to send email");
          });
        typeof window !== "undefined" &&
          window.localStorage.setItem(
            "CHAT_USER_VERIFY",
            JSON.stringify(response.data)
          );
        setTimer(30);
        setResend(false);
        Timer();
        toast("Email sent!", {
          description: "check your inbox for the code.",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return isLoading ? (
    <Loaders />
  ) : (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-5 p-5">
      <h2 className="font-bold text-center text-[22px]">
        Enter Verification Code
      </h2>
      <p className="text-[gray] text-sm text-center">
        Please enter the one-time code sent to your email{" "}
        <span className="font-bold">{email}</span>.
      </p>
      <InputOTP
        maxLength={6}
        onChange={(e) => {
          if (e.length === 6) {
            verificationCode(e);
          }
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {isError && <p className="text-sm text-[red]">{errorMsg}</p>}
      <Button disabled={!resend} onClick={resendCode}>
        {resend ? "Resend Code" : `Resend Code in ${timer} seconds`}
      </Button>

      {pendingReq && <Loaders />}
    </div>
  );
}
