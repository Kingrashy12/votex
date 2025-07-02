import { alert } from "@/components/Alert/Alert";
import {
  AsycnCallArg,
  BuyVTXFormArg,
  Campaign,
  CampaignFormArg,
  RateFetchArg,
  VoteFormArg,
  VotexStore,
} from "@/types/app";
import {
  parseError,
  parseProxy,
  updateCampaignResponse,
  updateVoteObject,
} from "@/utils/global";
import {
  AsyncActionCreator,
  createAction,
  createAsyncAction,
  StoreApi,
} from "@zoltra-toolkit/react";
import { Button, closeModal, openModal } from "auera-ui";
import { ethers } from "ethers";

declare module "@zoltra-toolkit/react" {
  function createAsyncAction<P = void, R = void>(
    type: string,
    handler: (payload: P, context: StoreApi<VotexStore>) => Promise<R>
  ): AsyncActionCreator<P, R>;
}

export const fetchUserProfile = createAsyncAction<AsycnCallArg, void>(
  "fetch-profile",
  async (arg, { setState }) => {
    const { contractCaller, address } = arg;

    try {
      const contract = await contractCaller();
      const response = await contract.profiles(address);
      setState({ profile: parseProxy(response) });
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
    }
  }
);

export const updateUserProfile = createAction<string, void, VotexStore>(
  "update-profile",
  (newImage, { setState }) => {
    setState({ profile: newImage });
  }
);

export const createCampaign = createAsyncAction<CampaignFormArg, void>(
  "create-campaign",
  async (arg, { setState, getState }) => {
    const {
      contractCaller,
      name,
      description,
      options,
      setIsLoading,
      startDate,
      endDate,
      onSuccess,
    } = arg;

    const { campaigns } = getState() as VotexStore;

    try {
      setIsLoading(true);
      const contract = await contractCaller();
      const tx = await contract.createCampaign(
        name,
        description,
        options,
        startDate,
        endDate
      );

      tx.wait();

      const newCampaign: Campaign = {
        id: campaigns.length + 1,
        name,
        description,
        options,
        totalVoters: 0,
        voters: [],
        startDate,
        endDate,
        paused: false,
        active: true,
        votes: [],
      };

      const updatedCampaigns = [newCampaign, ...campaigns];

      onSuccess();
      alert.success("Transaction successfull: New campaign created", tx.hash);
      closeModal();
      setState({ refetch: true, campaigns: updatedCampaigns });
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
    } finally {
      setIsLoading(false);
      setState({ refetch: false });
    }
  }
);

export const fetchCampaigns = createAsyncAction<AsycnCallArg, void>(
  "fetch-all-campaign",
  async (arg, { setState }) => {
    const { contractCaller } = arg;

    try {
      setState({
        fetchStatus: "Pending",
      });
      const contract = await contractCaller();
      const response = await contract.getCampaigns();
      const data = parseProxy(response);
      const campaignArray: Campaign[] = [];

      for (const obj of data) {
        const campaignObj = updateCampaignResponse(obj);
        // console.log("obj:", { obj, campaignObj });
        campaignArray.unshift(campaignObj);
      }

      setState({
        campaigns: campaignArray,
        fetchStatus: "Success",
      });
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
    } finally {
      setState({ fetchStatus: "Failed" });
    }
  }
);

export const fetchCampaign = createAsyncAction<
  AsycnCallArg & { id: number },
  void
>("fetch-all-campaign", async (arg, { setState }) => {
  const { contractCaller, id } = arg;

  try {
    setState({
      fetchStatus: "Pending",
    });
    const contract = await contractCaller();
    const response = await contract.getCampaign(id);
    const data = parseProxy(response);

    const campaignObj = updateCampaignResponse(data);

    setState({
      currentCampaign: {
        ...campaignObj,
        votes: updateVoteObject(campaignObj.votes),
      },
      fetchStatus: "Success",
    });
  } catch (error) {
    const err = parseError(error);
    alert.error(err, "");
  } finally {
    setState({ fetchStatus: "Failed" });
  }
});

export const checkIfUserIsAnAdmin = createAsyncAction<AsycnCallArg, void>(
  "check-admin",
  async (arg, { setState }) => {
    const { contractCaller, address } = arg;

    try {
      const contract = await contractCaller();
      const response = await contract.getAdmin(address);
      const data = parseProxy(response);
      setState({ isAdmin: data });
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
    }
  }
);

export const vote = createAsyncAction<VoteFormArg, void>(
  "campaign-vote",
  async (arg, { setState, getState }) => {
    const {
      setIsLoading,
      contractCaller,
      option,
      campaignId,
      onSuccess,
      address,
    } = arg;
    const { campaigns, currentCampaign } = getState() as VotexStore;
    try {
      setIsLoading(true);

      const contract = await contractCaller();
      const approveTx = await contract.approve();
      approveTx.wait();
      alert.success("Contract Approved to Burn 1 VTX", approveTx.hash);

      const tx = await contract.vote(Number(campaignId), option);

      const newVote = {
        campaignId: campaignId,
        voter: address,
        option: option,
      };

      const updatedCampaigns = campaigns.map((c) =>
        c.id === campaignId
          ? {
              ...c,
              voters: [...c.voters, address],
              totalVoters: c.totalVoters + 1,
              votes: [...c.votes, newVote],
            }
          : c
      );

      const updatedCampaign = currentCampaign
        ? {
            ...currentCampaign,
            totalVoter: currentCampaign.totalVoters++,
            voters: [...currentCampaign.voters, address],
            votes: [...currentCampaign.votes, newVote],
          }
        : null;

      tx.wait();
      alert.success("Transaction completed successfully!", tx.hash);
      onSuccess();
      closeModal();
      setState({
        campaigns: updatedCampaigns,
        currentCampaign: updatedCampaign,
      });
    } catch (error) {
      const err = parseError(error);
      if (err === "Approve: Insufficient VTX for approval") {
        return alert.error(
          err,
          "",
          <Button
            fullWidth
            size="md"
            radius="xl"
            className="mt-1"
            onClick={() => openModal("buy-vtx")}
          >
            Buy VTX
          </Button>
        );
      }
      alert.error(err, "");
    } finally {
      setIsLoading(false);
    }
  }
);

export const fetchRate = createAsyncAction<RateFetchArg, void>(
  "fetch-rate",
  async (arg, { setState }) => {
    const { setIsLoading, contractCaller, amount } = arg;
    try {
      setIsLoading(true);

      const contract = await contractCaller();
      const response = await contract.getConvarsionRate(
        ethers.parseEther(amount)
      );
      const data = parseProxy(response);
      setState({ buyRate: data / 10 ** 18 });
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
    } finally {
      setIsLoading(false);
    }
  }
);

export const buyVTX = createAsyncAction<BuyVTXFormArg, void>(
  "fetch-rate",
  async (arg, { getState, setState }) => {
    const { setIsLoading, contractCaller, amount, onSuccess } = arg;
    const state = getState();
    const buyRate = state.buyRate;

    try {
      setIsLoading(true);

      const contract = await contractCaller();
      const tx = await contract.buy({ value: ethers.parseEther(amount) });
      tx.wait();

      setState({ balance: state.balance + buyRate });
      alert.success("Transaction completed successfully!", tx.hash);
      onSuccess();
      closeModal();
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
    } finally {
      setIsLoading(false);
    }
  }
);

export const fetchUserCampaign = createAsyncAction<AsycnCallArg, void>(
  "fetch-user-campaign",
  async (args, { setState }) => {
    const { contractCaller, address } = args;

    try {
      const contract = await contractCaller();
      const response = await contract.getUserCampaign(address);
      const data = parseProxy(response);
      const campaignArray: Campaign[] = [];

      for (const obj of data) {
        const campaignObj = updateCampaignResponse(obj);
        campaignArray.unshift(campaignObj);
      }

      setState({ userCampaign: campaignArray });
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
    }
  }
);

export const fetchETHBalance = createAsyncAction<AsycnCallArg, void>(
  "fetch-eth",
  async (args, { setState }) => {
    const { contractCaller } = args;

    try {
      setState({
        ETH_FETCH_STATUS: "Pending",
      });
      const contract = await contractCaller();
      const data = await contract.getEthBalance();
      setState({ ethBalance: parseProxy(data) / 10 ** 18 });
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
      setState({
        ETH_FETCH_STATUS: "Failed",
      });
    } finally {
      setState({
        ETH_FETCH_STATUS: "Success",
      });
    }
  }
);

export const fetchVTXBalance = createAsyncAction<AsycnCallArg, void>(
  "fetch-eth",
  async (args, { setState }) => {
    const { contractCaller, address } = args;

    try {
      setState({
        BALANCE_FETCH_STATUS: "Pending",
      });
      const contract = await contractCaller();
      const data = await contract.getUserBalance(address);
      setState({ balance: parseProxy(data) / 10 ** 18 });
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
      setState({
        BALANCE_FETCH_STATUS: "Failed",
      });
    } finally {
      setState({
        BALANCE_FETCH_STATUS: "Success",
      });
    }
  }
);

export const withdrawEth = createAsyncAction<AsycnCallArg, void>(
  "withdraw-eth",
  async (args, { setState }) => {
    const { contractCaller } = args;
    try {
      const contract = await contractCaller();
      const tx = await contract.withdrawETH();
      tx.wait();
      setState({ ethBalance: 0 });
      alert.success("Transaction completed successfully!", tx.hash);
    } catch (error) {
      const err = parseError(error);
      alert.error(err, "");
    }
  }
);
