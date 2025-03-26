import React, { useState } from 'react';
import Chat from './pages/Chat';
import Authentication from './pages/Authentication'

function App() {
  const [mainUser, setMainUser] = useState(null);
  const [hideAuth, setHidden] = useState(false);

  return (
    <div className='h-full'>
      {
        !hideAuth ? <Authentication
          mainUser={mainUser}
          setMainUser={setMainUser}
          setHidden={setHidden} /> :
          <Chat
            mainUser={mainUser}
            setMainUser={setMainUser} />
      }

    </div>
  )
}

export default App
