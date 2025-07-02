import { Contract } from "ethers";

export interface Vote {
  campaignId: number;
  option: string;
  voter: string;
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  options: string[];
  totalVoters: number;
  voters: string[];
  startDate: number;
  endDate: number;
  paused: boolean;
  active: boolean;
  votes: Vote[];
}

type FetchStatus = "Pending" | "Success" | "Failed" | "";

export interface VotexStore {
  profile: string;
  userCampaign: Campaign[];
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  admins: string[];
  totalVotes: number;
  totalParticipants: number;
  tokenBurned: number;
  totalCampagin: number;
  isAdmin: boolean;
  refetch: boolean;
  fetchStatus: FetchStatus;
  choosenOption: string;
  error: {
    type: "NOT_FOUND" | "CREATE_ERR" | "UNSUPPORTED_OPERATION" | "";
    message: string;
  };
  buyRate: number;
  ethBalance: number;
  balance: number;
  ETH_FETCH_STATUS: FetchStatus;
  BALANCE_FETCH_STATUS: FetchStatus;
}

export interface AsycnCallArg {
  contractCaller: () => Promise<Contract>;
  address: string;
}

export interface CampaignFormArg extends AsycnCallArg {
  name: string;
  description: string;
  startDate: number;
  endDate: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  options: string[];
  onSuccess: () => void;
}

export interface VoteFormArg extends AsycnCallArg {
  campaignId: number;
  option: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
}

export interface RateFetchArg {
  contractCaller: () => Promise<Contract>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
}

export interface BuyVTXFormArg {
  contractCaller: () => Promise<Contract>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
  onSuccess: () => void;
}
