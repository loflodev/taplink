import useAnalytics from "../hooks/useAnalytics";

interface CTAButtonProps {
  text: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text }) => {
  const { logNewEvent } = useAnalytics();
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900">
      <button
        onClick={() => {
          logNewEvent("button_click", { button_name: "book_consultation", button_text: text });
        }}
        className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors animate-pulse"
      >
        {text}
      </button>
    </div>
  );
};

export default CTAButton;
