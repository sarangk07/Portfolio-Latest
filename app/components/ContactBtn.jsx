import PopupBox from "./PopUpBox";
import { useState } from "react";

export default function ContactButton({ choiceTheme }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsPopupOpen(true)}
        className={`relative w-28 px-4 mb-2 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 font-pixel text-sm ${choiceTheme === 'red' ? 'bg-red-600' : choiceTheme === 'blue' ? 'bg-blue-600' : choiceTheme === 'white' ? 'bg-zinc-400' : 'bg-gray-100 text-black hover:border-white'}`}
      >
        Contact
      </button>

      {isPopupOpen && <PopupBox setIsPopupOpen={setIsPopupOpen} />}
    </div>
  );
}
