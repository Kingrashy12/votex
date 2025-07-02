import { MenuContext } from "@/context/menu";
import { useContext } from "react";

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error(
      "Missing `Menu`. Make sure you use all Menu child component within `Menu`."
    );
  }
  return context;
};
