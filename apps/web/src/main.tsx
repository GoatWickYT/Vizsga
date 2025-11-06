import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Home from './pages/Home';
import Map from './pages/Map';
import Camera from './pages/Camera';
import './index.css';
import './i18n';
import Navbar from './components/Navbar';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/cams" element={<Camera />} />
                <Route path="/map" element={<Map />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
