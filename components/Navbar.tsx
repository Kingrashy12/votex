"use client";
import { useWallet } from "@/providers/wallet";
import React from "react";
import ConnectButton from "./ConnectButton";
import Link from "next/link";
import { placeholderImage } from "@/assets";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  MenuPad,
  MenuPadHeader,
  MenuTrigger,
  openDrawer,
  openModal,
  toast,
} from "auera-ui";
import { shortenAddress } from "@/utils/global";
import { MdAccountBalanceWallet, MdAccountCircle } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { IoAddOutline, IoCopy } from "react-icons/io5";
import { FaEthereum } from "react-icons/fa6";
import { useUser } from "@/hooks/app";
import { HiMenu } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { tw } from "stywind";

const Navbar = () => {
  const { discountWallet, isConnected, address } = useWallet();
  const { profile, isAdmin } = useUser();
  const pathname = usePathname();

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(address);
    toast.success(`Copied: ${shortenAddress(address)}`);
  };

  return (
    <div className="w-full sticky p-3 flex items-center justify-between top-0 bg-black/30 text-neutral-300 backdrop-blur-[1px] border-b border-border z-300">
      <div className="flex items-center gap-8">
        <h2 className="font-extrabold text-3xl font-inter max-[500px]:hidden">
          Votex
        </h2>
        <div className="flex items-center gap-6 max-[500px]:hidden">
          <Link
            href="/"
            className={tw(
              "font-sans font-medium",
              pathname === "/" ? "text-blue-500" : "text-white"
            )}
          >
            Home
          </Link>
          <Link
            href="/campaigns"
            className={tw(
              "font-sans font-medium",
              pathname === "/campaigns" ? "text-blue-500" : "text-white"
            )}
          >
            Campaigns
          </Link>
        </div>

        <IconButton
          className="hidden max-[500px]:flex"
          variant="outline"
          radius="xl"
        >
          <HiMenu />
        </IconButton>
      </div>
      {isConnected ? (
        <Menu className="w-[200px] -left-8" showDivider>
          <MenuTrigger>
            <Box className="items-center gap-3 cursor-pointer hover:bg-neutral-500 px-2 py-1.5 rounded-xl active:ring-4">
              <Avatar src={profile ? profile : placeholderImage.src} />
              <p className="font-medium font-inter text-base text-white">
                {shortenAddress(address)}
              </p>
            </Box>
          </MenuTrigger>
          {/* Admin */}
          {isAdmin && (
            <MenuPad>
              <MenuPadHeader>
                <p className="font-inter font-medium text-neutral-500 text-xs">
                  Admin
                </p>
              </MenuPadHeader>
              <MenuItem onClick={() => openModal("create-campaign")}>
                <IoAddOutline size={21} />
                <p>Create Campaign</p>
              </MenuItem>
              {/* <MenuItem>
                <MdAdminPanelSettings size={24} />
                <p>Add Admin</p>
              </MenuItem>
              <MenuItem>
                <FaUserShield size={24} />
                <p>View Admins</p>
              </MenuItem> */}
            </MenuPad>
          )}
          {/* Default */}
          <MenuPad>
            <MenuItem onClick={() => openModal("buy-vtx")}>
              <FaEthereum size={20} />
              <p>Buy VTX</p>
            </MenuItem>
            <MenuItem onClick={handleCopy}>
              <IoCopy size={20} />
              <p>Copy Address</p>
            </MenuItem>
          </MenuPad>
          {/* Account */}
          <MenuPad>
            <MenuPadHeader>
              <p className="font-inter font-medium text-neutral-500 text-xs">
                Account
              </p>
            </MenuPadHeader>
            <MenuItem onClick={() => openDrawer("my-account")}>
              <MdAccountBalanceWallet size={21} />
              <p>My Account</p>
            </MenuItem>
            <MenuItem onClick={() => openModal("update-profile")}>
              <MdAccountCircle size={21} />
              <p>Update profile</p>
            </MenuItem>
          </MenuPad>
          <MenuPad>
            <MenuItem onClick={discountWallet}>
              <LuLogOut size={21} />
              <p>Disconnect</p>
            </MenuItem>
          </MenuPad>
        </Menu>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};

export default Navbar;
