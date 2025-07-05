"use client";

import { useContractWithAddress } from "@/hooks/contract";
import {
  checkIfUserIsAnAdmin,
  fetchCampaigns,
  fetchUserCampaign,
  fetchUserProfile,
} from "@/store/action";
import React, { useEffect } from "react";
import { useWallet } from "./wallet";
import { usePageStatus, useTopDispatch } from "@/hooks/app";

const GlobalFetch = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useTopDispatch();
  const arg = useContractWithAddress();
  const { isConnected, signer, provider } = useWallet();
  const { status } = usePageStatus();

  const canCall = !!(signer || provider);

  useEffect(() => {
    if (status === "loading" || !canCall) return;
    dispatch(arg, fetchCampaigns);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, canCall]);

  useEffect(() => {
    if (!isConnected || !canCall) return;

    dispatch(arg, fetchUserProfile);
    dispatch(arg, fetchUserCampaign);
    dispatch(arg, checkIfUserIsAnAdmin);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, canCall]);
  return <>{children}</>;
};

export default GlobalFetch;
