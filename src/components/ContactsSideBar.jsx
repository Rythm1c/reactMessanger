import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { fetchMessages, fetchContacts } from '../config/SupabaseUtils.js'

function ContactsSideBar({
    mainUser,
    activeContact,
    setActiveContact,
    setShowContacts,
    setMessages,
    darkMode }) {

    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchContacts(setContacts);
    }, []);

    const highlightActive = (contact) => {
        if (activeContact) {
            if (contact.username === activeContact.username) {
                return 'bg-blue-300';
            }
            else {
                if (darkMode) {
                    return 'bg-gray-700 border-gray-600 '
                }
                else {
                    return 'bg-gray-200'
                }
            }
        } else {
            if (darkMode) {
                return 'bg-gray-700 border-gray-600 '
            }
            else {
                return 'bg-gray-200'
            }
        }
    }
    return (<div
        className={`absolute top-0 left-0 h-full w-64  shadow-md p-4 flex flex-col 
        ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <input
            type="text"
            placeholder="Search contacts..."
            className={`p-2 mb-3 rounded-lg outline-none 
                ${darkMode ? 'text-gray-100 bg-gray-700' : 'bg-gray-200 text-gray-900'}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)} />

        <div className="flex-1 overflow-y-auto">
            {contacts.filter(contact => contact.username.toLowerCase().includes(search.toLowerCase()) && mainUser.username !== contact.username).map((contact, index) => (
                <div key={index}
                    className={`p-2 rounded-[10px] my-[5px] hover:cursor-pointer 
                            ${highlightActive(contact)
                               /*  contact.username === activeContact.username ? 'bg-blue-300' :
                            darkMode ? 'bg-gray-700 border-gray-600 ' : 'bg-gray-200' */}`
                    }
                    onClick={() => {
                        setActiveContact(contact);
                        fetchMessages(mainUser.id, contact.id, setMessages);
                        setShowContacts(false);
                    }}>
                    {contact.username}
                </div>
            ))}
        </div>
        <button
            className="mt-3 p-2 flex items-center justify-center bg-blue-500 text-white rounded-lg shadow-md"
            onClick={() => { }/* setContacts([...contacts, `New Contact ${contacts.length + 1}`]) */}>

            <AiOutlinePlus className="mr-1" /> Add Contact
        </button>
    </div>
    )
}

export default ContactsSideBar