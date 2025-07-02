"use client";

import { Campaign } from "@/types/app";
import { useGSAP } from "@gsap/react";
import { Badge, Box, Button, formatNumber } from "auera-ui";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import React from "react";
import { FaGlobe } from "react-icons/fa6";
import { RiDiscordFill, RiTelegram2Fill, RiTwitterFill } from "react-icons/ri";

const CampaignCard: React.FC<Campaign> = ({ name, votes, active, id }) => {
  const router = useRouter();

  useGSAP(() => {
    gsap.fromTo(
      "#ccard",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        delay: 1,
        stagger: 0.5,
        ease: "power1.inOut",
      }
    );
  }, []);

  return (
    <Box
      id="ccard"
      className="rounded-3xl w-[330px] max-[730px]:w-full gap-4 overflow-x-auto flex-col bg-neutral-700 border-neutral-500 p-[20px] border-1.9"
    >
      <Box className="gap-4 justify-between">
        {/* TODO: Display banner */}
        <Box className="gap-4">
          <div className="w-20 h-20 bg-blue-600 rounded-xl shadow" />
          <Box className="flex-col">
            <h2 className="text-white font-poppins text-base font-semibold">
              {name}
            </h2>
            <p className="font-poppins text-sm font-medium text-neutral-100">
              Transaction No: {id}
            </p>
          </Box>
        </Box>
        <div className="bg-neutral-500 w-5 h-5 rounded-full max-[350px]:hidden" />
      </Box>

      {/* Badges */}
      <Box className="gap-3 mt-3">
        <Badge className="p-2.5" variant="soft" colorScheme="neutral">
          Total Votes: {formatNumber(votes.length)}
        </Badge>
        <Badge className="p-2.5" variant="soft" colorScheme="neutral">
          {active ? "Active" : "InActive"}
        </Badge>
      </Box>

      {/* Footer */}
      <Box className="gap-3 items-center mt-5 justify-between">
        <Button
          size="md"
          radius="full"
          onClick={() => router.push(`/campaigns/${id}`)}
        >
          Enter
        </Button>
        <Box className="items-center gap-3">
          <RiTwitterFill size={22} color="white" />
          <RiTelegram2Fill size={22} color="white" />
          <FaGlobe size={19} color="white" />
          <RiDiscordFill size={22} color="white" />
        </Box>
      </Box>
    </Box>
  );
};

export default CampaignCard;
