import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { type SingleValue, type StylesConfig } from 'react-select';
import './Navbar.css';
import '../index.css';
import type { LanguageOption } from '../types/LanguageOptions';
import { useTranslation } from 'react-i18next';

const customStyles: StylesConfig<LanguageOption, false> = {
    control: (base) => ({
        ...base,
        'minWidth': 140,
        'backgroundColor': 'var(--primary-bg)',
        'border': '1px solid var(--secondary-bg)',
        'borderRadius': 8,
        'paddingLeft': 4,
        'fontSize': 16,
        'color': 'var(--primary-text)',
        'boxShadow': 'none',
        '&:hover': { borderColor: 'var(--highlight-detail)' },
    }),
    singleValue: (base) => ({
        ...base,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: 'var(--primary-bg)',
        borderRadius: 8,
        marginTop: 4,
        overflow: 'hidden',
    }),
    option: (base, state) => ({
        ...base,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        cursor: 'pointer',
        backgroundColor: state.isFocused ? 'var(--highlight-bg)' : 'var(--primary-bg)',
        color: state.isFocused ? 'var(--highlight-text)' : 'var(--primary-text)',
    }),
};

const languageOptions: LanguageOption[] = [
    { value: 'hu', label: 'Magyar', icon: '/hu.png' },
    { value: 'en', label: 'English', icon: '/en.png' },
    { value: 'ge', label: 'Deutsch', icon: '/ge.png' },
    { value: 'rs', label: 'Cpпcки ', icon: '/rs.png' },
    { value: 'ro', label: 'Română', icon: '/ro.png' },
];

const Navbar = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLanguageChange = (option: SingleValue<LanguageOption>) => {
        if (option) i18n.changeLanguage(option.value);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <main className="Navbar">
            <nav className="navbar">
                <div className="navbar-left">
                    <img className="nav-image" src="/icon.png" alt="Logo" />
                </div>

                <div className="navbar-center">
                    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                        <div className="nav-item" onClick={() => handleNavigation('/tickets')}>
                            {t('tickets')}
                        </div>
                        <div className="nav-item" onClick={() => handleNavigation('/news')}>
                            {t('news')}
                        </div>
                        <div className="nav-item" onClick={() => handleNavigation('/home')}>
                            {t('home')}
                        </div>
                        <div className="nav-item" onClick={() => handleNavigation('/map')}>
                            {t('map')}
                        </div>
                        <div className="nav-item" onClick={() => handleNavigation('/cams')}>
                            {t('cams')}
                        </div>
                    </div>

                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>

                <div className="navbar-right">
                    <Select
                        options={languageOptions}
                        onChange={handleLanguageChange}
                        defaultValue={
                            languageOptions.find((o) => o.value === i18n.language) ||
                            languageOptions[0]
                        }
                        formatOptionLabel={(option) => (
                            <div className="languageSwitch">
                                <img
                                    src={option.icon}
                                    alt={option.label}
                                    className="languageSwitchImage"
                                />
                                <span>{option.label}</span>
                            </div>
                        )}
                        styles={customStyles}
                    />
                </div>
            </nav>

            {/* Spacer so content doesn’t hide under the fixed navbar */}
            <div style={{ height: '80px' }}></div>
        </main>
    );
};

export default Navbar;
