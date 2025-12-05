import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { eventService } from "../services/eventService";
import Header from "../components/layout/Header";
import Loading from "../components/ui/Loading";
import MobileFooter from "../components/layout/MobileFooter";
import {
  LuCalendarDays,
  LuMapPin,
  LuClock,
  LuUsers,
  LuArrowLeft,
} from "react-icons/lu";

export default function UpcomingEvents() {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const allEvents = await eventService.getAllEvents();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = allEvents.filter((event) => {
          if (!event.date) return false;
          const parts = String(event.date).split("-");
          if (parts.length !== 3) return false;
          const [y, m, d] = parts;
          const eventDate = new Date(Number(y), Number(m) - 1, Number(d));
          eventDate.setHours(0, 0, 0, 0);
          return eventDate >= today;
        });

        setEvents(upcomingEvents);
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
        setError("Erro ao carregar eventos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getConfirmedCount = (event) => {
    if (!event) return 0;
    if (Array.isArray(event.participants)) return event.participants.length;
    if (typeof event.confirmed === "number") return event.confirmed;
    return 0;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getDaysUntilEvent = (dateStr) => {
    if (!dateStr) return -1;
    try {
      const parts = String(dateStr).split("-");
      if (parts.length !== 3) return -1;
      const [y, m, d] = parts;
      const eventDate = new Date(Number(y), Number(m) - 1, Number(d));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      eventDate.setHours(0, 0, 0, 0);
      const diffTime = eventDate.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return -1;
    }
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDate !== "all") {
      filtered = filtered.filter((event) => {
        const daysUntil = getDaysUntilEvent(event.date);
        if (filterDate === "7days") return daysUntil <= 7 && daysUntil >= 0;
        if (filterDate === "30days") return daysUntil <= 30 && daysUntil >= 0;
        if (filterDate === "later") return daysUntil > 30;
        return true;
      });
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date + "T00:00:00");
      const dateB = new Date(b.date + "T00:00:00");
      return dateA - dateB;
    });

    return filtered;
  };

  const filteredEvents = filterEvents();

  if (authLoading) return <Loading />;

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-grow bg-[#2E8FE0]/5 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md hover:bg-gray-100 transition"
            >
              <LuArrowLeft size={20} />
              Voltar
            </button>
            <h1 className="font-bold text-3xl">Próximos Eventos</h1>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar evento
                </label>
                <input
                  type="text"
                  placeholder="Nome ou local..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8FE0]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quando
                </label>
                <select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8FE0]"
                >
                  <option value="all">Todos os eventos</option>
                  <option value="7days">Próximos 7 dias</option>
                  <option value="30days">Próximos 30 dias</option>
                  <option value="later">Depois</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="bg-white p-6 rounded-2xl flex justify-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="bg-white p-6 rounded-2xl text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const daysUntil = getDaysUntilEvent(event.date);
                const confirmedCount = getConfirmedCount(event);

                return (
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
                        {daysUntil === 0 && (
                          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                            HOJE
                          </div>
                        )}
                        {daysUntil === 1 && (
                          <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                            AMANHÃ
                          </div>
                        )}
                      </div>
                      <h2 className="font-bold text-lg text-gray-800 pr-20">
                        {event.title}
                      </h2>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <LuCalendarDays size={18} className="text-[#2E8FE0]" />
                        <div>
                          <p className="text-sm font-medium">
                            {formatDate(event.date)}
                          </p>
                          {daysUntil > 0 && (
                            <p className="text-xs text-gray-500">
                              {daysUntil === 1
                                ? "Amanhã"
                                : `Em ${daysUntil} dias`}
                            </p>
                          )}
                        </div>
                      </div>

                      {event.time && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <LuClock size={18} className="text-[#2E8FE0]" />
                          <p className="text-sm">{event.time}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-gray-600">
                        <LuMapPin size={18} className="text-[#2E8FE0]" />
                        <p className="text-sm">{event.location}</p>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <LuUsers size={18} className="text-[#2E8FE0]" />
                        <p className="text-sm font-medium">
                          {confirmedCount > 99 ? "100+" : confirmedCount}{" "}
                          confirmado{confirmedCount !== 1 ? "s" : ""}
                        </p>
                      </div>

                      {event.description && (
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {event.description}
                        </p>
                      )}
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
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl text-center">
              <p className="text-gray-500 text-lg">
                {searchTerm || filterDate !== "all"
                  ? "Nenhum evento encontrado com esses filtros"
                  : "Nenhum evento disponível no momento"}
              </p>
            </div>
          )}
        </div>
      </main>

      <MobileFooter />
    </div>
  );
}
