import React from 'react'
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoEllipsisVertical } from "react-icons/io5";
import DropDown from './DropDown';
import { motion } from "framer-motion";

function TopPanel({
    showContacts, setShowContacts,
    showMenu, setShowMenu,
    darkMode, setDarkMode,
    activeContact

}) {

    return (
        <div className={`flex items-center justify-between p-3   ${darkMode ? 'bg-gray-800 shadow-md' : 'bg-white'}`}>
            <button onClick={() => setShowContacts(!showContacts)} className="p-2 text-xl">
                <HiMenuAlt2 />
            </button>
            <h2 className="text-lg font-semibold">{activeContact || "Select a Contact"}</h2>

            <div className="relative">

                <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-xl">
                    {darkMode ? <MdLightMode /> : <MdDarkMode />}
                </button>

                <button onClick={() => setShowMenu(!showMenu)} className="p-2 text-xl">
                    <IoEllipsisVertical />
                </button>

                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}>
                        <DropDown darkMode={darkMode} />
                    </motion.div>
                )}
            </div>

        </div>
    )
}

export default TopPanel