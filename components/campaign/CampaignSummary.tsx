import { useViewGSAP } from "@/hooks/app";
import { Campaign } from "@/types/app";
import { Box } from "auera-ui";
import React from "react";

const CampaignSummary = ({ description }: Campaign) => {
  useViewGSAP();
  return (
    <Box
      id="cleft"
      className="rounded-3xl w-[550px] max-[1024px]:w-full gap-3 flex-col bg-neutral-700 border-neutral-500 px-8 py-8 border-1.9"
    >
      <h2 className="font-poppins font-semibold text-white text-xl">
        Campaign Summary
      </h2>

      <p className="font-inter font-medium text-sm text-neutral-400">
        {description}
      </p>
    </Box>
  );
};

export default CampaignSummary;
