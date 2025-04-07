import React from 'react'

function Messages({
    mainUser,
    darkMode,
    messages }) {

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {
                messages.length === 0 ?
                    <div className={`text-center text-gray-500 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        No messages yet.
                        <br />
                        Start a conversation!
                    </div>
                    :
                    messages.map((msg, index) =>
                        <div key={index} className={`max-w-xs ${msg.sender === mainUser.id ? "ml-auto" : ""}`}>
                            <div className={` p-2 rounded-lg 
                        ${msg.sender === mainUser.id ? "bg-blue-500 text-white" :
                                    darkMode ? 'bg-gray-700 text-gray-100' : ' text-gray-900 bg-gray-300'}`}>

                                <div className='p-[10px]'>
                                    {msg.text}
                                </div>

                            </div>

                            <div className={`text-xs ${msg.sender === mainUser.id ? "text-right" : ""} ${darkMode ? 'text-white' : 'text-gray-900'}`}>

                                {new Date(msg.timestamp).toLocaleTimeString()}

                            </div>

                        </div>
                    )
            }
        </div>
    )
}

export default Messages