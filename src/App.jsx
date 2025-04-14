import { Route, Routes, HashRouter } from "react-router-dom";
import Chat from './pages/Chat';
import Authentication from './pages/Authentication'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/ChatWindow' element={<Chat />} />
      </Routes>
    </HashRouter>

  )
}

export default App
