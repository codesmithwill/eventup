import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import UpcomingEvents from "./pages/UpcomingEvents";
import Favorites from "./pages/Favorites";
import "./styles/App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/upcoming" element={<UpcomingEvents />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}
