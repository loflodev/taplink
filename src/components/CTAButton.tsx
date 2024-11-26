import useAnalytics from "../hooks/useAnalytics";
import { getEnvironment, getIpAddress, saveEvent } from "../services/eventService";
import { v4 as uuidv4 } from "uuid";

interface CTAButtonProps {
  text: string;
}

const savingEvent = async (eventName: string) => {
  try {
    const eventId = await saveEvent({
      title: eventName,
      timestamp: new Date(),
      ipAddress: await getIpAddress(),
      userId: uuidv4(),
      environment: getEnvironment()
    });
    console.log("Event saved with ID:", eventId);
  } catch (error) {
    console.error("Failed to save event:", error);
  }
};

const CTAButton: React.FC<CTAButtonProps> = ({ text }) => {
  const { logNewEvent } = useAnalytics();
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900">
      <button
        onClick={() => {
          logNewEvent("BookNow");
          savingEvent("BookNow");
        }}
        className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors animate-pulse"
      >
        {text}
      </button>
    </div>
  );
};

export default CTAButton;
