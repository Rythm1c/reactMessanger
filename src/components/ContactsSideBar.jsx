import React, { useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";

function ContactsSideBar({
    activeContact,
    setShowContacts,
    setActiveContact,
    darkMode }) {

    const [contacts, setContacts] = useState([
        "Alice", "Bob", "Charlie", "David"
    ]);
    const [search, setSearch] = useState("");

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
            {contacts.filter(contact => contact.toLowerCase().includes(search.toLowerCase())).map((contact, index) => (
                <div key={index}
                    className={`p-2 rounded-[10px] my-[5px] hover:cursor-pointer 
                            ${contact === activeContact ? 'bg-blue-300' :
                            darkMode ? 'bg-gray-700 border-gray-600 ' : 'bg-gray-200'}`}
                    onClick={() => { setActiveContact(contact); setShowContacts(false) }}>
                    {contact}
                </div>
            ))}
        </div>
        <button
            className="mt-3 p-2 flex items-center justify-center bg-blue-500 text-white rounded-lg shadow-md"
            onClick={() => setContacts([...contacts, `New Contact ${contacts.length + 1}`])}>

            <AiOutlinePlus className="mr-1" /> Add Contact
        </button>
    </div>
    )
}

export default ContactsSideBar