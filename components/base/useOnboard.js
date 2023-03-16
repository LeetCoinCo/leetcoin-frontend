import { useState, useEffect } from "react";

const useOnboard = () => {
  const [onboard, setOnboard] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("./onboardWrapper").then(({ initOnboard }) => {
        const onboardInstance = initOnboard();
        setOnboard(onboardInstance);
      });
    }
  }, []);

  return onboard;
};

export default useOnboard;
