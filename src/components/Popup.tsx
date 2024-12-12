import { XIcon } from "lucide-react";
import React from "react";

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-6">
      <div
        className="border border-gray-400  rounded-full p-2"
        onClick={onClose}
      >
        <XIcon size={16} />
      </div>
      <div className="flex flex-col items-center justify-center text-center bg-gray-800 rounded-lg py-10 mt-2">
        <p>{message}</p>
        {/* <button
          onClick={onClose}
          className="mt-4 border border-gray-700 text-white  p-2 rounded-full"
        >
          
        </button> */}
      </div>
    </div>
  );
};

export default Popup;
