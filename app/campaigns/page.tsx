import Campaigns from "@/components/campaign/Campaigns";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Campaigns - Votex",
  description: "",
};

const Page = () => {
  return (
    <main className="w-full flex flex-col flex-1 items-center justify-center h-full py-10 px-10 max-[600px]:px-4 max-[380px]:px-3">
      <Campaigns />
    </main>
  );
};

export default Page;
