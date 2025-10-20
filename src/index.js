import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes  } from 'react-router-dom';
import './index.css';

import DoigbyInvitationalFtFortnite from './DoigbyInvitationalFtFortnite/Leaderboard.js';
import DeutschlandCreatorTurnier from './DeutschlandCreatorTurnier/Leaderboard.js'
import StizoCup from './StizoCup/Leaderboard.js'
import Wolt from './Wolt/Leaderboard.js'
import ReddyshRoyale from './ReddyshRoyale/Leaderboard.js'
import TCSeSports from './TCSeSports/Leaderboard.js'
import BattezVous from './BattezVous/Leaderboard.js'
import HavokShowdown from './HavokShowdown/Leaderboard.js'
import LeaderboardHavoKInvitational from './HavoKInvitational/Leaderboard.js';
import LeaderboardHavoKInvitationalVertical from './HavoKInvitationalVertical/Leaderboard.js';
import LeaderboardTangoHighSchoolCup from './TangoHighSchoolCup/Leaderboard.js';

import LeaderboardSolaryCup from './SolaryCup/Leaderboard.js';
import ErazerOverlay from './ErazerCup/Overlay.js'
import LeaderboardErazerCup from './ErazerCupLeaderboard/Leaderboard.js'
import PopUpLeaderboard from './ErazerCupLeaderboard/PopUpLeaderboard.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes >
          <Route path="/wolt_leaderboard" element={<Wolt />} />
          <Route path="/reddysh_royale_leaderboard" element={<ReddyshRoyale />} />
          <Route path="/stizo_cup_leaderboard" element={<StizoCup />} />
          <Route path="/tcs_leaderboard" element={<TCSeSports />} />
          <Route path="/doigby_leaderboard" element={<DoigbyInvitationalFtFortnite />} />
          <Route path="/battez_vous" element={<BattezVous />} />
          <Route path="/deutschland_leaderboard" element={<DeutschlandCreatorTurnier />} />
          <Route path="/havok_showdown" element={<HavokShowdown />} />
          <Route path="/havok_invitational" element={<LeaderboardHavoKInvitational />} />
          <Route path="/havok_invitational_vertical" element={<LeaderboardHavoKInvitationalVertical />} />
          <Route path="/tango_high_school_cup" element={<LeaderboardTangoHighSchoolCup />} />
          <Route path="/solary_cup" element={<LeaderboardSolaryCup />} />
          <Route path="/erazer_cup_overlay" element={<ErazerOverlay />} />
          <Route path="/erazer_cup" element={<LeaderboardErazerCup />} />
          <Route path="/popup_erazer_cup" element={<PopUpLeaderboard />} />
        </Routes >
      </Router>
  </React.StrictMode>
);

