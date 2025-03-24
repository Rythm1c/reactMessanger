import React from 'react';
import Chat from './pages/Chat';
import Authentication from './pages/Authentication'

function App() {
  let isSignedIn = false;
  return (
    <div className='h-full'>
      {
        isSignedIn ?
          <Chat /> : <Authentication />
      }
    </div>
  )
}

export default App
