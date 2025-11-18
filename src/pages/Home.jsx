import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
  LuHeart,
  LuTrendingUp,
  LuMapPin,
  LuShare2,
  LuEarth,
  LuCalendarFold,
  LuStar,
  LuSettings,
  LuPlus,
} from "react-icons/lu";

export default function Home() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user) return;
      setLoadingEvents(true);
      try {
        const events = await eventService.getAllEvents();
        const filteredEvents = events.filter(
          (event) => event.createdBy === user.uid
        );
        setUserEvents(filteredEvents);
      } catch (error) {
        console.error("Erro ao buscar eventos do usuário:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchUserEvents();
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-grow bg-[#2E8FE0]/5 scroll-auto">
        <div className="grid md:grid-cols-2 gap-8 m-10 grid-cols-1 order-0">
          <section className="flex flex-col">
            <div className="bg-[#2E8FE0]/17 rounded-3xl p-10 hidden sm:block">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="criarEvento"
                label="Criar um evento"
              />
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
                  <a
                    href=""
                    className="flex flex-col items-center justify-center bg-white rounded-2xl w-15 h-15 shadow-md hover:bg-gray-400 transition ease-in-out"
                  >
                    <LuCalendarFold size={50} className="" />
                  </a>
                  <p className="text-sm">Próximos</p>
                </li>

                <li className="flex flex-col items-center gap-2">
                  <a
                    href=""
                    className="flex flex-col items-center justify-center bg-white rounded-2xl w-15 h-15 shadow-md hover:bg-gray-400 transition ease-in-out"
                  >
                    <LuStar size={50} fill="black" className="" />
                  </a>
                  <p className="text-sm">Dicas</p>
                </li>

                <li className="flex flex-col items-center gap-2">
                  <a
                    href=""
                    className="flex flex-col items-center justify-center bg-white rounded-2xl w-15 h-15 shadow-md hover:bg-gray-400 transition ease-in-out"
                  >
                    <LuSettings size={50} className="" />
                  </a>
                  <p className="text-sm">Configurações</p>
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
              <div className="absolute -top-5 right-0 bg-[#E0442f] text-black text-l font-bold px-3 py-1 rounded-md shadow">
                🔥 EM ALTA!
              </div>
              <div className="flex justify-between items-start">
                <div className="">
                  <h1 className="font-bold text-[1.5rem] wrap-anywhere">
                    Festival de Música
                  </h1>
                  <div className="flex flex-col gap-2 mt-5 w-max">
                    <div className="flex items-center gap-2">
                      <LuCalendarDays size={30} color="gray" />
                      <p className="">29 de agosto</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuMapPin size={30} color="gray" />
                      <p>Instituto Infnet</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h2 className="bg-[#2E8FE0]/25 p-1 rounded-[0.7rem] w-40 text-center">
                    100+ confirmados
                  </h2>
                  <div className="flex">
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
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5">
                <button className="p-2 w-45 font-bold bg-[#2E8FE0]/63 text-xl text-white rounded-[0.5rem] hover:cursor-pointer active:bg-[#2E8FE0] transition ease-in-out duration-100">
                  Ver detalhes
                </button>
                <div className="flex gap-3">
                  <LuHeart size={25} />
                  <LuShare2 size={25} />
                </div>
              </div>
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
