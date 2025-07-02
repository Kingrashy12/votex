type AlertVariant = "success" | "error";

export type AlertFn = {
  [key in AlertVariant]: (
    message: string,
    hash: string,
    children?: React.ReactNode
  ) => void;
};

export type AlertNotification = {
  id: string;
  message: string;
  hash: string;
  type: AlertVariant;
  isVisible: boolean;
  children?: React.ReactNode;
};
