import React from 'react'
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoCloudUploadSharp } from "react-icons/io5";
import { uploadProfile } from '../config/SupabaseUtils';

function ProfileCustomizer() {
    const [image, setImage] = React.useState(null);
    const [username, setUsername] = React.useState("");

    let nav = useNavigate();

    return (
        <div className='flex h-screen items-center justify-center bg-gray-600 text-white '>

            <div className='flex flex-col gap-20  w-1/2 mx-[auto] bg-gray-700 shadow-2xl p-4 rounded-2xl'>
                <div className='text-center text-2xl '>
                    Customize your profile
                </div>

                <div className='flex justify-center w-4/5 rounded-xl h-40 bg-gray-800 mx-auto'>
                    {
                        image ?
                            <img
                                src={URL.createObjectURL(image)}
                                alt="pfp"
                                className='rounded-full w-30 h-30 border-[5px] m-auto' />
                            :
                            <FaRegUser
                                className='w-30 h-30 mx-[auto] text-gray-400 ' />
                    }
                </div>

                <div className='text-center'>

                    <label htmlFor="pfp" className=' items-center cursor-pointer inline-block hover:text-gray-400 hover:bg-gray-600 p-4 text-4xl'>
                        < IoCloudUploadSharp className='' />
                    </label>

                    <input
                        id='pfp'
                        type="file"
                        accept='image/*'
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImage(file);
                            }
                        }
                        }
                        className='hidden' />

                    <h3 className='text-lg text-gray-400'>
                        Choose a profile picture
                    </h3>
                </div>

                <div className='text-center'>
                    <input
                        type="text"
                        placeholder=''
                        className='border'
                        onChange={e => {
                            setUsername(e.target.value);
                        }} />
                    <h3 className='text-lg text-gray-400'>
                        Choose a name
                    </h3>
                </div>

                <div className='text-center'>
                    <button className='bg-blue-500 text-white rounded-[2px] p-1 w-1/3 hover:bg-blue-600'
                        onClick={async () => {
                            // Save the profile data to the database
                            // Redirect to the chat window
                            await uploadProfile(
                                username,
                                URL.createObjectURL(image)
                            );
                            nav("/ChatWindow");
                        }}>
                        Done
                    </button>
                </div>




            </div>
        </div>
    )
}

export default ProfileCustomizer