import {Routes, Route} from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './components/pages/HomePage';
import AccountPage from './components/pages/AccountPage';
import AdminComponent from "./components/admin/AdminComponent.jsx";
import ChatPage from './components/pages/ChatPage.jsx';
import CreatePath from './components/pages/CreatePath.jsx';
import StatsParty from './components/pages/StatsParty.jsx'
import PoliticalCalendar from "./components/pages/PoliticalCalendar.jsx";
import DeputyProfilePage from './components/admin/DeputyProfilePage.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}/>
            <Route index element={<HomePage/>}/>
            <Route path="account" element={<AccountPage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
            <Route path="/admin" element={<AdminComponent/>}/>
            <Route path="/admin/deputy/:id" element={<DeputyProfilePage/>}/>
            <Route path="/create-path" element={<CreatePath/>}/>
            <Route path="/parts" element={<StatsParty/>}/>
            <Route path="calendar" element={<PoliticalCalendar/>}/>
        </Routes>
    );
}

export default App;
