import { useWallet } from "@/providers/wallet";
import { votexStore } from "@/store/store";
import { VotexStore } from "@/types/app";
import { useGSAP } from "@gsap/react";
import { StoreApi, useStore } from "@zoltra-toolkit/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

export const useVotexStore = () => {
  const [state] = useStore(votexStore);
  return state;
};

export const useStoreMethods = () => {
  const [, setState, dispatch, dispatchAsync] = useStore(votexStore);
  return { dispatch, dispatchAsync, setState };
};

export const useUser = () => {
  const { address, isConnected } = useWallet();
  const { profile, userCampaign, isAdmin } = useVotexStore();
  return { profile, userCampaign, isAdmin, address, isConnected };
};

export const useTopDispatch = () => {
  const { dispatchAsync } = useStoreMethods();

  const dispatch = <A>(
    arg: A,
    fn: (arg: A, context: StoreApi<VotexStore>) => Promise<void>
  ) => dispatchAsync(async (store) => await fn(arg, store));

  return { dispatch };
};

export const usePageStatus = () => {
  const [status, setStatus] = useState<"loading" | "loaded">("loading");

  useEffect(() => {
    setStatus("loaded");
  }, []);

  return { status };
};

export const useViewGSAP = () => {
  useGSAP(() => {
    gsap.fromTo(
      "#cleft",
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        delay: 1,
        stagger: 0.5,
        ease: "power1.inOut",
      }
    );
  }, []);
};
