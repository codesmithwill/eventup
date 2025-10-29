import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

import logo from '../imgs/logo_nbg.png'
import profile from '../imgs/profile.jpg'
import Loading from "../components/ui/Loading";
import Button from "../components/ui/Button";

import { 
    LuMoon, 
    LuSearch, 
    LuCalendarDays, 
    LuBell,
    LuHouse,
    LuHeart,
    LuCircleUserRound,
    LuTrendingUp,
    LuMapPin,
    LuShare2,
    LuEarth,
    LuCalendarFold,
    LuStar,
    LuSettings,
    LuPlus,
    LuCircleUser,
    LuCircleX,
    LuMessageSquare,
    LuInfo
} from "react-icons/lu";

export default function Home() {
    const { user, loading } = useAuth();


    if (loading) return <Loading/>;
    if (!user) return <Navigate to="/login" />;

    return (
        <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
            <nav className="flex items-center w-full border-b-6 border-[#2E8FE0] h-25 justify-between px-10 order-0">
                <div className="flex gap-5">
                    <img src={logo} width={75} alt="logo eventup" className="" />
                    <div className="relative flex items-center">
                        <LuSearch className="absolute left-3"/>
                        <input 
                        type="search" 
                        placeholder= 'Buscar eventos...'
                        className="pl-8 border border-[#2E8FE0] bg-[#2E8FE0]/7 rounded-full w-60 sm:w-150 h-10 placeholder:text-black focus:bg-[#2E8FE0]/10 focus:border-[#2E8FE0] focus:outline-none transition ease-in-out duration-300"/>
                    </div>
                </div>

                <div className="hidden sm:flex gap-5">
                    <button className="hover:cursor-pointer">
                        <LuMoon size={40}/>
                    </button>
                    <button className="hover:cursor-pointer">
                        <LuCalendarDays size={40}/>
                    </button>
                    <button className="hover:cursor-pointer">
                        <LuBell size={40}/>
                    </button>
                    <button className="hover:cursor-pointer">
                        <LuCircleUser size={40}/>
                    </button>
                </div>
            </nav>

            <main className="flex-grow bg-[#2E8FE0]/5 scroll-auto md:p-5 ">
                <div className="grid md:grid-cols-2 gap-8 m-10 grid-cols-1">
                    <section className="flex-col hidden sm:block">
                        <div className="bg-[#2E8FE0]/17 rounded-3xl p-10">
                            <button className="bg-[#2E8FE0]/53 w-full rounded-4xl p-5 text-3xl font-bold text-white hover:cursor-pointer hover:bg-[#2E8FE0]/100">Criar um evento</button>
                        </div>
                    </section>

                    <section className="flex flex-col gap-5 order-3 sm:order-2 md:order-1">
                        <div className="flex items-center gap-2">
                            <LuEarth size={40}/>
                            <h1 className="font-bold text-2xl">Atalhos</h1>
                        </div>

                        <div className="">
                            <ul className="flex items-middle justify-between">
                                <li className="flex flex-col items-center gap-2">
                                    <a href="" className="flex flex-col items-center justify-center  bg-white rounded-2xl w-15 h-15 shadow-md hover:bg-gray-400 transition ease-in-out">
                                        <LuPlus size={50}/>
                                    </a>
                                    <p className="text-sm">Criar evento</p>
                                </li>

                                <li className="flex flex-col items-center gap-2">
                                    <a href="" className="flex flex-col items-center justify-center bg-white rounded-2xl w-15 h-15 shadow-md hover:bg-gray-400 transition ease-in-out">
                                        <LuCalendarFold size={50} className=""/>
                                    </a>
                                    <p className="text-sm">Próximos</p>
                                </li>

                                <li className="flex flex-col items-center gap-2">
                                    <a href="" className="flex flex-col items-center justify-center bg-white rounded-2xl w-15 h-15 shadow-md hover:bg-gray-400 transition ease-in-out">
                                        <LuStar size={50} fill="black" className=""/>
                                    </a>
                                    <p className="text-sm">Dicas</p>
                                </li>
                                
                                <li className="flex flex-col items-center gap-2">
                                    <a href="" className="flex flex-col items-center justify-center bg-white rounded-2xl w-15 h-15 shadow-md hover:bg-gray-400 transition ease-in-out">
                                        <LuSettings size={50} className=""/>
                                    </a>
                                    <p className="text-sm">Configurações</p>
                                </li>

                            </ul>
                        </div>
                    </section>

                    <section className="order-2 sm:order-1 md:order-3">
                        <div className="flex items-center gap-2">
                            <LuTrendingUp size={40}/>
                            <h1 className="font-bold text-2xl">Eventos em destaque</h1>
                        </div>
                        <div className="bg-white p-5 rounded-2xl flex flex-col">
                            <div className="flex justify-between items-start">
                                <div className="">
                                    <h1 className="font-bold text-[1.5rem] wrap-anywhere">Festival de Música</h1>
                                    <div className="flex flex-col gap-2 mt-5 w-max">
                                        <div className="flex items-center gap-2">
                                            <LuCalendarDays size={30} color="gray"/>
                                            <p className="">29 de agosto</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <LuMapPin size={30} color="gray"/>
                                            <p>Instituto Infnet</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="bg-[#2E8FE0]/25 p-1 rounded-[0.7rem] w-40 text-center">100+ confirmados</h2>
                                    <div className="flex">
                                        <img src={profile} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" alt="Foto de perfil" />
                                        <img src={profile} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" alt="Foto de perfil" />
                                        <img src={profile} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" alt="Foto de perfil" />
                                        <img src={profile} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" alt="Foto de perfil" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-5">
                                <button className="p-2 w-45 font-bold bg-[#2E8FE0]/63 text-xl text-white rounded-[0.5rem] hover:cursor-pointer active:bg-[#2E8FE0] transition ease-in-out duration-100"
                                    >Ver detalhes
                                </button>
                                <div className="flex gap-3">
                                    <LuHeart size={25} />
                                    <LuShare2 size={25} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col order-4 sm:order-3 md:order-3">
                        <div className="flex items-center gap-2">
                            <LuTrendingUp size={40}/>
                            <h1 className="font-bold text-2xl">Meus Eventos</h1>
                        </div>
                        <div className="bg-white p-3 rounded-2xl flex flex-col w-full overflow-y-auto">
                            <div className="flex flex-col rounded-2xl p-2 h-50 gap-5">
                                <div className="flex bg-[#F6F6F6] w-full h-1/3 justify-between p-2 sm:p-10 items-center rounded-2xl shadow-md">
                                    <div className="flex flex-col">
                                        <h1 className="font-bold">Festa em casa</h1>
                                        <p className="text-sm sm:text-base">01 de setembro de 2025</p>
                                    </div>

                                    <ul className="flex items-middle justify-center gap-5">
                                        <li className="flex-col items-center gap-2 hidden sm:flex">
                                            <a href="" className="flex flex-col items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-400 transition ease-in-out w-10">
                                                <LuCircleX color="red" size={30}/>
                                            </a>
                                            <p className="text-sm font-bold">Desconfirmar</p>
                                        </li>

                                        <li className="flex-col items-center gap-2 hidden sm:flex">
                                            <a href="" className="flex flex-col items-center justify-center  bg-white rounded-full shadow-md hover:bg-gray-400 transition ease-in-out w-10">
                                                <LuMessageSquare color="blue" size={30} className=""/>
                                            </a>
                                            <p className="text-sm font-bold">Chat</p>
                                        </li>

                                        <li className="flex flex-col items-center gap-2">
                                            <a href="" className="flex flex-col items-center justify-center  bg-white rounded-full shadow-md hover:bg-gray-400 transition ease-in-out w-10">
                                                <LuInfo size={30} color="lightblue" className=""/>
                                            </a>
                                            <p className="text-sm font-bold">Informações</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex bg-[#F6F6F6] w-full h-1/3 justify-between p-2 sm:p-10 items-center rounded-2xl shadow-md">
                                    <div className="flex flex-col">
                                        <h1 className="font-bold">Festa em casa</h1>
                                        <p className="text-sm sm:text-base">01 de setembro de 2025</p>
                                    </div>

                                    <ul className="flex items-middle justify-center gap-5">
                                        <li className="flex-col items-center gap-2 hidden sm:flex">
                                            <a href="" className="flex flex-col items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-400 transition ease-in-out w-10">
                                                <LuCircleX color="red" size={30}/>
                                            </a>
                                            <p className="text-sm font-bold">Desconfirmar</p>
                                        </li>

                                        <li className="flex-col items-center gap-2 hidden sm:flex">
                                            <a href="" className="flex flex-col items-center justify-center  bg-white rounded-full shadow-md hover:bg-gray-400 transition ease-in-out w-10">
                                                <LuMessageSquare color="blue" size={30} className=""/>
                                            </a>
                                            <p className="text-sm font-bold">Chat</p>
                                        </li>

                                        <li className="flex flex-col items-center gap-2">
                                            <a href="" className="flex flex-col items-center justify-center  bg-white rounded-full shadow-md hover:bg-gray-400 transition ease-in-out w-10">
                                                <LuInfo size={30} color="lightblue" className=""/>
                                            </a>
                                            <p className="text-sm font-bold">Informações</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>



                    <section className="md:order-5 sm:order-4">
                        <Button/>
                    </section>
                </div>

            </main>

            <footer className="h-32 flex justify-center w-full max-h-fit sm:hidden">
                <ul 
                className="flex justify-around w-full font-bold border-t-2 border-b-2 border-gray-200">
                    <li className="flex-1">
                        <a 
                        className="flex justify-center flex-col align-middle items-center h-full py-3 px-2 bg-[#2E8FE0]/10 text-[#2E8FE0] rounded-t-lg transition-all duration-200 hover:bg-[#2E8FE0]/20 active:bg-[#2E8FE0]/30" 
                        href="">
                                <LuCalendarDays size={35} className="mb-1"/>
                                <p className="text-sm">Eventos</p>
                        </a>
                    </li>
                    
                    <li className="flex-1">
                        <a 
                        className="flex justify-center flex-col align-middle items-center h-full py-3 px-2 text-gray-600 transition-all duration-200 hover:bg-[#2E8FE0]/10 hover:text-[#2E8FE0] active:bg-[#2E8FE0]/20" 
                        href="">
                                <LuBell size={35} className="mb-1"/>
                                <p className="text-sm">Notificações</p>
                        </a>
                    </li>
                    
                    <li className="flex-1">
                        <a 
                        className="flex justify-center flex-col align-middle items-center h-full py-3 px-2 text-gray-600 transition-all duration-200 hover:bg-[#2E8FE0]/10 hover:text-[#2E8FE0] active:bg-[#2E8FE0]/20" 
                        href="">
                                <LuHouse size={35} className="mb-1"/>
                                <p className="text-sm">Início</p>
                        </a>
                    </li>
                    
                    <li className="flex-1">
                        <a 
                        className="flex justify-center flex-col align-middle items-center h-full py-3 px-2 text-gray-600 transition-all duration-200 hover:bg-[#2E8FE0]/10 hover:text-[#2E8FE0] active:bg-[#2E8FE0]/20" 
                        href="">
                                <LuHeart size={35} className="mb-1"/>
                                <p className="text-sm">Favoritos</p>
                        </a>
                    </li>
                    
                    <li className="flex-1">
                        <a 
                        className="flex justify-center flex-col align-middle items-center h-full py-3 px-2 text-gray-600 transition-all duration-200 hover:bg-[#2E8FE0]/10 hover:text-[#2E8FE0] active:bg-[#2E8FE0]/20" 
                        href="">
                                <LuCircleUserRound size={35} className="mb-1"/>
                                <p className="text-sm">Perfil</p>
                        </a>
                    </li>
                </ul>
            </footer>
            </div>
    );
}