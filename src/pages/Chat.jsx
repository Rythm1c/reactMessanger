import { useState, useEffect } from "react";
import ContactsSideBar from "../components/ContactsSideBar";
import { motion } from "framer-motion";
import TopPanel from "../components/TopPanel.jsx";
import BottomPanel from "../components/BottomPanel.jsx";
import Messages from "../components/Messages.jsx";

function Chat({ mainUser, setMainUser }) {
    const [messages, setMessages] = useState([]);
    const [darkMode, setDarkMode] = useState(true);
    const [showContacts, setShowContacts] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [activeContact, setActiveContact] = useState(null);

    /* supabase
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
                    mainUser={mainUser}
                    messages={messages}
                    setMessages={setMessages}
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
                <Messages
                    darkMode={darkMode}
                    mainUser={mainUser}
                    messages={messages} />
                {/* Bottom Panel */}
                <BottomPanel
                    darkMode={darkMode}
                    activeContact={activeContact}
                    mainUser={mainUser}
                    messages={messages}
                    setMessages={setMessages} />
            </motion.div>
        </div>
    );
}

export default Chat