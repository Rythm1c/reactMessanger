import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { FaMicrophone } from "react-icons/fa6";
import { sendMessage } from "../config/SupabaseUtils.js";
import { GrDocumentUpload } from "react-icons/gr";

function BottomPanel({ mainUser, activeContact, darkMode }) {
  const [showEmojis, setShowEmojis] = useState(false);
  const [input, setInput] = useState("");

  const addEmoji = (emoji) => {
    setInput(input + emoji.emoji);
  };

  const handleSendMessage = async () => {
    sendMessage(mainUser.id, activeContact.id, input);
    setInput("");
  };

  return (
    <div
      className={`p-3 shadow-md flex items-center relative ${darkMode ? "dark:bg-gray-800" : "bg-white"}`}
    >
      <button
        onClick={() => setShowEmojis(!showEmojis)}
        className="p-2 text-xl hover:border"
      >
        <BsEmojiSmile />
      </button>

      {showEmojis && (
        <div
          className={`absolute bottom-12 left-2  p-2 rounded-lg shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}
        >
          <EmojiPicker onEmojiClick={addEmoji} />
        </div>
      )}

      <button className="p-2 text-xl">
        <GrDocumentUpload />
      </button>

      <input
        type="text"
        className={`flex-1 p-2 mx-2 rounded-lg ${darkMode ? "text-gray-100 bg-gray-700 outline-none" : "bg-gray-200 text-gray-900"}`}
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        disabled={!activeContact}
      />
      <button className="p-2 text-xl hover:border">
        <FaMicrophone />
      </button>
      <button
        onClick={() => handleSendMessage()}
        className="p-2 text-xl hover:border"
        disabled={!activeContact}
      >
        <FiSend />
      </button>
    </div>
  );
}

export default BottomPanel;
