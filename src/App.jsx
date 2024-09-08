import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerForm from './pages/PlayerForm/PlayerForm';
import Game1 from './pages/Game/MultiPlayerGame';
import Game2 from './pages/Game/SinglePlayerGame';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerForm />} />
        <Route path="/game/multiplayer" element={<Game1 />} />
        <Route path="/game/singleplayer" element={<Game2 />} />

      </Routes>
    </Router>
  );
};

export default App;
