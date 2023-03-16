// Import the Onboard type from 'bnc-onboard'
import Onboard from "bnc-onboard";
import { createContext, ReactNode, useEffect, useState } from "react";

interface OnboardProviderProps {
  children: ReactNode;
}

export type OnboardInstance = ReturnType<typeof Onboard>;

// Update the createContext line to have the Onboard type
export const OnboardContext = createContext<OnboardInstance | null>(null);

// Remove the onboard instance creation logic from OnboardProvider
export const OnboardProvider: React.FC<OnboardProviderProps> = ({
  children,
}) => {
  const [onboard, setOnboard] = useState<OnboardInstance | null>(null);

  useEffect(() => {
    const initializeOnboard = async () => {
      const apiKey = process.env.NEXT_PUBLIC_ONBOARD_API_KEY;

      if (apiKey) {
        const onboardInstance = Onboard({
          dappId: apiKey,
          networkId: 1,
          subscriptions: {
            wallet: (wallet: any) => console.log("Connected wallet:", wallet),
          },
          walletSelect: {
            wallets: [
              { walletName: "metamask" },
              // add more wallets here
            ],
          },
        });

        setOnboard(onboardInstance);
      } else {
        console.error("API key not found in environment variables");
      }
    };

    initializeOnboard();
  }, []);

  return (
    <OnboardContext.Provider value={onboard}>
      {children}
    </OnboardContext.Provider>
  );
};
