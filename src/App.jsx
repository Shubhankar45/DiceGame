import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerForm from './pages/PlayerForm/PlayerForm';
import Game from './pages/Game/Game';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerForm />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
