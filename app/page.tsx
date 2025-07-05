import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import UsedBy from "@/components/landing/UsedBy";
import { Box } from "auera-ui";

export default function Home() {
  return (
    <Box className="flex-col gap-5 h-full w-full">
      {/* Hero */}
      <Hero />
      <Features />
      <UsedBy />
    </Box>
  );
}
