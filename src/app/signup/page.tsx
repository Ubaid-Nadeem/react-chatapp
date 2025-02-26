"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import Loaders from "@/components/loader/page";
import { getCookie, setCookie } from "cookies-next";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pendingReq, setPendingReq] = useState(false);

  const route = useRouter();
  const uri = process.env.NEXT_PUBLIC_SERVER_URL;

  const SignupSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(8),
  });

  useEffect(() => {
    const token = getCookie("chattoken");
    if (token) {
      route.push("/chat");
    } else {
      setIsLoading(false);
    }
  });

  const resetErrors = () => {
    setTimeout(() => {
      setIsError(false);
      setErrorMessage("");
    }, 5000);
  };
  const handleSubmit = async () => {
    setPendingReq(true)

    let data = {
      email,
      password,
      username: name,
    };

    try {
      SignupSchema.parse(data);
      if (!isError) {
        handleSignUp();
      }
    } catch (error: any) {
      setPendingReq(false)
      let message = JSON.parse(error.message)[0].message;
      setIsError(true);
      setErrorMessage(message);
      resetErrors();
    }
  };

  const handleSignUp = async () => {
    try {
     
      const response = await axios.post(`${uri}/auth/signup`, {
        email,
        password,
        username: name,
      });
      if (!response.data.error) {
        setPendingReq(false)
        console.log(response.data);
        localStorage.setItem("CHAT_USER_VERIFY", JSON.stringify(response.data));
        route.push("/verification");
      } else {
        setPendingReq(false)
        console.log(response.data);
        setIsError(true);
        setErrorMessage(response.data.msg);
        resetErrors();
      }
    } catch (error) {
      setPendingReq(false)
      setIsError(true);
      setErrorMessage("Failed to login. Please try again.");
      resetErrors();
    }
  };

  return isLoading ? (
    <Loaders />
  ) : (
    <div className="flex flex-col w-[80%] h-screen justify-center md:w-[350px] m-auto  gap-5">
      <h2 className="text-center font-bold text-xl">Create Account</h2>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@gmail.com"
        />
      </div>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </span>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="website-admin"
          className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="elonmusk"
        />
      </div>
      <div className="mb-6">
        {/* <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
         Password
        </label> */}
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
          required
        />
      </div>
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Button onClick={handleSubmit}>Sign up</Button>
      <p className="text-center text-sm">
        Already have an account{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => {
            setPendingReq(true)
            route.push("/login");
          }}
        >
          login here!
        </span>
      </p>

       {pendingReq && <Loaders />}
    </div>
  );
}
