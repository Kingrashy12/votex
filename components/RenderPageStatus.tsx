"use client";

import { usePageStatus } from "@/hooks/app";
import React from "react";

interface RenderPageProps {
  loading: () => React.ReactNode;
  loaded: () => React.ReactNode;
  status?: "loading" | "loaded";
  /** Use for custom state loading detection */
  isLoading?: boolean;
}

const RenderPage: React.FC<RenderPageProps> = ({
  loaded,
  loading,
  status: CustomStatus,
  isLoading,
}) => {
  const { status } = usePageStatus();
  const page = {
    loading,
    loaded,
  };

  const Render = isLoading ? page.loading : page[CustomStatus || status];
  return <Render />;
};

export default RenderPage;
