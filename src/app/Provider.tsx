"use client";

import { store } from "@/redux/store";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { io } from "socket.io-client";
import { useParams } from "next/navigation";
import { setSocket } from "@/redux/slices/socket/socket";
import { toast } from "sonner";

// const URI = process.env.NEXT_PUBLIC_SERVER_URL;

// export const socket = io(URI, {
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 3000,
// });

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();

  useEffect(() => {
   
  }, []);

  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
}
