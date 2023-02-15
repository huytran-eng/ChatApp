import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TestPage from './pages/TestPage'
import ChatPage from './pages/ChatPage';
import VidCall from './pages/VidCall';
import NotFound from './pages/NotFound';
import { AppProvider } from './context';
import CreateGroup from './pages/CreateGroup'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/group' element={<CreateGroup />} />
          <Route path='/call/:roomId' element={<VidCall />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
