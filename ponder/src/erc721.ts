import { ponder } from "@/generated";
import { checksumAddress, zeroAddress } from "viem";
import groupos from "../../groupos.config";
import { TokenConfig } from "../../src/lib/types";
import { computeTbaAddress } from "../../src/lib/erc6551";

ponder.on("ERC721:Transfer", async ({ event, context }) => {
  const { Erc721Token } = context.db;

  const addTokenboundAccounts = groupos.tokenContracts.find(
    (tokenContract: TokenConfig) =>
      tokenContract.chainId === context.network.chainId &&
      checksumAddress(tokenContract.contractAddress) === event.log.address
  )?.addTokenboundAccounts;

  await Erc721Token.upsert({
    id: `${context.network.chainId}:${event.log.address}:${event.args.tokenId}`,
    create: {
      chainId: context.network.chainId,
      contractAddress: event.log.address,
      tokenId: event.args.tokenId,
      ownerAddress: event.args.to,
      mintedAt: event.block.timestamp,
      ...(addTokenboundAccounts && {
        tbaAddress: computeTbaAddress({
          tokenChainId: context.network.chainId,
          tokenContractAddress: event.log.address,
          tokenId: event.args.tokenId,
        }),
      }),
    },
    update: {
      ownerAddress: event.args.to,
    },
  });
});