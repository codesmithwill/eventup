import { useState, useEffect, useRef } from 'react';
import logo from '../../imgs/logo_nbg.png';
import { LuMoon } from 'react-icons/lu';
import SearchEvents from '../ui/SearchEvents';
import { useAuth } from '../../hooks/useAuth';
import profileFallback from '../../imgs/profile.jpg';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

export default function Header(){
    const { user } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const auth = getAuth(app);
            await signOut(auth);
            setMenuOpen(false);
            navigate('/login');
        } catch (err) {
            console.error('Erro ao deslogar:', err);
            alert('Erro ao deslogar. Tente novamente.');
        }
    };

    return (
        <nav className="flex items-center w-full border-b-6 border-[#2E8FE0] h-25 justify-between px-4">
            <a href="/">
                <img src={logo} width={75} alt="logo eventup" />
            </a>

            <SearchEvents />

            <div className="flex items-center gap-3 relative" ref={menuRef}>
                <button className="hover:cursor-pointer" aria-label="Alternar tema">
                    <LuMoon size={30} />
                </button>

                <button
                    onClick={() => setMenuOpen(prev => !prev)}
                    className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md hover:opacity-90"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                >
                    <img src={user?.photoURL || profileFallback} alt="avatar" className="w-full h-full object-cover" />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-12 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 transition ease-in-out duration-200">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-500 hover:font-bold hover:bg-red-100"
                        >
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}