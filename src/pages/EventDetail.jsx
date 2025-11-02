import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '../services/eventService';
import Loading from '../components/ui/Loading';
import { LuCalendarDays, LuMapPin, LuClock } from 'react-icons/lu';
import Header from '../components/layout/Header';

export default function EventDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try{
        const data = await eventService.getEvent(id);
        setEvent(data);
      }catch(err){
        setError('Erro ao carregar o evento');
        console.error(err);
      }finally{
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if(loading) return <Loading />;
  if(error) return (
    <div className="p-6">
      <p className="text-red-500">{error}</p>
      <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-[#2E8FE0] text-white rounded">Voltar</button>
    </div>
  );

  if(!event) return (
    <div className="p-6">
      <p>Nenhum evento encontrado.</p>
      <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-[#2E8FE0] text-white rounded">Voltar</button>
    </div>
  );

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <Header />
      <main className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <button onClick={() => navigate(-1)} className="px-3 py-1 border rounded">Voltar</button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="mb-4 text-gray-700">{event.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <LuCalendarDays />
            <div>
              <div className="text-sm text-gray-500">Data</div>
              <div className="font-medium">
                {event.date ? (() => {
                  const parts = String(event.date).split('-');
                  if (parts.length === 3) {
                    const [y, m, d] = parts;
                    return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('pt-BR');
                  }
                  return new Date(event.date).toLocaleDateString('pt-BR');
                })() : '—'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LuClock />
            <div>
              <div className="text-sm text-gray-500">Horário</div>
              <div className="font-medium">{event.time}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LuMapPin />
            <div>
              <div className="text-sm text-gray-500">Local</div>
              <div className="font-medium">{event.location}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm text-gray-500">Máx. participantes</div>
          <div className="font-medium">{event.maxParticipants ?? '—'}</div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-500">Criado por</div>
          <div className="font-medium">{event.createdBy ?? '—'}</div>
        </div>
      </div>
      </main>
    </div>
  );
}
