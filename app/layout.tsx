import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/providers/wallet";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import { tw } from "stywind";
import { Provider } from "auera-ui";
import { stylesRules } from "./style-rules";
import AlertContainer from "@/components/Alert/AlertContainer";
import Container from "@/components/overlays/container";
import GlobalFetch from "@/providers/GlobalFetch";
import Footer from "@/components/landing/Footer";

export const inter = localFont({
  src: "../fonts/Inter-VariableFont_opsz,wght.ttf",
  style: "normal",
  variable: "--font-inter",
});

export const poppins = localFont({
  src: [
    {
      path: "../fonts/Poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={tw("antialiased", inter.variable, poppins.variable)}>
        <Provider themeVariant="obsidian" mode="dark" styleRules={stylesRules}>
          <AlertContainer />
          <WalletProvider>
            <GlobalFetch>
              <Container />
              <Navbar />
              {/* TODO: Create a Slot component to handle children and unconnected session */}
              {children}
              <Footer />
            </GlobalFetch>
          </WalletProvider>
        </Provider>
      </body>
    </html>
  );
}
