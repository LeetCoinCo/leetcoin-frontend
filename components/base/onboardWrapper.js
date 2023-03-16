import Onboard from "bnc-onboard";

const initOnboard = () => {
  const onboard = Onboard({
    dappId: process.env.NEXT_PUBLIC_ONBOARD_API_KEY,
    networkId: 1, // Replace with the desired network ID (1 for Ethereum mainnet)
    walletSelect: {
      wallets: [{ walletName: "metamask", preferred: true }],
    },
    walletCheck: [
      { checkName: "derivationPath" },
      { checkName: "accounts" },
      { checkName: "connect" },
      { checkName: "network" },
      // Add more checks if needed
    ],
  });
  return onboard;
};

export { initOnboard };
