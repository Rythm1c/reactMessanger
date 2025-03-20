import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import ContactsSideBar from "../components/ContactsSideBar";

function Chat({ }) {
    const [messages, setMessages] = useState({});
    const [input, setInput] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const [showContacts, setShowContacts] = useState(false);
    const [activeContact, setActiveContact] = useState(null);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const sendMessage = () => {
        if (input.trim() && activeContact) {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages(prevMessages => ({
                ...prevMessages,
                [activeContact]: [...(prevMessages[activeContact] || []), { text: input, sender: "user", time: timestamp }]
            }));
            setInput("");
        }
    };

    const addEmoji = (emoji) => {
        setInput(input + emoji.emoji);
    };

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            {/* Contacts Sidebar */}
            {showContacts && <ContactsSideBar
                activeContact={activeContact}
                setActiveContact={setActiveContact}
                darkMode={darkMode} />}

            {/* Chat Section */}
            <div className="flex flex-col flex-1">
                {/* Top Panel */}
                <div className={`flex items-center justify-between p-3   ${darkMode ? 'bg-gray-800 shadow-md' : 'bg-white'}`}>
                    <button onClick={() => setShowContacts(!showContacts)} className="p-2 text-xl">
                        <HiMenuAlt2 />
                    </button>
                    <h2 className="text-lg font-semibold">{activeContact || "Select a Contact"}</h2>
                    <button onClick={toggleTheme} className="p-2 text-xl">
                        {darkMode ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {activeContact && (messages[activeContact] || []).map((msg, index) => (
                        <div key={index} className={`relative p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : darkMode ? 'bg-gray-700 text-gray-100' : ' text-gray-900 bg-gray-300'}`}>
                            {msg.text}
                            <span className="absolute bottom-0 right-1 text-xs text-gray-700 dark:text-white">{msg.time}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom Panel */}
                <div className={`p-3 shadow-md flex items-center relative ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
                    <button onClick={() => setShowEmojis(!showEmojis)} className="p-2 text-xl">
                        <BsEmojiSmile />
                    </button>
                    {showEmojis && (
                        <div className={`absolute bottom-12 left-2  p-2 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                            <EmojiPicker onEmojiClick={addEmoji} />
                        </div>
                    )}
                    <input
                        type="text"
                        className={`flex-1 p-2 mx-2 rounded-lg ${darkMode ? 'text-gray-100 bg-gray-700 outline-none' : 'bg-gray-200 text-gray-900'}`}
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        disabled={!activeContact}
                    />
                    <button onClick={sendMessage} className="p-2 text-xl" disabled={!activeContact}>
                        <FiSend />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat