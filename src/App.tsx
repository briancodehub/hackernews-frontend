import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import React from 'react';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Other app routes... */}

        {/* Add this as the *last* route to catch anything else */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
