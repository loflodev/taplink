import { useTranslation } from "react-i18next";
import useAnalytics from "../hooks/useAnalytics";
import Footer from "./Footer";

interface CTAButtonProps {
  text: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text }) => {
  const { t } = useTranslation();
  const { logNewEvent } = useAnalytics();
  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-gray-900">
      <button
        onClick={() => {
          logNewEvent("button_click", {
            button_name: "book_consultation",
            button_text: text,
          });
        }}
        className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-600"
      >
        {text}
      </button>
      <Footer text={t("developedBy")} author={"Louis Jr. Florival"} />
    </div>
  );
};

export default CTAButton;
