import './App.css';
import React from "react"
import { HashRouter as Router, Route, Routes  } from 'react-router-dom';
import LeaderboardWolt from './LeaderboardWolt';
import LeaderboardReddyshRoyale from './LeaderboardReddyshRoyale'
import TwitchPolls from './TwitchPolls';


function App() {
    return (
      <Router>
        <Routes >
          <Route path="/wolt_leaderboard" element={<LeaderboardWolt />} />
          <Route path="/reddysh_royale_leaderboard" element={<LeaderboardReddyshRoyale />} />
          <Route path="/twitch_polls" element={<TwitchPolls />} />
        </Routes >
      </Router>
    );
  }

export default App;
