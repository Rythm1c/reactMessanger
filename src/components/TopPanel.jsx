import React from 'react'
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoEllipsisVertical, IoCall, IoVideocam } from "react-icons/io5";
import DropDown from './DropDown';
import { motion } from "framer-motion";

function TopPanel({
    showContacts, setShowContacts,
    showMenu, setShowMenu,
    darkMode, setDarkMode,
    activeContact

}) {
    const getInitials = (name) => {
        return name
            .split(" ")
            .map(word => word[0].toUpperCase())
            .join("")
            .slice(0, 2);
    };

    return (
        <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700 shadow-md' : 'bg-white'}`}>
            <button onClick={() => setShowContacts(!showContacts)} className="p-2 text-xl hover:cursor-pointer hover:bg-gray-500">
                <HiMenuAlt2 />
            </button>

            <div className='flex items-center'>{activeContact ?
                <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white font-bold rounded-full mr-3">
                    {getInitials(activeContact?.name || "...")}
                </div>
                :
                <div>
                </div>}

                <h2 className="text-lg font-semibold">{activeContact?.name || "Select a Contact"}</h2>
            </div>

            <div className="relative flex gap-15">
                <div className=''>
                    <button className="p-2 text-xl hover:bg-gray-500">
                        <IoCall />
                    </button>

                    <button className="p-2 text-xl hover:bg-gray-500">
                        <IoVideocam />
                    </button>
                </div>

                <div>
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-xl hover:bg-gray-500">
                        {darkMode ? <MdLightMode /> : <MdDarkMode />}
                    </button>

                    <button onClick={() => setShowMenu(!showMenu)} className="p-2 text-xl hover:bg-gray-500">
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

        </div>
    )
}

export default TopPanel