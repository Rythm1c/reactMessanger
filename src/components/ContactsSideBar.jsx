import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { fetchMessages, fetchContacts, getProfile, addContactToList } from '../config/SupabaseUtils.js'
import { useNavigate } from "react-router-dom";
import { logout } from '../config/supabaseAuth.js';

import { Modal } from '@mui/material';

function ContactsSideBar({
    mainUser,
    activeContact,
    setActiveContact,
    setShowContacts,
    setMessages,
    darkMode }) {


    const [contacts, setContacts] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState("");
    const [prof, setProf] = useState(null);
    const [addContact, setAddContact] = useState(false);
    const [newContactEmail, setNewContactEmail] = useState("");

    const getData = async () => {
        setContacts(await fetchContacts(mainUser.id));
        setProf(await getProfile(mainUser.id));

    }

    useEffect(() => {
        let data = [];
        contacts.forEach(async (contact) => {
            data = [...data, await getProfile(contact.contact_id)];
            setProfiles(data);
        })
    }, [contacts]);


    useEffect(() => {
        getData();
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
            if (contact.name === activeContact.name) {
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
        return name
            .split(" ")
            .map(word => word[0].toUpperCase())
            .join("")
            .slice(0, 2);
    };

    const loadContact = async (contact) => {
        setActiveContact(contact);
        let data = await fetchMessages(mainUser.id, contact.id);
        if (data) setMessages(data);
        setShowContacts(false);
    }

    let nav = useNavigate();

    const logoutEvents = async () => {
        if (confirm("do you want to logout?")) {
            await logout();
            setActiveContact(null);
            setMessages([]);
            nav('/');
        }
    }

    return (<div
        className={`absolute top-0 left-0 h-full w-64  shadow-md p-4 flex flex-col 
        ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>

        <div className={`mb-5  ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-md p-2`}>
            <div className="w-20 h-20 flex items-center justify-center bg-gray-500 text-white text-3xl font-bold rounded-full m-[auto]">
                {getInitials(prof?.name || "...")}
            </div>
            <div className='text-center'>
                <p>{prof?.name || "..."}</p>
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
            {profiles.filter((profile) =>
                profile
                    .name
                    .toLowerCase()
                    .includes(search.toLowerCase()))
                .map((profile, index) => (
                    <div key={index}
                        className={`flex items-center p-2 rounded-[10px] my-[5px] hover:cursor-pointer ${highlightActive(profile)}`}
                        onClick={() => loadContact(profile)}>
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white font-bold rounded-full mr-3">
                            {getInitials(profile.name)}
                        </div>
                        <span>
                            {profile.name}
                        </span>

                    </div>
                ))}
        </div>

        {
            addContact &&
            <div className={`flex flex-col items-center text-center px-2 py-5 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'} rounded-lg `}>
                <p>Enter contact's email</p>
                <div className='flex flex-col items-center gap-1'>
                    <input
                        type="email"
                        placeholder=""
                        value={newContactEmail}
                        className={`p-2 w-full mb-3 rounded-lg outline-none ${darkMode ? 'bg-gray-400 text-white' : 'bg-gray-100 text-black'} `}
                        onChange={(e) => setNewContactEmail(e.target.value)}
                    />
                    <button
                        className='bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white'
                        onClick={
                            async () => {

                                await addContactToList(mainUser.id, newContactEmail);
                                setNewContactEmail("");
                            }}>
                        <AiOutlinePlus />
                    </button>
                </div>

            </div>
        }
        <button
            className="mt-3 p-2 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
            onClick={() => setAddContact(!addContact)}>
            Add Contact
        </button>

        <button
            className="mt-3 p-2 flex items-center justify-center bg-red-500 hover:bg-red-700 text-white rounded-lg shadow-md"
            onClick={logoutEvents}>
            <IoLogOutOutline className="mr-1" />
            logout
        </button>
    </div>
    )
}

export default ContactsSideBar