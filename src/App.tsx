import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Rabbit } from "lucide-react";
import { initI18n } from "./hooks/use-i18n";
import Links from "./components/Links";
import Profile from "./components/Profile";
import CTAButton from "./components/CTAButton";
import useAnalytics from "./hooks/useAnalytics";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseconfig";

// Initialize Firebase at app level
initializeApp(firebaseConfig);
initI18n();

export default function App() {
  const { logNewEvent } = useAnalytics();

  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    checkMobile();

    logNewEvent("page_view", { page: "home" });

    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [checkMobile, logNewEvent]);

  if (!isMobile) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
        <div className="text-center">
          <Rabbit className="w-16 h-16 mx-auto animate-bounce" />
          <h1 className="text-2xl font-bold mb-4">{t("mobileOnly")}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[92vh] overflow-scroll bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-20">
      <Profile title={t("title")} description={t("description")} />
      <Links t={t} />
      <CTAButton text={t("bookConsultation")} />
    </div>
  );
}
