import GlobalRootLayout from "./providers";
import "../styles/globals.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = createConfig(
    getDefaultConfig({
      appName: "ChainGotchi MVP",
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
      chains: [bscTestnet],
    })
  );

  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-zinc-950 min-h-screen">
        <GlobalRootLayout>
          <WagmiConfig config={config}>
            <RainbowKitProvider chains={[bscTestnet]}>
              <div className="navbar bg-indigo-600 mb-5">
                <div className="container mx-auto flex items-center justify-between py-2 px-4">
                  <a href="/" className="text-2xl font-bold text-white tracking-tight">ChainGotchi</a>
                  <div>{/* ConnectButton here */}</div>
                </div>
              </div>
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </GlobalRootLayout>
      </body>
    </html>
  );
}
