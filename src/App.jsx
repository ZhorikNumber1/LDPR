import {Routes, Route} from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './components/pages/HomePage';
import AccountPage from './components/pages/AccountPage';
import AdminComponent from "./components/admin/AdminComponent.jsx";
import ChatPage from './components/pages/ChatPage.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}/>
            <Route index element={<HomePage/>}/>
            <Route path="account" element={<AccountPage/>}/>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/admin" element={<AdminComponent/>}/>
        </Routes>
    );
}

export default App;