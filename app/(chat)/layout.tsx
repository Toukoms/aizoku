import React from "react"
import MainLayout from "@/src/layout/main";

export default function ChatLayout(
  {
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
}
