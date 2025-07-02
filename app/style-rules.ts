"use client";
import { defineStyleRules } from "auera-ui";

export const stylesRules = defineStyleRules({
  menu: {
    item: {
      className: [{ applyBy: "all", value: "p-[0.4rem] rounded-xl gap-4" }],
    },
    container: { className: [{ applyBy: "all", value: "z-600" }] },
    pad: { className: [{ applyBy: "all", value: "space-y-1" }] },
  },
  input: {
    className: [{ applyBy: "all", value: "h-[40px]" }],
  },
  card: {
    className: [
      { applyBy: "all", value: "bg-neutral-600 border-none shadow-none" },
    ],
  },
});
