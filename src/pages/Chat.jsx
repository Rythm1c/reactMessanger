import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaMicrophone } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";

function Chat({ onOpenContacts }) {
    const [messages, setMessages] = useState([
        {
            text: "hi there",
            sender: "contact",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);

    const sendMessage = () => {
        if (input.trim()) {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages([...messages, { text: input, sender: "user", time: timestamp }]);
            setInput("");
        }
    };

    const addEmoji = (emoji) => {
        setInput(input + emoji.emoji);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Top Panel */}
            <div className="flex items-center p-3 bg-white dark:bg-gray-800 shadow-md">
                <button onClick={onOpenContacts} className="p-2 text-xl">
                    <HiMenuAlt2 />
                </button>
                <h2 className="ml-3 text-lg font-semibold">Chat</h2>
            </div>

            {/* Chat Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`relative p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"}`}>
                        {msg.text}
                        <span className="absolute bottom-0 right-1 text-xs text-black dark:text-white">{msg.time}</span>
                    </div>
                ))}
            </div>

            {/* Bottom Panel */}
            <div className="p-3 bg-white dark:bg-gray-800 shadow-md flex items-center">

                <button onClick={() => setShowEmojis(!showEmojis)} className="p-2 text-xl">
                    <BsEmojiSmile />
                </button>
                {showEmojis && (
                    <div className="absolute bottom-12 left-2 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg">
                        <EmojiPicker onEmojiClick={addEmoji} />
                    </div>
                )}

                <input
                    type="text"
                    className="flex-1 p-2 mx-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />

                <button onClick='' className="p-2 text-xl">
                    <FaMicrophone />
                </button>

                <button onClick={sendMessage} className="p-2 text-xl">
                    <FiSend />
                </button>
            </div>
        </div>
    )
}

export default Chat