import { createContext } from "react";

export interface MenuContextProps {
  isOpen: boolean;
  isVisible: boolean;
  onOpen: () => void;
  onClose: () => void;
  useColorOnHover?: boolean;
  mode: "light" | "dark";
}

export const MenuContext = createContext<MenuContextProps | undefined>(
  undefined
);
