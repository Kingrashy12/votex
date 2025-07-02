export type ColorKey =
  | "default"
  | "danger"
  | "success"
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "warning"
  | "error"
  | "info"
  | "black"
  | "white";

export const zIndexKeys = {
  80: "z-[80]",
  100: "z-[100]",
  150: "z-[150]",
  200: "z-[200]",
  250: "z-[250]",
  300: "z-[300]",
  350: "z-[350]",
  400: "z-[400]",
  450: "z-[450]",
  500: "z-[500]",
  550: "z-[550]",
  600: "z-[600]",
  650: "z-[650]",
  700: "z-[700]",
  750: "z-[750]",
  800: "z-[800]",
  850: "z-[850]",
  900: "z-[900]",
  950: "z-[950]",
  1000: "z-[1000]",
};

export const zIndexVariants = {
  "80": "z-[80]",
  "100": "z-[100]",
  "150": "z-[150]",
  "200": "z-[200]",
  "250": "z-[250]",
  "300": "z-[300]",
  "350": "z-[350]",
  "400": "z-[400]",
  "450": "z-[450]",
  "500": "z-[500]",
  "550": "z-[550]",
  "600": "z-[600]",
  "650": "z-[650]",
  "700": "z-[700]",
  "750": "z-[750]",
  "800": "z-[800]",
  "850": "z-[850]",
  "900": "z-[900]",
  "950": "z-[950]",
  "1000": "z-[1000]",
};

export const colorKey: Record<ColorKey, string> = {
  default: "text-neutral-900 tone-dark:text-neutral-50",
  danger: "text-red-600",
  success: "text-green-600",
  primary: "text-primary-500",
  secondary: "text-secondary-500",
  tertiary: "text-tertiary-500",
  neutral: "text-neutral-500",
  warning: "text-yellow-500",
  error: "text-red-500",
  info: "text-blue-500",
  black: "text-black",
  white: "text-white",
};
