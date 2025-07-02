import { useViewGSAP } from "@/hooks/app";
import { Campaign } from "@/types/app";
import { Box, MapItems } from "auera-ui";
import React from "react";
import { tw } from "stywind";

const CampaignStats = (campaign: Campaign) => {
  useViewGSAP();

  const totalVoters = campaign.voters.length;

  const getStateRate = (option: string) => {
    const votesForOption = campaign.votes.filter(
      (vote) => vote.option === option
    ).length;
    const percentage = (votesForOption / totalVoters) * 100;
    return percentage || 0;
  };

  return (
    <Box
      id="cleft"
      className="rounded-3xl w-[550px] max-[1024px]:w-full gap-3 flex-col bg-neutral-700 border-neutral-500 px-8 py-8 border-1.9"
    >
      <h2 className="font-poppins font-semibold text-white text-xl">Stats</h2>

      <MapItems
        data={campaign.options}
        direction="column"
        className="ml-3"
        renderItem={(option, index) => (
          <Box className="items-center/ gap-5 justify-between">
            <Box className="gap-2 items-center flex-shrink-0">
              <p className="font-inter font-bold text-white">{index + 1}. </p>
              <span className="font-inter text-white font-medium text-base">
                {option}
              </span>
            </Box>

            <Box fullWidth className="bg-neutral-800 rounded-xl h-4 mt-1">
              <Box
                className={tw(
                  "bg-blue-700 w-1/2 absolute h-full rounded-l-full",
                  getStateRate(option) === 100 && "rounded-r-full"
                )}
                style={{ width: `${getStateRate(option)}%` }}
              />
              <span className="font-inter text-xs font-medium w-full z-100 text-center">
                {getStateRate(option).toFixed(1)}%
              </span>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default CampaignStats;
