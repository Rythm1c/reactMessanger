import React from 'react'
import { IoMdDownload } from "react-icons/io";

function Messages({
    mainUser,
    darkMode,
    messages }) {

    const textBoxTheme = (sender) => {
        if (sender) {
            if (darkMode) {
                return "bg-blue-300 text-black";
            } else {
                return "bg-blue-500 text-white";
            }
        } {
            if (darkMode) {
                return "bg-gray-700 text-gray-100";
            } else {
                return "text-gray-900 bg-gray-300";
            }
        }

    }

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {
                messages.length === 0 ?
                    <div className={`text-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        <p>No messages yet...</p>
                        <p>Start a conversation!</p>
                    </div>
                    :
                    messages.map((msg, index) =>
                        <div key={index} className={`max-w-xs flex flex-col ${msg.sender === mainUser.id ? "ml-auto text-right" : ""}`}>
                            <div className={` p-2 rounded-lg`}>

                                {msg.fileTYPE === "image" &&
                                    <div className=''>

                                        {
                                            msg.sender == mainUser.id ?
                                                <div className='flex'>
                                                    <div className='w-10 relative'>
                                                        <a
                                                            href={msg.fileURL}
                                                            download={`${msg.fileURL.split('/').pop()}`}
                                                            className={`${darkMode ? 'text-white' : 'text-black'} absolute bottom-0 left-1 hover:border rounded-full p-1`}>
                                                            <IoMdDownload />
                                                        </a>
                                                    </div>
                                                    <img src={msg.fileURL} alt="" className='w-full rounded-md mt-2' />
                                                </div> :
                                                <div className='flex'>

                                                    <img src={msg.fileURL} alt="" className='w-full rounded-md mt-2' />
                                                    <div className='w-10 relative'>
                                                        <a
                                                            href={msg.fileURL}
                                                            download={`${msg.fileURL.split('/').pop()}`}
                                                            className={`${darkMode ? 'text-white' : 'text-black'} absolute bottom-0 left-1 hover:border rounded-full p-1`}>
                                                            <IoMdDownload />
                                                        </a>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                }



                                {msg.fileTYPE === "video" &&
                                    <div className=''>

                                        {
                                            msg.sender == mainUser.id ?
                                                <div className='flex'>
                                                    <div className='w-10 relative'>
                                                        <a
                                                            href={msg.fileURL}
                                                            download={`${msg.fileURL.split('/').pop()}`}
                                                            className={`${darkMode ? 'text-white' : 'text-black'} absolute bottom-0 left-1 hover:border rounded-full p-1`}>
                                                            <IoMdDownload />
                                                        </a>
                                                    </div>

                                                    <video alt="" controls className='w-full rounded-md mt-2' >
                                                        <source src={msg.fileURL} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>

                                                </div> :
                                                <div className='flex'>

                                                    <video alt="" controls className='w-full rounded-md mt-2' >
                                                        <source src={msg.fileURL} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>

                                                    <div className='w-10 relative'>
                                                        <a
                                                            href={msg.fileURL}
                                                            download={`${msg.fileURL.split('/').pop()}`}
                                                            className={`${darkMode ? 'text-white' : 'text-black'} absolute bottom-0 left-1 hover:border rounded-full p-1`}>
                                                            <IoMdDownload />
                                                        </a>
                                                    </div>
                                                </div>
                                        }

                                    </div>
                                }

                            </div>
                            <div className=''>
                                <div className={`p-[10px] inline-block rounded-sm ${textBoxTheme(msg.sender === mainUser.id)}`}>
                                    {msg.text}
                                </div>
                            </div>
                            <div
                                className={`text-xs ${msg.sender === mainUser.id ? "text-right" : ""} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Messages