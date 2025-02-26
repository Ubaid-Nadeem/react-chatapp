"use client";
import { set, z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loaders from "@/components/loader/page";
import { getCookie, setCookie } from "cookies-next";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingReq,setPendingReq] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const route = useRouter();
  const uri = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const token = getCookie("chattoken");
    if (token) {
      route.push("/chats");
    } else{
      setIsLoading(false);
    }
  }, []);

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const resetErrors = () => {
    setTimeout(() => {
      setIsError(false);
      setErrorMessage("");
    }, 5000);
  };

  const handleSubmit = async () => {
    let data = {
      email,
      password,
    };

    try {
      loginSchema.parse(data);
      if (!isError) {
        handleLogin();
      }
    } catch (error: any) {
      let message = JSON.parse(error.message)[0].message;
      setIsError(true);
      setErrorMessage(message);
      resetErrors();
    }
  };

  // API call to login
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${uri}/auth/login`, {
        email,
        password,
      });
      if (response.data) {
        console.log(response.data);
        // route.push("/chats");
      } else {
        setIsError(true);
        setErrorMessage(response.data.message);
        resetErrors();
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to login. Please try again.");
      resetErrors();
    }
  };

  return isLoading ? (
    <Loaders />
  ) : (
    <div className="flex flex-col w-[80%] h-screen justify-center md:w-[350px] m-auto  gap-5">
      <h2 className="text-center font-bold text-xl">Welcome Back!</h2>
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@gmail.com"
        />
      </div>

      <div className="mb-6">
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
      <Button onClick={handleSubmit}>Login</Button>
      <p className="text-center text-sm">
        Dont have an account{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => {
            setPendingReq(true)
            route.push("/signup");
          }}
        >
          Signup here!
        </span>
      </p>


      {pendingReq && <Loaders />}
    </div>
  );
}
