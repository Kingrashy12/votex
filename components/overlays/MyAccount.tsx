"use client";

import { placeholderImage } from "@/assets";
import { useTopDispatch, useUser, useVotexStore } from "@/hooks/app";
import { useContract } from "@/hooks/contract";
import { fetchETHBalance, fetchVTXBalance, withdrawEth } from "@/store/action";
import { shortenAddress } from "@/utils/global";
import {
  Avatar,
  Box,
  closeDrawer,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerPanel,
  formatNumber,
  IconButton,
  Skeleton,
  Tooltip,
} from "auera-ui";
import React, { useEffect } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdArrowOutward, MdArrowUpward } from "react-icons/md";

const MyAccount = () => {
  const { profile, isAdmin, address, userCampaign, isConnected } = useUser();
  const { dispatch } = useTopDispatch();
  const contractCaller = useContract();
  const { ethBalance, balance, ETH_FETCH_STATUS, BALANCE_FETCH_STATUS } =
    useVotexStore();

  useEffect(() => {
    if (isConnected) {
      dispatch({ address, contractCaller }, fetchETHBalance);
      dispatch({ address, contractCaller }, fetchVTXBalance);
    }
  }, [isConnected]);

  const handleRefetch = () => {
    dispatch({ address, contractCaller }, fetchETHBalance);
    dispatch({ address, contractCaller }, fetchVTXBalance);
  };

  const submitWithdrawal = () => {
    dispatch({ contractCaller, address }, withdrawEth);
  };

  return (
    <Drawer value="my-account" preventScroll>
      <DrawerPanel className="shadow-[0_4px_10px]">
        <DrawerHeader>
          <span className="font-inter font-semibold text-black theme-dark:text-white">
            My Account
          </span>
          <IconButton
            size="xs"
            radius="xl"
            variant="outline"
            onClick={closeDrawer}
          >
            <IoClose size={22} />
          </IconButton>
        </DrawerHeader>
        <DrawerContent centerContent className="h-full m-0">
          <Tooltip label="Refresh" className="w-fit" containerClass="w-fit">
            <IconButton
              onClick={handleRefetch}
              variant="outline"
              radius="full"
              // className="absolute top-16 right-4"
            >
              <FaArrowRotateRight />
            </IconButton>
          </Tooltip>
          <Avatar src={profile ? profile : placeholderImage.src} size="lg" />
          <p className="font-medium font-inter text-base text-white">
            {shortenAddress(address, 8)}
          </p>
          <Divider />

          <Box className="w-full items-center justify-evenly">
            <Box className="flex-col items-center gap-5" hidden={!isAdmin}>
              <Box className="flex-col items-center gap-1">
                <p className="font-inter text-sm text-neutral-500 font-medium">
                  ETH
                </p>
                {ETH_FETCH_STATUS === "Pending" ? (
                  <Skeleton width={75} height={30} />
                ) : (
                  <h2 className="font-inter font-semibold text-3xl text-white">
                    {formatNumber(ethBalance, 1)}
                  </h2>
                )}
              </Box>

              <Box className="flex-col gap-1 items-center">
                {ETH_FETCH_STATUS === "Pending" ? (
                  <Skeleton width={38} height={38} radius="full" />
                ) : (
                  <IconButton
                    radius="full"
                    disabled={ethBalance === 0}
                    onClick={submitWithdrawal}
                  >
                    <MdArrowUpward size={20} />
                  </IconButton>
                )}
                <p className="font-inter text-white font-xs font-medium">
                  Withdraw
                </p>
              </Box>
            </Box>

            <Box className="flex-col items-center gap-5">
              <Box className="flex-col gap-1 items-center">
                <p className="font-inter text-sm text-neutral-500 font-medium">
                  VTX
                </p>
                {BALANCE_FETCH_STATUS === "Pending" ? (
                  <Skeleton width={75} height={30} />
                ) : (
                  <h2 className="font-inter font-semibold text-3xl text-white">
                    {formatNumber(balance, 1)}
                  </h2>
                )}
              </Box>
              <Box className="flex-col gap-1 items-center">
                {BALANCE_FETCH_STATUS === "Pending" ? (
                  <Skeleton width={38} height={38} radius="full" />
                ) : (
                  <IconButton radius="full" disabled={balance === 0}>
                    <MdArrowOutward size={20} />
                  </IconButton>
                )}
                <p className="font-inter text-white font-xs font-medium">
                  Send
                </p>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Votes */}
          <Box className="flex-col gap-1 items-center">
            <p className="font-inter text-sm text-neutral-500 font-medium">
              Votes
            </p>
            <h2 className="font-inter font-semibold text-3xl text-white">
              {formatNumber(userCampaign.length, 1)}
            </h2>
          </Box>
        </DrawerContent>
      </DrawerPanel>
    </Drawer>
  );
};

export default MyAccount;
