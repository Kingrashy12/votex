"use client";

import { useVotexStore } from "@/hooks/app";
import React from "react";

const UsedBy = () => {
  const state = useVotexStore();

  const getTotalVotes = () => {
    return state.campaigns.reduce(
      (total, campaign) => total + campaign.votes.length,
      0
    );
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Votex at a Glance</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Powering decentralized, transparent voting with the $VTX token.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow">
            <h3 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              {getTotalVotes()}
            </h3>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Total Votes Cast
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow">
            <h3 className="text-4xl font-extrabold text-green-600 dark:text-green-400">
              {state.campaigns.filter((campaign) => campaign.active).length}
            </h3>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Active Campaigns
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsedBy;
