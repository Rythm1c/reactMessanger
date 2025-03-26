import React from 'react'

function Messages({
    mainUser,
    darkMode,
    messages }) {

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {(messages).map((msg, index) =>
                <div key={index} className={`relative p-2 rounded-lg max-w-xs 
                        ${msg.sender === mainUser.id ? "ml-auto bg-blue-500 text-white" :
                        darkMode ? 'bg-gray-700 text-gray-100' : ' text-gray-900 bg-gray-300'}`}>

                    <div className='p-[10px]'>
                        {msg.text}
                    </div>


                    <div className={`absolute bottom-0  right-1 text-xs 
                        ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {msg.timestamp}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Messages