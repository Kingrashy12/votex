import { Box, For, Skeleton } from "auera-ui";
import React from "react";

const LoadingCampaignView = () => {
  return (
    <Box className="gap-5 h-full max-[1024px]:flex-col w-full justify-center">
      {/* Header Card */}
      <Box className="rounded-3xl w-[350px] max-[1024px]:w-full gap-4 overflow-x-auto flex-col bg-neutral-800 border-neutral-600 p-[20px] border-1.9 h-full">
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

        <Box className="gap-3 mt-3" wrap>
          <Skeleton height={30} width={70} radius="full" />
          <Skeleton height={30} width={70} radius="full" />
          <Skeleton height={30} width={70} radius="full" />
          <Skeleton height={30} width={70} radius="full" />
        </Box>

        <Skeleton height={30} width={`100%`} radius="full" />

        <Box className="gap-3 items-center mt-2 justify-between">
          <Skeleton height={40} width={90} radius="full" />
          <Box className="items-center gap-3">
            <Skeleton height={25} width={25} radius="full" />
            <Skeleton height={25} width={25} radius="full" />
            <Skeleton height={25} width={25} radius="full" />
            <Skeleton height={25} width={25} radius="full" />
          </Box>
        </Box>
      </Box>

      {/* Details, Voters */}
      <Box className="flex-col gap-4">
        {/* Summary */}
        <Box className="rounded-3xl w-[550px] max-[1024px]:w-full gap-3 flex-col bg-neutral-800 border-neutral-600 px-8 py-8 border-1.9">
          <Skeleton height={25} width={`50%`} radius="lg" />

          <Skeleton height={40} width={`100%`} radius="lg" />
        </Box>

        {/* Stats */}
        <Box className="rounded-3xl w-[550px] max-[1024px]:w-full gap-3 flex-col bg-neutral-800 border-neutral-600 px-8 py-8 border-1.9">
          <Skeleton height={25} width={`50%`} radius="lg" />

          <Box className="flex-col gap-2">
            <For
              each={[...Array(3)]}
              render={() => (
                <Box className="gap-3 items-center">
                  <Skeleton height={15} width={`20%`} />
                  <Skeleton height={15} width={`50%`} />
                </Box>
              )}
            />
          </Box>
        </Box>

        {/* Participants */}
        <Box className="rounded-3xl w-[550px] max-[1024px]:w-full gap-3 flex-col bg-neutral-800 border-neutral-600 px-8 py-8 border-1.9">
          <Skeleton height={25} width={`50%`} radius="lg" />

          <Box className="flex-col gap-2">
            <For
              each={[...Array(6)]}
              render={() => <Skeleton height={15} width={`40%`} />}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingCampaignView;
