import './App.css';
import React from "react"
import { HashRouter as Router, Route, Routes  } from 'react-router-dom';
import LeaderboardWolt from './LeaderboardWolt';
import LeaderboardReddyshRoyale from './LeaderboardReddyshRoyale'
import LeaderboardStizoCup from './LeaderboardStizoCup'
import LeaderboardTCS from './LeaderboardTCS';
import LeaderboardDoigby from './LeaderboardDoigby';
import TwitchPolls from './TwitchPolls';



function App() {
    return (
      <Router>
        <Routes >
          <Route path="/wolt_leaderboard" element={<LeaderboardWolt />} />
          <Route path="/reddysh_royale_leaderboard" element={<LeaderboardReddyshRoyale />} />
          <Route path="/stizo_cup_leaderboard" element={<LeaderboardStizoCup />} />
          <Route path="/twitch_polls" element={<TwitchPolls />} />
          <Route path="/tcs_leaderboard" element={<LeaderboardTCS />} />
          <Route path="/doigby_leaderboard" element={<LeaderboardDoigby />} />
        </Routes >
      </Router>
    );
  }


export default App;
