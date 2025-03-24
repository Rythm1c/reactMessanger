import { useState, useEffect } from "react";
import ContactsSideBar from "../components/ContactsSideBar";
import { motion } from "framer-motion";
import TopPanel from "../components/TopPanel.jsx";
import BottomPanel from "../components/BottomPanel.jsx";
import supabase from "../config/SupabaseClient.js";

function Chat({ }) {
    const [messages, setMessages] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [activeContact, setActiveContact] = useState(null);

/*     supabase
        .channel('messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
            console.log('New message:', payload.new);
        })
        .subscribe(); */

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: showContacts ? 0 : -300 }}
                transition={{ type: "tween", duration: 0.3 }} >

                <ContactsSideBar
                    activeContact={activeContact}
                    setShowContacts={setShowContacts}
                    setActiveContact={setActiveContact}
                    darkMode={darkMode} />

            </motion.div>
            {/* Chat Section */}
            <motion.div
                animate={{ marginLeft: showContacts ? "16rem" : "0rem" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="flex flex-col flex-1">
                <TopPanel
                    showContacts={showContacts}
                    setShowContacts={setShowContacts}
                    showMenu={showMenu} setShowMenu={setShowMenu}
                    activeContact={activeContact}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode} />

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
                <BottomPanel
                    darkMode={darkMode}
                    activeContact={activeContact}
                    setMessages={setMessages} />
            </motion.div>
        </div>
    );
}

export default Chat