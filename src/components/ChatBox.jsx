import React from 'react'
import { IoSend } from 'react-icons/io5'
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa6";

function ChatBox() {


    return (
        <div>
            ChatBox
            <form action="" className='flex flex-row gap-1 w-3/5'>

                <button className='border-[1px] px-1' >
                    <RiEmojiStickerLine />
                </button>

                <input type="text" className='border-[1px] w-full' />

                <button className='border-[1px] px-1' >
                    <FaMicrophone />
                </button>

                <button type='submit' className='border-[1px] px-1' >
                    <IoSend />
                </button>
            </form>
        </div>
    )
}

export default ChatBox