import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../services/firebase";
import logo from '../imgs/logo_nbg.png'

import { 
    LuMoon, 
    LuSearch, 
    LuCalendarDays, 
    LuBell,
    LuHouse,
    LuHeart,
    LuCircleUserRound
} from "react-icons/lu";

export default function Home() {
    const { user, loading } = useAuth();

    const handleLogout = async () => {
        try {
            const auth = getAuth(app);
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (!user) return <Navigate to="/login" />;

    return (
        <div className="flex flex-col w-screen min-h-screen">
            <nav className="flex items-center w-lvw border-b-6 border-[#2E8FE0] h-25 gap-5 justify-center">
                <img src={logo} width={75} alt="logo eventup" className="" />
                <div className="relative flex items-center">
                    <LuSearch className="absolute left-3"/>
                    <input 
                    type="search" 
                    placeholder= 'Buscar eventos...'
                    className="pl-8 border border-[#2E8FE0] bg-[#2E8FE0]/7 rounded-full w-80 h-10 placeholder:text-black focus:bg-[#2E8FE0]/10 focus:border-[#2E8FE0] focus:outline-none transition ease-in-out duration-300"/>
                </div>
                <button className="hover:cursor-pointer">
                    <LuMoon size={30}/>
                </button>
            </nav>

            <main className="flex-grow bg-[#2E8FE0]/5">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Bem-vindo, {user.email}!
                    </h2>
                    <p className="text-gray-600">
                        Você está logado no sistema EventUp.
                    </p>
                </div>
            </div>
                <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                    Sair
                </button>
            </main>

            <footer className="h-32 flex justify-center w-screen max-h-fit">
                <ul 
                className="flex justify-around w-screen font-bold pt-3 pb-3 border-t-2 border-b-2 border-gray-200">
                    <li className="">
                        <a 
                        className="flex justify-center flex-col align-middle items-center" 
                        href="">
                                <LuCalendarDays color="2E8FE0" className="hover:fill-[#2E8FE0]/20" size={35}/>
                                <p className="">Eventos</p>
                        </a>
                    </li>
                    
                    <li className="">
                        <a 
                        className="flex justify-center flex-col align-middle items-center" 
                        href="">
                                <LuBell color="2E8FE0" className="hover:fill-[#2E8FE0]/20" size={35}/>
                                <p>Notificações</p>
                        </a>
                    </li>
                    
                    <li className="">
                        <a 
                        className="flex justify-center flex-col align-middle items-center" 
                        href="">
                                <LuHouse color="2E8FE0" className="hover:fill-[#2E8FE0]/20" size={35}/>
                                <p>Início</p>
                        </a>
                    </li>
                    
                    <li className="">
                        <a 
                        className="flex justify-center flex-col align-middle items-center" 
                        href="">
                                <LuHeart color="2E8FE0" className="hover:fill-[#2E8FE0]/20" size={35}/>
                                <p>Favoritos</p>
                        </a>
                    </li>
                    
                    <li className="">
                        <a 
                        className="flex justify-center flex-col align-middle items-center" 
                        href="">
                                <LuCircleUserRound color="2E8FE0" className="hover:fill-[#2E8FE0]/20" size={35}/>
                                <p>Perfil</p>
                        </a>
                    </li>
                </ul>
            </footer>
            </div>
    );
}