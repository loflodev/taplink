import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Rabbit } from "lucide-react";
import { initI18n } from "./hooks/use-i18n";
import Links from "./components/Links";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import CTAButton from "./components/CTAButton";
import useAnalytics from "./hooks/useAnalytics";
import { saveEvent, getIpAddress, getEnvironment } from "./services/eventService";
import { v4 as uuidv4 } from "uuid";

initI18n();

export default function App() {
  const { logNewEvent } = useAnalytics();

  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const savingEvent = async () => {
    try {
      const eventId = await saveEvent({
        title: "Home",
        timestamp: new Date(),
        ipAddress: await getIpAddress(),
        userId: uuidv4(),
        environment: getEnvironment(),
      });
      console.log("Event saved with ID:", eventId);
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  useEffect(() => {
    checkMobile();
    logNewEvent("Home");
    savingEvent();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-20">
      <Profile title={t("title")} description={t("description")} />
      <Links t={t} />
      <Footer text={t("developedBy")} author={"Louis Jr. Florival"} />
      <CTAButton text={t("bookConsultation")} />
    </div>
  );
}
