import { useWallet } from "@/providers/wallet";
import { Campaign } from "@/types/app";
import { calculateProgressPercentage } from "@/utils/global";
import { useGSAP } from "@gsap/react";
import { Box, Button, formatDate, formatNumber, openModal } from "auera-ui";
import gsap from "gsap";
import React from "react";
import { FaGlobe } from "react-icons/fa6";
import { RiDiscordFill, RiTelegram2Fill, RiTwitterFill } from "react-icons/ri";
import { tw } from "stywind";

interface ViewProps {
  campaign: Campaign;
}

const CampaignInfo: React.FC<ViewProps> = ({
  campaign: { name, id, totalVoters, active, startDate, endDate, voters },
}) => {
  const { address, isConnected, connectWallet } = useWallet();

  useGSAP(() => {
    gsap.fromTo(
      "#ctop",
      { opacity: 0, y: -100 },
      {
        opacity: 1,
        y: 0,
        delay: 1,
        stagger: 0.5,
        ease: "power1.inOut",
      }
    );
  }, []);

  const percentage = calculateProgressPercentage(
    Number(startDate),
    Number(endDate)
  );

  const getProgress = () => {
    if (percentage === 100) return "Completed";
    else return `${percentage.toFixed(2)}%`;
  };

  const hasUserVoted = () => {
    return voters.some((add) => add.toLowerCase() === address.toLowerCase());
  };

  const handleParticipate = () => {
    if (isConnected) {
      openModal("vote-modal");
    } else {
      connectWallet();
    }
  };

  return (
    <Box
      id="ctop"
      className="rounded-3xl w-[350px] max-[1024px]:w-full overflow-x-auto gap-3.5 flex-col bg-neutral-700 border-neutral-500 p-[20px] border-1.9 h-full"
    >
      <Box className="gap-4 justify-between">
        {/* TODO: Display banner */}
        <Box className="gap-3">
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

      <Box className="items-center gap-3" wrap>
        <div className="rounded-full px-2 py-1.5 bg-neutral-400/30">
          <p className="font-inter text-neutral-300 text-sm">
            Total Vote:{" "}
            <span className="text-white">{formatNumber(totalVoters)}</span>
          </p>
        </div>
        <div className="rounded-full px-2 py-1.5 bg-neutral-400/30">
          <p className="font-inter text-neutral-300 text-sm">
            {active ? "Active" : "InActive"}
          </p>
        </div>
        <div className="rounded-full px-2 py-1.5 bg-neutral-400/30">
          <p className="font-inter text-neutral-300 text-sm">
            Starts:{" "}
            <span className="text-white">
              {formatDate({
                date: new Date(Number(startDate)),
                format: "mmm-dd",
              })}
            </span>
          </p>
        </div>
        <div className="rounded-full px-2 py-1.5 bg-neutral-400/30">
          <p className="font-inter text-neutral-300 text-sm">
            Ends:{" "}
            <span className="text-white">
              {formatDate({
                date: new Date(Number(endDate)),
                format: "mmm-dd",
              })}
            </span>
          </p>
        </div>
      </Box>

      <Box fullWidth className="bg-neutral-800 rounded-xl h-5 mt-2">
        <Box
          className={tw(
            "bg-blue-700 w-1/2 absolute h-full rounded-l-full",
            percentage === 100 && "rounded-r-full"
          )}
          style={{ width: `${percentage}%` }}
        />
        <span className="font-inter text-sm font-medium w-full z-100 text-center">
          {getProgress()}
        </span>
      </Box>

      <Box className="gap-3 items-center mt-2 justify-between">
        <Button
          size="md"
          radius="full"
          disabled={hasUserVoted()}
          onClick={handleParticipate}
        >
          {hasUserVoted()
            ? "You have voted"
            : isConnected
            ? "Vote Now"
            : "Connect Wallet"}
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

export default CampaignInfo;
