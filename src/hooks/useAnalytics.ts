import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseconfig";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useCallback } from "react";

const useAnalytics = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebaseApp);

  const logNewEvent = useCallback(
    (eventName: string) => {
      return logEvent(analytics, eventName);
    },
    [analytics]
  );

  return { analytics, logNewEvent };
};

export default useAnalytics;
