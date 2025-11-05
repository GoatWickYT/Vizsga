import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigation = (path: string) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <main className="Navbar">
            <nav className="navbar">
                <img className="nav-image" src="/icon.png" alt="Icon" title="Icon" />

                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <div className="nav-item" onClick={() => handleNavigation('/home')}>
                        Főoldal
                    </div>
                    <div className="nav-item" onClick={() => handleNavigation('/home')}>
                        Főoldal
                    </div>
                    <div className="nav-item" onClick={() => handleNavigation('/home')}>
                        Főoldal
                    </div>
                    <div className="nav-item" onClick={() => handleNavigation('/home')}>
                        Főoldal
                    </div>
                </div>

                <div
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </nav>
            {/* Spacer so content doesn’t hide under the fixed navbar */}
            <div style={{ height: '80px' }}></div>
        </main>
    );
};

export default Navbar;
