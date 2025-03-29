import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Chat from './pages/Chat';
import Authentication from './pages/Authentication'

function App() {
  const [user, setUser] = useState(null);
  const [hideAuth, setHidden] = useState(false);

  return (
    <div className='h-full'>
      {/*  {
        !hideAuth ?
          <Authentication
            mainUser={user}
            setMainUser={setUser}
            setHidden={setHidden} /> :
          <Chat
            mainUser={mainUser}
            setMainUser={setMainUser} />
      } */}
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/ChatWindow' element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
