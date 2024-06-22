import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { base, mainnet, optimism, sepolia } from "viem/chains";
import { alchemyEndpointCore } from "@/lib/alchemy/hooks";
// import { defaultWalletConnectProjectId } from "@/lib/constants";
import { useContext } from "react";
import ConfigContext from "./ConfigContext";
import {PrivyProvider} from '@privy-io/react-auth';

const queryClient = new QueryClient();

const config = createConfig({
  // getDefaultConfig({
    chains: [mainnet, optimism, sepolia, base],
    transports: {
      [mainnet.id]: http(alchemyEndpointCore(mainnet.id)),
      [optimism.id]: http(alchemyEndpointCore(optimism.id)),
      [sepolia.id]: http(alchemyEndpointCore(sepolia.id)),
      [base.id]: http(alchemyEndpointCore(base.id)),
    },
    // walletConnectProjectId:
    //   process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
    //   defaultWalletConnectProjectId,
    // appName: "GroupOS",
  // })
});

export default function Web3Provider({ children }: { children: any }) {
  const { theme } = useContext(ConfigContext);

  console.log('privy_key', process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "");
  console.log('Type of privy_key:', typeof process.env.NEXT_PUBLIC_PRIVY_APP_ID);

  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    throw new Error('PRIVY_APP_ID environment variable is required');
  }

  console.log('hello privy')

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""}
            config={{
              // Customize Privy's appearance in your app
              appearance: {
                theme: 'light',
                accentColor: '#676FFF',
                logo: 'https://your-logo-url',
              },
              // Create embedded wallets for users who don't have a wallet
              embeddedWallets: {
                createOnLogin: 'users-without-wallets',
              },
            }}
          >
            {children}
          </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}