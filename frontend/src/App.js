import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import SearchPage from './components/SearchPage'; // Import SearchPage
import ListsPage from './components/ListsPage'; // If you have a separate file for ListsPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/lists" element={<ListsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
