"use client";

import { RecoilRoot } from "recoil";

export default function AppProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
