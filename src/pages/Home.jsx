import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import { eventService } from "../services/eventService";
import profile from "../imgs/profile.jpg";
import Loading from "../components/ui/Loading";
import Modal from "../components/ui/Modal";
import MobileFooter from "../components/layout/MobileFooter";
import MyEvents from "../components/layout/MyEvents";

import {
  LuCalendarDays,
  LuTrendingUp,
  LuMapPin,
  LuShare2,
  LuEarth,
  LuCalendarFold,
  LuStar,
  LuSettings,
  LuPlus,
} from "react-icons/lu";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { mockAuth } from "../services/authService";

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [participantAvatars, setParticipantAvatars] = useState([]);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user) return;
      setLoadingEvents(true);
      try {
        const events = await eventService.getAllEvents();
        const createdEvents = events.filter(
          (event) => event.createdBy === user.uid
        );
        const participatingEvents = events.filter(
          (event) =>
            Array.isArray(event.participants) &&
            event.participants.includes(user.displayName) &&
            event.createdBy !== user.uid
        );
        const allUserEvents = [
          ...createdEvents.map((e) => ({ ...e, type: "created" })),
          ...participatingEvents.map((e) => ({ ...e, type: "participating" })),
        ];
        setUserEvents(allUserEvents);
      } catch (error) {
        console.error("Erro ao buscar eventos do usuário:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchUserEvents();
  }, [user]);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoadingFeatured(true);
      try {
        const ev = await eventService.getRandomTrendingUpcomingEvent();
        setFeaturedEvent(ev);
      } catch (error) {
        console.error("Erro ao buscar evento em destaque:", error);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchFeatured();
  }, []);

  useEffect(() => {
    const fetchParticipantAvatars = async () => {
      if (
        !featuredEvent ||
        !Array.isArray(featuredEvent.participants) ||
        featuredEvent.participants.length === 0
      ) {
        setParticipantAvatars([]);
        return;
      }

      try {
        const res = await fetch("/dbUsers.json");
        const data = await res.json();
        const users = data.users || [];

        const avatars = featuredEvent.participants
          .map((p) => {
            const u = users.find(
              (u) =>
                u.username === p ||
                u.displayName === p ||
                String(u.id) === String(p)
            );
            return u && (u.avatar || u.photoURL)
              ? u.avatar || u.photoURL
              : profile;
          })
          .slice(0, 4);

        setParticipantAvatars(avatars);
      } catch (err) {
        console.error("Erro ao carregar avatares:", err);
        setParticipantAvatars(
          featuredEvent.participants.slice(0, 4).map(() => profile)
        );
      }
    };

    fetchParticipantAvatars();
  }, [featuredEvent]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
    } catch {
      return dateStr;
    }
  };

  const getConfirmedCount = (ev) => {
    if (!ev) return 0;
    if (Array.isArray(ev.participants)) return ev.participants.length;
    if (typeof ev.confirmed === "number") return ev.confirmed;
    return 0;
  };

  const handleShareEvent = () => {
    if (!featuredEvent) return;
    const eventUrl = `${window.location.origin}/events/${featuredEvent.id}`;
    navigator.clipboard
      .writeText(eventUrl)
      .then(() => {
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      })
      .catch(() => {
        alert("Erro ao copiar link. Tente novamente.");
      });
  };

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-grow bg-[#2E8FE0]/5 scroll-auto">
        <div className="grid md:grid-cols-2 gap-8 m-10 grid-cols-1 order-0">
          <section className="flex flex-col">
            <div className="bg-[#2E8FE0]/17 rounded-3xl p-10 hidden sm:block">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#2E8FE0]/53 w-full rounded-4xl p-5 text-3xl font-bold text-white hover:bg-[#2E8FE0]/70 transition-colors"
              >
                Criar evento
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <LuEarth size={40} />
              <h1 className="font-bold text-2xl">Atalhos</h1>
            </div>

            <div className="">
              <ul className="flex items-middle justify-between">
                <li className="flex flex-col items-center gap-2">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="criarEventoSM"
                    label="Criar evento"
                  >
                    <LuPlus size={50} />
                  </Button>
                </li>

                <li className="flex flex-col items-center gap-2">
                  <Button
                    onClick={() => navigate("/upcoming")}
                    variant="criarEventoSM"
                    label="Próximos"
                  >
                    <LuCalendarFold size={50} />
                  </Button>
                </li>

                <li className="flex flex-col items-center gap-2">
                    <Button onClick={() => navigate("/favorites")} variant="criarEventoSM" label="Favoritos">
                      <LuStar fill="black" size={50} />
                    </Button>
                </li>

                <li className="flex flex-col items-center gap-2">
                  <Button variant="criarEventoSM" label="Configurações">
                    <LuSettings size={50} />
                  </Button>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2">
              <LuTrendingUp size={40} />
              <h1 className="font-bold text-2xl">Eventos em destaque</h1>
            </div>
            <div className="relative bg-white p-5 rounded-2xl flex flex-col">
              {loadingFeatured ? (
                <div className="py-8 flex justify-center">
                  <Loading />
                </div>
              ) : featuredEvent ? (
                <>
                  {featuredEvent.isTrending && (
                    <div className="absolute -top-5 right-0 bg-[#E0442f] text-black text-l font-bold px-3 py-1 rounded-md shadow">
                      🔥 EM ALTA!
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <div className="">
                      <h1 className="font-bold text-[1.5rem] wrap-anywhere">
                        {featuredEvent.title}
                      </h1>
                      <div className="flex flex-col gap-2 mt-5 w-max">
                        <div className="flex items-center gap-2">
                          <LuCalendarDays size={30} color="gray" />
                          <p className="">{formatDate(featuredEvent.date)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <LuMapPin size={30} color="gray" />
                          <p>{featuredEvent.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h2 className="bg-[#2E8FE0]/25 p-1 rounded-[0.7rem] w-40 text-center">
                        {(() => {
                          const count = getConfirmedCount(featuredEvent);
                          return count > 99
                            ? "100+ confirmados"
                            : `${count} confirmados`;
                        })()}
                      </h2>
                      <div className="flex">
                        {participantAvatars && participantAvatars.length > 0 ? (
                          participantAvatars.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                              alt="Foto de perfil"
                            />
                          ))
                        ) : (
                          <>
                            <img
                              src={profile}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                              alt="Foto de perfil"
                            />
                            <img
                              src={profile}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                              alt="Foto de perfil"
                            />
                            <img
                              src={profile}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                              alt="Foto de perfil"
                            />
                            <img
                              src={profile}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                              alt="Foto de perfil"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <button
                      onClick={() => navigate(`/events/${featuredEvent.id}`)}
                      className="p-2 w-45 font-bold bg-[#2E8FE0]/63 text-xl text-white rounded-[0.5rem] hover:cursor-pointer active:bg-[#2E8FE0] transition ease-in-out duration-100"
                    >
                      Ver detalhes
                    </button>
                    <div className="flex gap-3">
                      {user?.favorites && user.favorites.includes(featuredEvent.id) ? (
                        <BsHeartFill
                          size={22}
                          className="cursor-pointer text-red-500 transition"
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              await mockAuth.toggleFavorite(user.uid, featuredEvent.id);
                            } catch (err) {
                              console.error("Erro ao favoritar:", err);
                              alert("Erro ao favoritar. Tente novamente.");
                            }
                          }}
                        />
                      ) : (
                        <BsHeart
                          size={22}
                          className="cursor-pointer hover:text-red-500 transition"
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              await mockAuth.toggleFavorite(user.uid, featuredEvent.id);
                            } catch (err) {
                              console.error("Erro ao favoritar:", err);
                              alert("Erro ao favoritar. Tente novamente.");
                            }
                          }}
                        />
                      )}
                      <button
                        onClick={handleShareEvent}
                        className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer"
                        title="Copiar link para compartilhar"
                      >
                        <LuShare2 size={25} />
                        {shareSuccess && (
                          <span className="text-xs text-green-500">
                            Copiado!
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-6 text-center text-gray-500">
                  Nenhum evento em alta disponível no momento.
                </div>
              )}
            </div>
          </section>

          <MyEvents
            userEvents={userEvents}
            loadingEvents={loadingEvents}
            setUserEvents={setUserEvents}
          />
        </div>
      </main>

      <MobileFooter />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
}
