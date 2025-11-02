import { 
    LuCalendarDays, 
    LuBell,
    LuHouse,
    LuHeart,
    LuCircleUserRound,
} from "react-icons/lu";

export default function MobileFooter() {
    return (
        <footer className="h-32 flex justify-center w-full max-h-fit sm:hidden">
            <ul className="flex justify-around w-full font-bold border-t-2 border-b-2 border-gray-200">
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
    );
}