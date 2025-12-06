import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { eventService } from "../services/eventService";
import Header from "../components/layout/Header";
import Loading from "../components/ui/Loading";
import MobileFooter from "../components/layout/MobileFooter";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { mockAuth } from "../services/authService";

export default function Favorites() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const all = await eventService.getAllEvents();
        if (!user || !Array.isArray(user.favorites) || user.favorites.length === 0) {
          setEvents([]);
        } else {
          const favs = all.filter((ev) => user.favorites.includes(ev.id));
          setEvents(favs);
        }
      } catch (err) {
        console.error("Erro ao carregar eventos favoritos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user]);

  if (authLoading) return <Loading />;

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-grow bg-[#2E8FE0]/5 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md hover:bg-gray-100 transition"
            >
              Voltar
            </button>
            <h1 className="font-bold text-3xl">Meus Favoritos</h1>
          </div>

          {loading ? (
            <div className="bg-white p-6 rounded-2xl flex justify-center">
              <Loading />
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
                >
                  <div className="relative bg-gradient-to-r from-[#2E8FE0]/20 to-[#2E8FE0]/5 p-4 pb-6">
                    <div className="absolute top-2 right-3 flex gap-2">
                      {event.isTrending && (
                        <div className="bg-[#E0442f] text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                          🔥 EM ALTA
                        </div>
                      )}
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            await mockAuth.toggleFavorite(user.uid, event.id);
                          } catch (err) {
                            console.error("Erro ao atualizar favoritos:", err);
                            alert("Erro ao atualizar favoritos.");
                          }
                        }}
                        className="ml-1 p-1 rounded-md bg-white/70 hover:bg-white"
                        title={user?.favorites && user.favorites.includes(event.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      >
                        {user?.favorites && user.favorites.includes(event.id) ? (
                          <BsHeartFill className="text-red-500" size={18} />
                        ) : (
                          <BsHeart className="text-gray-600" size={18} />
                        )}
                      </button>
                    </div>
                    <h2 className="font-bold text-lg text-gray-800 pr-20">{event.title}</h2>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-sm text-gray-700 line-clamp-2">{event.description}</p>
                  </div>

                  <div className="border-t px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/events/${event.id}`);
                      }}
                      className="w-full py-2 px-4 bg-[#2E8FE0]/63 text-white font-bold rounded-lg hover:bg-[#2E8FE0] transition"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl text-center">
              <p className="text-gray-500 text-lg">Você ainda não favoritou nenhum evento.</p>
            </div>
          )}
        </div>
      </main>

      <MobileFooter />
    </div>
  );
}
