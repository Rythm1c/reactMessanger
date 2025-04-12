import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { FaMicrophone } from "react-icons/fa6";
import { IoCloseCircleOutline, IoAttach } from "react-icons/io5";
import { sendMessage } from "../config/SupabaseUtils.js";
//import motion from "framer-motion";

function BottomPanel({ mainUser, activeContact, darkMode }) {
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [input, setInput] = useState("");

  const addEmoji = (emoji) => {
    setInput(input + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") {
      console.log("Input is empty");
      return;
    }

    if (selectedFile)
      await sendMessage(mainUser.id, activeContact.id, input, selectedFile);
    else
      await sendMessage(mainUser.id, activeContact.id, input);

    setSelectedFile(null);
    setInput("");
  };

  return (
    <div
      className={`p-3 shadow-md flex items-center relative ${darkMode ? "dark:bg-gray-700" : "bg-white"}`} >

      <button
        onClick={() => setShowEmojis(!showEmojis)}
        className="p-2 text-xl hover:border" >
        <BsEmojiSmile />
      </button>

      {showEmojis && (
        <div
          className={`absolute bottom-12 left-2  p-2 rounded-lg shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
          <EmojiPicker onEmojiClick={addEmoji} />
        </div>
      )}

      <div className="p-2 text-xl  hover:border">
        <label htmlFor="file-upload" className="hover:cursor-pointer">
          <IoAttach />
        </label>

      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setSelectedFile(file);
            setShowFilePreview(true);
          }
        }}
        className="hidden"
        id="file-upload" />

      {showFilePreview && (
        <div className={`absolute bottom-15 left-2 p-2 rounded-lg shadow-lg ${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
          <button
            onClick={() => {
              setShowFilePreview(false);
              setSelectedFile(null)
            }}
            className=" hover:text-red-500">
            <IoCloseCircleOutline />
          </button>
          <p >Selected File: {selectedFile.name}</p>
        </div>
      )}



      <input
        type="text"
        className={`flex-1 p-2 mx-2 rounded-lg ${darkMode ? "text-gray-100 bg-gray-600 outline-none" : "bg-gray-200 text-gray-900"}`}
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        disabled={!activeContact} />

      <button className="p-2 text-xl hover:border">
        <FaMicrophone />
      </button>

      <button
        onClick={() => handleSendMessage()}
        className="p-2 text-xl hover:border"
        disabled={!activeContact}>

        <FiSend />
      </button>
    </div>
  );
}

export default BottomPanel;
