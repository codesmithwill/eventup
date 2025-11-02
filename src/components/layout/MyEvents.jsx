import { LuTrendingUp, LuInfo, LuTrash2 } from "react-icons/lu";
import Loading from "../ui/Loading";
import { useNavigate } from "react-router-dom";
import { eventService } from '../../services/eventService';

export default function MyEvents({ userEvents, loadingEvents, setUserEvents }) {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col">
            <div className="flex items-center gap-2">
                <LuTrendingUp size={40}/>
                <h1 className="font-bold text-2xl">Meus Eventos</h1>
            </div>
            {loadingEvents ? (
                <div className="bg-white p-3 rounded-2xl flex justify-center">
                    <Loading />
                </div>
            ) : userEvents.length > 0 ? (
                <div className="bg-white p-3 rounded-2xl flex flex-col gap-3 max-h-[225px] overflow-y-auto">
                    {userEvents.map(event => (
                        <div key={event.id} className="relative flex bg-[#F6F6F6] rounded-2xl p-4">
                            {(() => {
                                if (!event.date) return null;
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                
                                const parts = String(event.date).split('-');
                                if (parts.length !== 3) return null;
                                
                                const [y, m, d] = parts;
                                const eventDate = new Date(Number(y), Number(m) - 1, Number(d));
                                eventDate.setHours(0, 0, 0, 0);
                                
                                const diffTime = eventDate.getTime() - today.getTime();
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                
                                if (diffDays === 0) {
                                    return (
                                        <div className="absolute -top-3 right-3 bg-red-500 text-black text-l font-bold px-9 py-1 rounded-md shadow-md">
                                            Hoje
                                        </div>
                                    );
                                } else if (diffDays === 7) {
                                    return (
                                        <div className="absolute -top-3 right-3 bg-[#fae18e] text-black text-l font-bold px-7 py-1 rounded-md shadow-md">
                                            Em 7 dias
                                        </div>
                                    );
                                } else if (diffDays === 30) {
                                    return (
                                        <div className="absolute -top-3 right-3 bg-[#dfebdd] text-black text-l font-bold px-4 py-1 rounded-md shadow-md">
                                            Em 1 mês
                                        </div>
                                    );
                                }
                                return null;
                            })()}
                            <div className="flex flex-col flex-grow">
                                <h1 className="font-bold text-lg">{event.title}</h1>
                                <p className="text-gray-600">{(() => {
                                    if (!event.date) return '—';
                                    const options = { day: '2-digit', month: 'long', year: 'numeric' };
                                    const parts = String(event.date).split('-');
                                    if (parts.length === 3) {
                                        const [y, m, d] = parts;
                                        return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('pt-BR', options);
                                    }
                                    return new Date(event.date).toLocaleDateString('pt-BR', options);
                                })()}</p>
                            </div>

                            <ul className="flex items-center gap-4">
                                <li className="flex flex-col items-center gap-2">
                                    <button 
                                        onClick={() => navigate(`/events/${event.id}`)} 
                                        className="flex flex-col items-center justify-center bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition ease-in-out"
                                    >
                                        <LuInfo size={24} className="text-[#2E8FE0]"/>
                                    </button>
                                    <p className="text-sm">Detalhes</p>
                                </li>
                                <li className="flex flex-col items-center gap-2">
                                    <button 
                                        onClick={async () => {
                                            if(window.confirm('Tem certeza que deseja excluir este evento?')) {
                                                try {
                                                    await eventService.deleteEvent(event.id);
                                                    setUserEvents(prevEvents => 
                                                        prevEvents.filter(e => e.id !== event.id)
                                                    );
                                                } catch (error) {
                                                    console.error('Erro ao deletar evento:', error);
                                                    alert('Erro ao deletar evento. Tente novamente.');
                                                }
                                            }
                                        }} 
                                        className="flex flex-col items-center justify-center bg-white rounded-full p-2 shadow-md hover:bg-red-100 transition ease-in-out"
                                    >
                                        <LuTrash2 size={24} className="text-red-500"/>
                                    </button>
                                    <p className="text-sm">Deletar</p>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-6 rounded-2xl text-center">
                    <p className="text-gray-500">Você ainda não criou nenhum evento</p>
                </div>
            )}
        </section>
    );
}