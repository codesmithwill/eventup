import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { eventService } from '../../services/eventService';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export default function SearchEvents() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim().length === 0) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const events = await eventService.getAllEvents();
                const filtered = events.filter(event => 
                    event.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSuggestions(filtered);
            } catch (error) {
                console.error('Erro ao buscar sugestões:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (event) => {
        setSearchTerm(event.title);
        setShowSuggestions(false);
        navigate(`/events/${event.id}`);
    };

    return (
        <div className="relative flex items-center" ref={searchContainerRef}>
            <LuSearch className="absolute left-3"/>
            <input 
                type="search" 
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder='Buscar eventos...'
                className="pl-8 border border-[#2E8FE0] bg-[#2E8FE0]/7 rounded-full w-60 sm:w-80 h-10 placeholder:text-black focus:bg-[#2E8FE0]/10 focus:border-[#2E8FE0] focus:outline-none transition ease-in-out duration-300"
            />
            
            {showSuggestions && (searchTerm.trim().length > 0 || suggestions.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {loading ? (
                        <div className="p-3 text-center text-gray-500">Buscando...</div>
                    ) : suggestions.length > 0 ? (
                        <ul className="py-2">
                            {suggestions.map(event => (
                                <li 
                                    key={event.id}
                                    onClick={() => handleSuggestionClick(event)}
                                    className="px-4 py-2 hover:bg-[#2E8FE0]/10 cursor-pointer"
                                >
                                    <div className="font-medium">{event.title}</div>
                                    <div className="text-sm text-gray-500">
                                        {formatDate(event.date)} - {event.location}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-3 text-center text-gray-500">
                            Nenhum evento encontrado
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}