"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Separator, Button, Sheet } from "@/components/ui";
import Sidebar from "@/components/sidebar/page";
import Loaders from "@/components/loader/page";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { friendType, updateMessages } from "@/redux/slices/user";

export default function UserChats() {
  const { id } = useParams();
  const route = useRouter();

  const [isChatting, setIsChatting] = useState(true);
  const [chatWith, setChatWith] = useState<any>({ name: "Ubaid Nadeem" });
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsloaded] = useState(true);
  const messagesEndRef = useRef<any>(null);

  const dispatch = useAppDispatch();

  const chatting = useAppSelector((state) => state.chatting);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
   
    if (!chatting.ischatting) {
      route.push("/chats");
    } else {
      user.friends.filter((user: friendType) => {
        if (user.uid == id) {
          setMessages([...user.messages]);
        }
      });
      setIsloaded(false);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    setInputValue("");
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return isLoaded ? (
    <Loaders />
  ) : (
    <div className="flex">
      <Sidebar />

      <div
        className={`fixed top-0 z-50 bg-gray-200 transition-transform sm:translate-x-0  md:relative left-0 w-full md:block transition-transform sm:translate-x-0 sm:w-[75%] h-screen  md:h-[calc(100vh)] ${
          isChatting ? "block" : "translate-x-full"
        }`}
      >
        {chatWith && (
          <>
            <div className="shadow-md header fixed top-0 w-full z-50 ">
              <div className="flex items-center p-[10px]  bg-white px-5 z-50">
                <svg
                  onClick={() => {
                    setIsChatting(!isChatting);
                    setMessages([]);
                    route.push("/chats");
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="justd-icons size-4 cursor-pointer mr-3 block md:hidden"
                  data-slot="icon"
                  aria-hidden="true"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m15 20-8-8 8-8"
                  ></path>
                </svg>

                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      width={50}
                      height={50}
                      alt="avatar"
                      src="data:image/jpeg;base64,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"
                    />
                  </div>
                </div>

                <div className="flex flex-col ml-2 w-full">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-[#2f3542] text-[16px]">
                      {chatting.user?.name}
                    </h3>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="justd-icons size-5"
                    data-slot="icon"
                    aria-hidden="true"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M7.754 9.218a15.9 15.9 0 0 0 2.954 4.074 15.9 15.9 0 0 0 4.074 2.954l1.79-1.791a.5.5 0 0 1 .61-.076l3.517 2.098a.5.5 0 0 1 .097.782l-3.583 3.583a.97.97 0 0 1-.963.251 19.7 19.7 0 0 1-4.396-1.92 20 20 0 0 1-3.957-3.07 20 20 0 0 1-3.07-3.957 19.8 19.8 0 0 1-1.92-4.396.97.97 0 0 1 .25-.963l3.584-3.583a.5.5 0 0 1 .782.097l2.098 3.516a.5.5 0 0 1-.076.61z"
                    ></path>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="justd-icons size-5"
                    data-slot="icon"
                    aria-hidden="true"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.75 5.75a1 1 0 0 1 1-1h10.5a1 1 0 0 1 1 1v12.5a1 1 0 0 1-1 1H3.75a1 1 0 0 1-1-1zM15.25 10l5.276-2.638a.5.5 0 0 1 .724.447v8.382a.5.5 0 0 1-.724.447L15.25 14z"
                    ></path>
                  </svg>
                  <Sheet>
                    <Button className={"text-black p-2"} appearance="plain">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="justd-icons size-4"
                        data-slot="icon"
                        aria-hidden="true"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                        ></path>
                      </svg>
                    </Button>
                    <Sheet.Content>
                      <Sheet.Header>
                        <Sheet.Title>User</Sheet.Title>
                        <Sheet.Description>user@gmail.com</Sheet.Description>
                      </Sheet.Header>
                      <Sheet.Body></Sheet.Body>
                      <Sheet.Footer>
                        <Sheet.Close>Cancel</Sheet.Close>
                      </Sheet.Footer>
                    </Sheet.Content>
                  </Sheet>
                </div>
              </div>
            </div>

            <div className="relative w-full mt-[60px] z-10 messages-container  h-[calc(100vh-180px)] md:h-[calc(100vh-130px)] overflow-y-scroll py-3 px-2">
              <div className="chat chat-end">
                <div className="chat-bubble">Hello, {chatting.user?.name}</div>
              </div>

              <div className="chat chat-start">
                <div className="chat-bubble bg-[#daffc9] text-black">
                  Hey, How are doing Today?
                </div>
              </div>

              {messages.map(({ message }, index) => {
                return (
                  <div className="chat chat-end" key={index}>
                    <div className="chat-bubble">{message}</div>
                  </div>
                );
              })}

              {<div ref={messagesEndRef} />}
            </div>

            <div className="fixed bottom-2 p-2 px-5 w-full flex items-center gap-2 md:justify-center">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder="Enter a Message"
                className="w-[90%] p-2 outline-none border focus:outline-hidden rounded-full text-[14px]"
              />
              <div className="bg-[#1e272e] p-3 rounded-full">
                <svg
                  onClick={() => {
                    setMessages([
                      ...messages,
                      {
                        message: inputValue,
                        senderID: user.uid,
                        reciverId: chatting.user?.uid,
                      },
                    ]);

                    dispatch(
                      updateMessages({
                        messages: [
                          ...messages,
                          {
                            message: inputValue,
                            senderID: user.uid,
                            reciverId: chatting.user?.uid,
                            time: Date.now(),
                          },
                        ],
                        uid: id,
                      })
                    );
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="justd-icons size-5 cursor-pointer text-white font-bold"
                  data-slot="icon"
                  aria-hidden="true"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 12h3.25M6 12 3.382 4.145a.5.5 0 0 1 .698-.605l16.026 8.013a.5.5 0 0 1 0 .894L4.08 20.46a.5.5 0 0 1-.698-.605z"
                  ></path>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
