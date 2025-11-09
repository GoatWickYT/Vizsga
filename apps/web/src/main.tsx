import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Home from './pages/Home';
import './index.css';
import './i18n';
import Navbar from './components/Navbar';
import TicketPage from './pages/Ticket';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/tickets" element={<TicketPage />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
