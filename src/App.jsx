import { Route, Routes } from "react-router-dom";
import Chat from './pages/Chat';
import Authentication from './pages/Authentication'

function App() {

  return (
    <div className='h-full'>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/ChatWindow' element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
