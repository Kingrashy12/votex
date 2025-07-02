import CampaignView from "@/components/campaign/CampaignView";
import React from "react";

export const metadata = {
  title: "Campaign - Votex",
  description: "",
};

const Page = () => {
  return (
    <main className="w-full flex flex-col items-center justify-center h-full py-10 px-10 max-[600px]:px-4 max-[380px]:px-3">
      <CampaignView />
    </main>
  );
};

export default Page;
