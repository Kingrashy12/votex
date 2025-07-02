/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { FiCheckCircle, FiLock, FiZap } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <FiCheckCircle size={32} className="text-blue-500 dark:text-blue-400" />
    ),
    title: "Vote with $VTX",
    description:
      "Participate in governance by voting using Votex’s native token, $VTX. Every vote counts and is recorded on-chain.",
  },
  {
    icon: <FiLock size={32} className="text-green-500 dark:text-green-400" />,
    title: "Secure & Transparent",
    description:
      "All votes are verifiable on-chain, ensuring tamper-proof records and full transparency for every campaign.",
  },
  {
    icon: <FiZap size={32} className="text-yellow-500 dark:text-yellow-400" />,
    title: "Fast & Decentralized",
    description:
      "Launch and participate in voting campaigns without centralized gatekeepers—everything runs on smart contracts.",
  },
];

const Features: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!cardRef.current) return;

      const cards = gsap.utils.toArray(cardRef.current?.children);

      cards.forEach((card) => {
        gsap.to(card as any, {
          y: -5 * (cards.indexOf(card) + 5),
          scale: 1.1,
          opacity: 1,
          scrollTrigger: {
            trigger: card as any,
            start: "bottom bottom",
            end: "top 20%",
            scrub: true,
          },
          ease: "power1.inOut",
        });
      });
    },
    { scope: cardRef }
  );

  return (
    <div className="py-16 px-4 md:px-8 lg:px-20 text-gray-100 transition-colors">
      <h2 className="text-3xl font-bold text-center mb-10">Why Use Votex?</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        ref={cardRef}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-gray-700 bg-gray-800 shadow-sm hover:shadow-md transition cards"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
