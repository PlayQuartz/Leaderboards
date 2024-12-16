import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes  } from 'react-router-dom';
import './index.css';

import LeaderboardTCS from './LeaderboardTCS';
import DoigbyInvitationalFtFortnite from './DoigbyInvitationalFtFortnite/Leaderboard.js';
import DeutschlandCreatorTurnier from './DeutschlandCreatorTurnier/Leaderboard.js'
import StizoCup from './StizoCup/Leaderboard.js'
import Wolt from './Wolt/Leaderboard.js'
import ReddyshRoyale from './ReddyshRoyale/Leaderboard.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes >
          <Route path="/wolt_leaderboard" element={<Wolt />} />
          <Route path="/reddysh_royale_leaderboard" element={<ReddyshRoyale />} />
          <Route path="/stizo_cup_leaderboard" element={<StizoCup />} />
          <Route path="/tcs_leaderboard" element={<LeaderboardTCS />} />
          <Route path="/doigby_leaderboard" element={<DoigbyInvitationalFtFortnite />} />
          <Route path="/deutschland_leaderboard" element={<DeutschlandCreatorTurnier />} />
        </Routes >
      </Router>
  </React.StrictMode>
);

