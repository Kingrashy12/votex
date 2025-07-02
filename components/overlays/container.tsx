import React from "react";
import ConnectWalletModal from "./ConnectWallet";
import ProfileUpdateModal from "./UpdateProfile";
import CreateCampaignModal from "./create-campaign";
import VoteModal from "./VoteModal";
import BuyVTX from "./BuyVTX";
import MyAccount from "./MyAccount";

const Container = () => {
  return (
    <>
      <ConnectWalletModal />
      <ProfileUpdateModal />
      <CreateCampaignModal />
      <VoteModal />
      <BuyVTX />
      <MyAccount />
    </>
  );
};

export default Container;
