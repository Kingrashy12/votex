"use client";

import { useGSAP } from "@gsap/react";
import { Button, Stack } from "auera-ui";
import gsap from "gsap";
import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Hero = () => {
  useGSAP(() => {
    gsap.to("#header", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    });

    gsap.to("#content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
      delay: 1,
      stagger: 0.2,
    });

    // gsap.fromTo(
    //   "#changeText",
    //   { text: "Secure", delay: 1 },
    //   { text: "Transparent", delay: 1 }
    // );
  }, []);

  return (
    <Stack className="my-10">
      <h1
        className="font-inter font-bold text-5xl text-white max-[600px]:text-3xl opacity-0 translate-y-10"
        id="header"
      >
        Votex - Secure and <br /> Transparent Voting
      </h1>
      {/* <h1
        className="font-inter font-bold text-5xl text-white max-[600px]:text-3xl"
        id="header"
      >
        Votex - <h1 id="changeText"></h1>
      </h1> */}
      <p
        className="font-inter font-medium text-2xl mt-3 text-gray-500 max-[600px]:text-xl text-center max-[480px]:max-w-[90%] max-[600px]:mt-1 opacity-0 translate-y-10"
        id="content"
      >
        Empowering democratic decision-making on the blockchain
      </p>
      <Button
        radius="xl"
        size="xl"
        id="content"
        className="mt-3 opacity-0 translate-y-10"
        // rightIcon={FaArrowUpRightFromSquare}
      >
        Explore the Contract
        <FaArrowUpRightFromSquare />
      </Button>
    </Stack>
  );
};

export default Hero;
