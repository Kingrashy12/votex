"use client";

import { For } from "auera-ui";
import React from "react";
import CampaignCard from "./CampaignCard";
import { usePageStatus, useTopDispatch, useVotexStore } from "@/hooks/app";
import { tw } from "stywind";
import LoadingCampaign from "../loading/CampaignCard";
import RenderPage from "../RenderPageStatus";
import NoResult from "../NoResult";
import { useContractWithAddress } from "@/hooks/contract";
import { fetchCampaigns } from "@/store/action";

const Campaigns = () => {
  const state = useVotexStore();
  const { dispatch } = useTopDispatch();
  const arg = useContractWithAddress();
  const { status } = usePageStatus();

  const isLoading = state.fetchStatus === "Pending";

  return (
    <div
      className={tw(
        "grid grid-cols-3 gap-8 max-[1024px]:grid-cols-2 max-[730px]:grid-cols-1 max-[730px]:w-full",
        status === "loaded" &&
          state.campaigns.length === 0 &&
          "w-full flex items-center justify-center h-[70vh]"
      )}
    >
      <RenderPage
        isLoading={isLoading}
        loaded={() => (
          <For
            each={state.campaigns}
            render={(item) => <CampaignCard {...item} />}
            emptyListComponent={
              <NoResult
                header="Nothing to display"
                message="There are currently no campaigns in this list."
                onRetry={() => dispatch(arg, fetchCampaigns)}
              />
            }
          />
        )}
        loading={() => (
          <For each={[...Array(6)]} render={() => <LoadingCampaign />} />
        )}
      />
    </div>
  );
};

export default Campaigns;
