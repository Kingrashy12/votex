import { useViewGSAP } from "@/hooks/app";
import { shortenAddress } from "@/utils/global";
import { Box, MapItems, Stack } from "auera-ui";
import React from "react";
import { FaUsersSlash } from "react-icons/fa6";

const Participants = ({ participants }: { participants: string[] }) => {
  useViewGSAP();
  return (
    <Box
      id="cleft"
      className="rounded-3xl w-[550px] max-[1024px]:w-full gap-3 flex-col bg-neutral-700 border-neutral-500 px-8 py-8 border-1.9"
    >
      <h2 className="font-poppins font-semibold text-white text-xl">
        Participants
      </h2>

      <MapItems
        data={participants}
        direction="column"
        renderItem={(item) => (
          <p className="font-inter text-blue-500 text-base">
            {shortenAddress(item, 18)}
          </p>
        )}
        emptyListComponent={
          <Stack>
            <FaUsersSlash size={70} className="text-neutral-500" />
            <span className="text-neutral-400 font-inter text-base font-medium">
              No participants for this campaign yet.
            </span>
          </Stack>
        }
      />
    </Box>
  );
};

export default Participants;
