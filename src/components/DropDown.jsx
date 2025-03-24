import React from 'react'

function DropDown({ darkMode }) {
    return (

        <div className={`absolute right-0 mt-2 w-40 z-50
            ${darkMode ? 'bg-gray-800' : 'bg-white '}
         shadow-md rounded-md overflow-hidden`}>

            <button className={`block w-full px-4 py-2 text-left 
                                    ${darkMode ? 'bg-gray-700 hover:bg-gray-500 text-gray-100' : ' text-gray-900 hover:bg-gray-500 bg-gray-300'}`}>
                About
            </button>
            <button className={`block w-full px-4 py-2 text-left 
                                    ${darkMode ? 'bg-gray-700 hover:bg-gray-500 text-gray-100' : ' text-gray-900 hover:bg-gray-500 bg-gray-300'}`}>
                Search
            </button>
            <button className={`block w-full px-4 py-2 text-left 
                                    ${darkMode ? 'bg-gray-700 hover:bg-gray-500 text-gray-100' : ' text-gray-900 hover:bg-gray-500 bg-gray-300'}`}>
                Preferences
            </button>
            <button className={`block w-full px-4 py-2 text-left 
                                    ${darkMode ? 'bg-gray-700 hover:bg-gray-500 text-gray-100' : ' text-gray-900 hover:bg-gray-500 bg-gray-300'}`}>
                More
            </button>
        </div>

    )
}

export default DropDown