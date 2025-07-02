import { VotexStore } from "@/types/app";
import { createStore } from "@zoltra-toolkit/react";

export const votexStore = createStore<VotexStore>(
  {
    profile: "",
    userCampaign: [],
    campaigns: [],
    admins: [],
    totalVotes: 0,
    totalParticipants: 0,
    tokenBurned: 0,
    totalCampagin: 0,
    isAdmin: false,
    fetchStatus: "",
    refetch: false,
    currentCampaign: null,
    choosenOption: "",
    error: {
      type: "",
      message: "",
    },
    buyRate: 0,
    ethBalance: 0,
    balance: 0,

    ETH_FETCH_STATUS: "",
    BALANCE_FETCH_STATUS: "",
  },
  { name: "votex_store" }
);
