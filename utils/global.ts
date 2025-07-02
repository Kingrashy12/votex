import { Campaign, Vote } from "@/types/app";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseProxy = <T>(data: T) => {
  const results = JSON.stringify(
    data,
    (key, value) => (typeof value === "bigint" ? value.toString() : value),
    2
  );

  return JSON.parse(results);
};

export const shortenAddress = (addr: string, from: number = 6) => {
  // return `${addr.substring(0, from)}...${addr.substring(addr.length - 4)}`;
  return `${addr.substring(0, from)}...${addr.slice(-4)}`;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const parseError = (err: any) => {
  const errorString = err.message as string;

  const match = errorString.match(/execution reverted: "(.*?)"/);
  if (match) {
    return match[1];
  }

  const unSupportedMatch = errorString.match(
    /contract runner does not support calling (.*?)/
  );
  if (unSupportedMatch) {
    return "UNSUPPORTED_OPERATION";
  }

  return errorString;
};

export const updateCampaignResponse = (response: any): Campaign => {
  return {
    id: response["0"],
    name: response["1"],
    description: response["2"],
    options: response["3"],
    totalVoters: response["4"],
    voters: response["5"],
    startDate: response["6"],
    endDate: response["7"],
    paused: response["8"],
    active: response["9"],
    votes: response["10"],
  };
};

export const updateVoteObject = (response: any): Vote[] => {
  return response.map((vote: { [x: string]: any }) => ({
    campaignId: vote["0"],
    option: vote["1"],
    voter: vote["2"],
  }));
};

export const calculateDateDifferencePercentage = (
  startDate: number,
  endDate: number
) => {
  const currentDate = new Date();

  const totalDuration = endDate - startDate;

  const timeLeft = currentDate.getTime() - startDate;

  const parcentage = (timeLeft / totalDuration) * 100;

  return Math.min(Math.max(parcentage, 0), 100);
};
