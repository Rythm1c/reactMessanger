import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { fetchMessages, fetchContacts } from '../config/SupabaseUtils.js'
import { useNavigate } from "react-router-dom";

function ContactsSideBar({
    mainUser,
    setUser,
    activeContact,
    setActiveContact,
    setShowContacts,
    setMessages,
    darkMode }) {

    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        console.log(mainUser);
        fetchContacts(setContacts);
    }, []);

    const theme = () => {
        if (darkMode) {
            return 'bg-gray-600 border-gray-600'
        }
        else {
            return 'bg-gray-200'
        }
    }

    const highlightActive = (contact) => {
        if (activeContact) {
            if (contact.username === activeContact.username) {
                return 'bg-blue-300';
            }
            else {
                return theme();
            }
        } else {
            return theme();
        }
    }

    const getInitials = (name) => {
        return name.split(" ").map(word => word[0]
            .toUpperCase())
            .join("")
            .slice(0, 2);
    };

    const loadContact = async (contact) => {
        setActiveContact(contact);
        let data = await fetchMessages(mainUser.id, contact.id);
        setMessages(data);
        setShowContacts(false);
    }

    let nav = useNavigate();

    const logoutEvents = () => {
        if (confirm("do you want to logout?")) {
            setUser(null);
            window
                .localStorage
                .removeItem('user');
            nav("/");
        }
    }

    return (<div
        className={`absolute top-0 left-0 h-full w-64  shadow-md p-4 flex flex-col 
        ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>

        <div className='mb-5'>
            <div className="w-20 h-20 flex items-center justify-center bg-gray-500 text-white text-3xl font-bold rounded-full m-[auto]">
                {getInitials(mainUser.username)}
            </div>
            <div className='text-center'>
                {mainUser.username}(you)
            </div>
        </div>

        <input
            type="text"
            placeholder="Search contacts..."
            className={`p-2 mb-3 rounded-lg outline-none 
                ${darkMode ? 'text-gray-100 bg-gray-500' : 'bg-gray-200 text-gray-900'}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)} />

        <div className="flex-1 overflow-y-auto">
            {contacts.filter((contact) =>
                contact
                    .username
                    .toLowerCase()
                    .includes(search.toLowerCase()) && mainUser.username !== contact.username)
                .map((contact, index) => (
                    <div key={index}
                        className={`flex items-center p-2 rounded-[10px] my-[5px] hover:cursor-pointer ${highlightActive(contact)}`}
                        onClick={() => loadContact(contact)}>
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white font-bold rounded-full mr-3">
                            {getInitials(contact.username)}
                        </div>
                        <span>
                            {contact.username}
                        </span>

                    </div>
                ))}
        </div>
        <button
            className="mt-3 p-2 flex items-center justify-center bg-blue-500 text-white rounded-lg shadow-md"
            onClick={() => { }}>

            <AiOutlinePlus className="mr-1" /> Add Contact
        </button>

        <button
            className="mt-3 p-2 flex items-center justify-center bg-red-500 hover:bg-red-700 text-white rounded-lg shadow-md"
            onClick={logoutEvents}>

            <IoLogOutOutline className="mr-1" /> logout
        </button>
    </div>
    )
}

export default ContactsSideBar