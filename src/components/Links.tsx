import React, { useEffect, useRef, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import useAnalytics from "../hooks/useAnalytics";
import { LINK_DEFINITIONS } from "../constants";
import Popup from "./Popup";

interface LinksProps {
  t: ReturnType<typeof useTranslation>["t"];
}

const Links: React.FC<LinksProps> = ({ t }) => {
  const { logNewEvent } = useAnalytics();
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const links = t("links", { returnObjects: true }) as Record<string, string>;

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handlePortfolioClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const toggleAbout = () => {
    setIsAboutExpanded(!isAboutExpanded);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target as Node)
      ) {
        setIsAboutExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="px-6">
      <div className="space-y-4">
        {Object.entries(links).map(([key, value]) => {
          const linkDef = LINK_DEFINITIONS[key];
          if (key === "about") {
            return (
              <div
                key={key}
                ref={aboutRef}
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden relative"
              >
                <button
                  onClick={() => {
                    toggleAbout();
                    logNewEvent("link_click", {
                      link_type: "about",
                      link_name: value,
                    });
                  }}
                  className="w-full p-4 text-center flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-expanded={isAboutExpanded}
                >
                  <span className="flex-grow">{value}</span>
                  <EllipsisVertical className="absolute right-4" />
                </button>
                {isAboutExpanded && (
                  <div className="p-4 bg-gray-700 text-sm">
                    {t("aboutDescription")}
                  </div>
                )}
              </div>
            );
          }
          return (
            <a
              key={key}
              href={linkDef.link}
              onClick={() => {
                logNewEvent("link_click", { link_type: key, link_name: value });
                if (key === "portfolio") {
                  handlePortfolioClick();
                }
              }}
              className="block w-full p-4 text-center bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
            >
              {value}
            </a>
          );
        })}
      </div>
      {isPopupVisible && (
        <Popup
          message="Bear with me, my Portfolio is under construction"
          onClose={closePopup}
        />
      )}
    </section>
  );
};

export default Links;
