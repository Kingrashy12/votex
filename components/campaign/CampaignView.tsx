"use client";

import { useTopDispatch, useVotexStore } from "@/hooks/app";
import { useContractWithAddress } from "@/hooks/contract";
import { useWallet } from "@/providers/wallet";
import { fetchCampaign } from "@/store/action";
import { Box } from "auera-ui";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { tw } from "stywind";
import CampaignInfo from "./CampaignInfo";
import CampaignSummary from "./CampaignSummary";
import Participants from "./Participants";
import CampaignStats from "./CampaignStats";
import LoadingCampaignView from "../loading/CampaignView";
import RenderPage from "../RenderPageStatus";
import NoResult from "../NoResult";

const CampaignView = () => {
  const { id } = useParams();
  const arg = useContractWithAddress();
  const { signer, provider } = useWallet();
  const state = useVotexStore();
  const { dispatch } = useTopDispatch();

  const isSignerOrProviderAvailable = !!(signer || provider);

  const isLoading = state.fetchStatus === "Pending";

  useEffect(() => {
    if (isSignerOrProviderAvailable) {
      if (state.currentCampaign?.id !== id) {
        dispatch({ ...arg, id: Number(id) }, fetchCampaign);
      } else if (
        state.currentCampaign?.id === id &&
        state.currentCampaign?.totalVoters === 0
      ) {
        // If the campaign is already loaded but has no voters, we can refetch it
        dispatch({ ...arg, id: Number(id) }, fetchCampaign);
      }
    }
  }, [isSignerOrProviderAvailable, state.currentCampaign?.totalVoters]);

  return (
    <div className={tw("w-full h-full items-center justify-center flex")}>
      {/* TODO: Create a custom Empty components */}
      <RenderPage
        isLoading={isLoading}
        loaded={() => (
          <>
            {state.currentCampaign ? (
              <Box className="gap-5 h-full max-[1024px]:flex-col">
                {/* Header Card */}
                <CampaignInfo campaign={state.currentCampaign} />

                {/* Details, Voters */}
                <Box className="flex-col gap-4">
                  <CampaignSummary {...state.currentCampaign} />
                  <CampaignStats {...state.currentCampaign} />
                  <Participants participants={state.currentCampaign.voters} />
                </Box>
              </Box>
            ) : (
              <NoResult
                header="Campaign Not Found"
                message="We couldn’t find any campaign matching your criteria."
                onRetry={() =>
                  dispatch({ ...arg, id: Number(id) }, fetchCampaign)
                }
              />
            )}
          </>
        )}
        loading={LoadingCampaignView}
      />
    </div>
  );
};

export default CampaignView;
