import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientComponent from './components/client/ClientComponent'
import AdminComponent from './components/admin/AdminComponent'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ClientComponent />} />
                <Route path="/admin" element={<AdminComponent />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App