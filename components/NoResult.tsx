import { Button } from "auera-ui";
import React from "react";
import { FiInbox } from "react-icons/fi"; // Feather Icons – you can use any icon lib you prefer

interface NoResultProps {
  header?: string;
  message?: string;
  onRetry?: () => void;
}

const NoResult: React.FC<NoResultProps> = ({
  header = "No Results Found",
  message = "We couldn’t find anything matching your request.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500 font-inter w-full">
      <FiInbox size={48} className="mb-4 text-gray-400" />
      <h2 className="text-xl font-semibold mb-2">{header}</h2>
      <p className="mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} size="md" radius="xl">
          Retry
        </Button>
      )}
    </div>
  );
};

export default NoResult;
