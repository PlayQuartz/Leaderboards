import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes  } from 'react-router-dom';
import './index.css';

import LeaderboardWolt from './LeaderboardWolt';
import LeaderboardReddyshRoyale from './LeaderboardReddyshRoyale'
import LeaderboardStizoCup from './LeaderboardStizoCup'
import LeaderboardTCS from './LeaderboardTCS';
import DoigbyInvitationalFtFortnite from './DoigbyInvitationalFtFortnite/Leaderboard.js';
import TwitchPolls from './TwitchPolls';
import LeaderboardDeutschland from './LeaderboardDeutschland';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes >
          <Route path="/wolt_leaderboard" element={<LeaderboardWolt />} />
          <Route path="/reddysh_royale_leaderboard" element={<LeaderboardReddyshRoyale />} />
          <Route path="/stizo_cup_leaderboard" element={<LeaderboardStizoCup />} />
          <Route path="/twitch_polls" element={<TwitchPolls />} />
          <Route path="/tcs_leaderboard" element={<LeaderboardTCS />} />
          <Route path="/doigby_leaderboard" element={<DoigbyInvitationalFtFortnite />} />
          <Route path="/deutschland_leaderboard" element={<LeaderboardDeutschland />} />
        </Routes >
      </Router>
  </React.StrictMode>
);

