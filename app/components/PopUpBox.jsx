import { useState } from 'react';

export default function PopupBox({ setIsPopupOpen }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    console.log("Email:", email);
    console.log("Message:", message);
    setIsPopupOpen(false);
  };

  return (
    <div className="fixed top-[100rem] md:top-60 inset-0 bg-black   bg-opacity-70 flex justify-center items-center">
      <div className="bg-gray-800 p-8 border-8 border-gray-900 shadow-none max-w-sm w-full pixel-box">
        <h2 className="text-3xl font-pixel mb-6 text-green-400 border-b-8 border-gray-900 pb-2">Contact Us</h2>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-6 bg-gray-700 text-green-300 border-4 border-gray-900 font-pixel focus:outline-none focus:border-green-400"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 mb-6 bg-gray-700 text-green-300 border-4 border-gray-900 font-pixel focus:outline-none focus:border-green-400"
          rows="4"
        />
        <div className="flex justify-between">
          <button
            onClick={() => setIsPopupOpen(false)}
            className="px-6 py-3 bg-red-600 text-white border-4 border-gray-900 font-pixel hover:bg-red-500 transition-colors duration-200"
          >
            Close
          </button>
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-green-600 text-white border-4 border-gray-900 font-pixel hover:bg-green-500 transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
