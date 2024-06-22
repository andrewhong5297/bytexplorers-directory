import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { Hex } from "viem";
import {
  useAccount,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from "wagmi";

export function useTransactionWrapper({
  chainId,
  onSuccess,
}: {
  chainId?: number;
  onSuccess?: () => void;
}) {
  const [initiated, setInitiated] = useState<boolean>();
  const [hash, setHash] = useState<Hex>();

  const account = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { status } = useWaitForTransactionReceipt({
    chainId,
    hash,
  });
  const {ready} = usePrivy();

  useEffect(() => {
    if (status === "success") {
      onSuccess?.();
    }
  }, [status]);

  return {
    ctaOverride: !account.address ? "Connect" : null,
    hash,
    pending: initiated || (hash && status === "pending"),
    initiate: async (createTransaction: () => Promise<Hex>) => {
      if (!account.address) {
        // ready = true;
        return;
      }
      try {
        setInitiated(true);
        if (account.chainId !== chainId) {
          await switchChainAsync({ chainId: chainId! });
        }
        const txHash = await createTransaction();
        setHash(txHash);
      } catch (e: any) {}
      setInitiated(false);
    },
  };
}
