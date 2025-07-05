"use client";
import { AlertFn, AlertNotification } from "@/types/ui";
import { shortenAddress } from "@/utils/global";
import { Box, For, generateId, Icon, IconButton, StrFun } from "auera-ui";
import Link from "next/link";
import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { tw } from "stywind";

export let alert: AlertFn;

const Alert = () => {
  const [alerts, setAlerts] = useState<AlertNotification[]>([]);

  const show = (newAlert: AlertNotification) => {
    setAlerts((prev) => {
      if (prev.length === 0) {
        return [newAlert];
      }

      const updatedAlerts = prev.map((alert) =>
        alert.id === newAlert.id ? { ...alert, ...newAlert } : alert
      );

      if (!updatedAlerts.some((alert) => alert.id === newAlert.id)) {
        updatedAlerts.push(newAlert);
      }

      return updatedAlerts;
    });
  };

  alert = {
    success: (message, hash, children) => {
      show({
        id: generateId(10),
        message,
        hash,
        isVisible: true,
        type: "success",
        children,
      });
    },
    error: (message, hash, children) => {
      show({
        id: generateId(10),
        message,
        hash,
        isVisible: true,
        type: "error",
        children,
      });
    },
  };

  const removeAlert = (alert: AlertNotification) => {
    const update = (t: AlertNotification) => {
      return { ...t, isVisible: false };
    };

    setAlerts((prev) => {
      const mappedAlerts = prev.map((a) => (a.id === alert.id ? update(a) : a));

      //   setTimeout(() => {
      //     setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
      //   }, 500);
      return mappedAlerts.filter((a) => a.id !== alert.id);
    });
  };

  const icon = {
    success: FaCircleCheck,
    error: MdCancel,
  };

  return (
    <Box className="fixed z-600 flex-col my-10 mx-10 gap-6">
      <For
        each={alerts}
        render={(alert) => (
          <Box
            className={tw(
              "flex-col gap-3 h-auto rounded-lg relative bg-content border-border z-500 border-1.9 p-6 shadow-[4px_5px_10px] shadow-shadow min-w-[350px] max-w-[90%]",
              alert.isVisible ? "animate-dropIn" : "animate-dropOut"
            )}
          >
            <Box fullWidth className="items-center justify-between">
              <span
                className={tw(
                  "inline-flex shrink-0 rounded-full border p-2 w-fit",
                  alert.type === "success"
                    ? "border-green-300/10 bg-green-400/10"
                    : "border-red-300/10 bg-red-400/10"
                )}
              >
                <Icon
                  icon={icon[alert.type]}
                  className={tw(
                    "size-5",
                    alert.type === "success" ? "text-green-500" : "text-red-500"
                  )}
                />
              </span>

              <IconButton
                radius="xl"
                variant="outline"
                onClick={() => removeAlert(alert)}
              >
                <IoClose />
              </IconButton>
            </Box>
            <Box className="w-full flex-col">
              <h2 className="font-bold font-inter">
                {alert.type === "success" ? "Success!" : "Failed!"}
              </h2>
              <span className="mt-1 font-inter w-full">
                {StrFun.truncate(alert.message, 100)}
              </span>
            </Box>
            {alert.hash && (
              <div>
                <span className="text-sm text-gray-500 font-medium font-inter">
                  Transaction Hash:
                </span>
                <Link
                  href={`https://sepolia.etherscan.io/tx/${alert.hash}`}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 ml-2"
                >
                  {shortenAddress(alert.hash, 7)}
                </Link>
              </div>
            )}
            {alert.children && alert.children}
          </Box>
        )}
      />
    </Box>
  );
};

export default Alert;
