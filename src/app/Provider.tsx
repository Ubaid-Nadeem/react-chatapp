"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/user";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
}
