import { Box, Skeleton } from "auera-ui";
import React from "react";

const LoadingCampaign = () => {
  return (
    <Box className="rounded-3xl w-[330px] max-[730px]:w-full gap-4 overflow-x-auto flex-col bg-neutral-800 border-neutral-600 p-[20px] border-1.9">
      <Box className="gap-4 justify-between">
        <Box className="gap-4">
          <Skeleton height={80} width={80} radius="xl" />
          <Box className="flex-col gap-2">
            <Skeleton height={25} width={120} />
            <Skeleton height={15} width={80} />
          </Box>
        </Box>
        <Skeleton
          height={20}
          width={20}
          radius="full"
          className="max-[350px]:hidden"
        />
      </Box>

      <Box className="gap-3 mt-3">
        <Skeleton height={30} width={70} radius="full" />
        <Skeleton height={30} width={70} radius="full" />
      </Box>

      <Box className="gap-3 items-center mt-5 justify-between">
        <Skeleton height={40} width={70} radius="full" />
        <Box className="items-center gap-3">
          <Skeleton height={25} width={25} radius="full" />
          <Skeleton height={25} width={25} radius="full" />
          <Skeleton height={25} width={25} radius="full" />
          <Skeleton height={25} width={25} radius="full" />
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingCampaign;
