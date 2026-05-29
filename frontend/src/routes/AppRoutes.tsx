import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import EventForm from '../pages/EventForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/new" element={<EventForm />} />
      <Route path="/events/:id/edit" element={<EventForm />} />
    </Routes>
  );
};

export default AppRoutes;
