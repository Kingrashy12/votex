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
import { useTopDispatch } from "@/hooks/app";

const GlobalFetch = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useTopDispatch();
  const arg = useContractWithAddress();
  const { isConnected } = useWallet();

  useEffect(() => {
    if (isConnected) {
      dispatch(arg, fetchUserProfile);
      dispatch(arg, checkIfUserIsAnAdmin);
      dispatch(arg, fetchCampaigns);
      dispatch(arg, fetchUserCampaign);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);
  return <>{children}</>;
};

export default GlobalFetch;
