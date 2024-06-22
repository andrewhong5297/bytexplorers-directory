import Image from "next/image";
import Head from "next/head";
import { useTokenContractName } from "@/lib/hooks";
import { emptyImage } from "@/lib/constants";
import MintButton from "../MintButton";
import { Button } from "@/lib/components/ui/Button";
// import { ConnectKitButton } from "connectkit";

import { TokenConfig } from "@/lib/types";
import { useContext } from "react";
import ConfigContext from "@/context/ConfigContext";
import { NotFound } from "./404";
import { ContractLink } from "../ContractLink";
import TelegramButton from "../TelegramButton";
import { Dune } from "../icons/Dune";

export function Erc721Mint({ tokenContract }: { tokenContract?: TokenConfig }) {
  const name = useTokenContractName(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );
  const { logo, theme } = useContext(ConfigContext);

  const title = `Mint ${name}`;
  return (
    <>
      {!tokenContract?.mintPage ? (
        <NotFound />
      ) : (
        <>
          <Head>
            <title>{title}</title>
            <meta name="theme-color" content="#000000" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={tokenContract?.image} />
            <meta property="twitter:card" content="summary_large_image" />
            <link rel="apple-touch-icon" href={logo} />
          </Head>
          <main
            {...(tokenContract?.mintPage?.background && {
              style: {
                backgroundImage: `url(${tokenContract?.mintPage?.background})`,
                backgroundSize: "100% auto",
                backgroundRepeat: "repeat-y",
                minHeight: "100vh" // Ensure the main element is at least the height of the viewport
              },
            })}
          >
            {/* <section className="flex justify-end sm:p-1 md:p-2 lg:p-2">
              <ConnectKitButton theme="midnight" showBalance />
            </section> */}
            <section className="flex flex-col items-center w-full min-h-screen sm:p-8 md:p-12 lg:p-16">
              <section className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-24 items-center sm:mb-2 md:mb-6 lg:mb-10">
                <section>
                  <Image
                    priority={true}
                    width={500}
                    height={500}
                    alt="ERC721 NFT"
                    className="rounded"
                    src={tokenContract?.image ?? emptyImage}
                  />
                </section>
                <section className="py-4 px-5 bg-highlightFaint text-sm rounded-lg h-fit w-full lg:w-[500px] sm:w-[350px] sm:justify-self-end">
                  <h2 className="mb-2 text-2xl">{name}</h2>
                  <div className="flex flex-row space-x-2 items-center mb-2">
                    <ContractLink contract={tokenContract} />
                  </div>
                  <div className="mb-2"> 
                    {"Join hundreds of crypto data analysts, engineers, and scientists in quests. You'll build up onchain reputation through our multi-token reward system."}
                  </div>
                  <div className="mb-10"> 
                    <a href="https://read.cryptodatabytes.com/p/join-the-bytexplorers" target="_blank" style={{ color: '#DD4850', textDecoration: 'underline' }}>Read more about the community</a>
                    , and mint your passport to get started. We're open to beginners and veterans.
                  </div>
                  <div className="flex justify-center mb-2">
                    <MintButton tokenContract={tokenContract} />
                  </div>
                  <div className="flex justify-center">
                    <TelegramButton tokenContract={tokenContract} />
                  </div>
                </section>
              </section>
              <section className="mb-8">
                <Button
                    variant="secondary"
                    onClick={() => window.open("https://dune.com/cryptodatabytes/bytexplorers", "_blank")}
                  >
                    <Dune className="h-5 w-5"/>
                    &nbsp;&nbsp;Go to Dashboard
                </Button>
              </section>
              <section className="w-[90%] mx-auto">
                <iframe
                  className="w-full"
                  style={{ height: '100vh' }} // Set the iframe height to 100vh
                  src="https://dune.com/embeds/dashboard/cryptodatabytes/bytexplorers"
                />
              </section>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default Erc721Mint;
