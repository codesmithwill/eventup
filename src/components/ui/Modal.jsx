import { LuX } from "react-icons/lu";
import { useState } from "react";
import { eventService } from "../../services/eventService";

export default function Modal({ isOpen, onClose, user }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    maxParticipants: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const eventDateTime = new Date(`${formData.date}T${formData.time}`);

    if (eventDateTime < now) {
      alert(
        "A data e horário do evento não podem ser anteriores ao momento atual."
      );
      return;
    }

    try {
      await eventService.createEvent({
        ...formData,
        createdBy: user?.uid,
        confirmed: 0,
        status: "active",
        maxParticipants: parseInt(formData.maxParticipants),
      });
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        maxParticipants: "",
      });
      onClose();
    } catch (error) {
      console.error("Erro ao criar evento:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Criar Evento</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <LuX size={24} />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Evento
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2E8FE0] focus:border-[#2E8FE0] outline-none"
                placeholder="Digite o nome do evento"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2E8FE0] focus:border-[#2E8FE0] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horário
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2E8FE0] focus:border-[#2E8FE0] outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Local
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2E8FE0] focus:border-[#2E8FE0] outline-none"
                placeholder="Digite o local do evento"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2E8FE0] focus:border-[#2E8FE0] outline-none min-h-[100px]"
                placeholder="Digite a descrição do evento"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número Máximo de Participantes
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2E8FE0] focus:border-[#2E8FE0] outline-none"
                placeholder="Digite o número máximo de participantes"
                min={1}
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2E8FE0] text-white rounded-lg hover:bg-[#2E8FE0]/90 transition-colors"
              >
                Criar Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
