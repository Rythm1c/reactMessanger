import { Route, Routes, HashRouter } from "react-router-dom";
import Chat from './pages/Chat';
import Authentication from './pages/Authentication';
import ProfileCustomizer from "./pages/ProfileCustomizer";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path="/customize" element={<ProfileCustomizer />} />
        <Route path='/ChatWindow' element={<Chat />} />
      </Routes>
    </HashRouter>
  )
}

export default App
