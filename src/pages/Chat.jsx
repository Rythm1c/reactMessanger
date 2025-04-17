import { useState, useEffect } from "react";
import ContactsSideBar from "../components/ContactsSideBar";
import { motion } from "framer-motion";
import TopPanel from "../components/TopPanel.jsx";
import BottomPanel from "../components/BottomPanel.jsx";
import Messages from "../components/Messages.jsx";
import supabase from "../config/SupabaseClient.js";
import { fetchMessages, fetchContacts, getProfile } from '../config/SupabaseUtils.js'

function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [showContacts, setShowContacts] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [activeContact, setActiveContact] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (!user) return;

    const messageSubscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [user]);

  return user ? (
    <div
      className={`flex h-screen ${darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: showContacts ? 0 : -300 }}
        transition={{ type: "tween", duration: 0.3 }} >
        <ContactsSideBar
          mainUser={user}
          setUser={setUser}
          messages={messages}
          setMessages={setMessages}
          activeContact={activeContact}
          setShowContacts={setShowContacts}
          setActiveContact={setActiveContact}
          darkMode={darkMode} />
      </motion.div>
      <motion.div
        animate={{ marginLeft: showContacts ? "16rem" : "0rem" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="flex flex-col flex-1" >
        <TopPanel
          showContacts={showContacts}
          setShowContacts={setShowContacts}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          activeContact={activeContact}
          darkMode={darkMode}
          setDarkMode={setDarkMode} />

        <Messages
          mainUser={user}
          darkMode={darkMode}
          messages={messages} />

        <BottomPanel
          darkMode={darkMode}
          activeContact={activeContact}
          mainUser={user} />
      </motion.div>
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default Chat;
