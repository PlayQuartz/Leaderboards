import './style.css';
import React, {useState, useEffect} from "react"
import { useLocation } from 'react-router-dom';

import LeaderboardBackground from './assets/background.png'
import Logo from './assets/Logo.png'

function Row({rank, teamname, points, elims, avg_place, wins}) {
    return (
        <div className='row_container'>
            <div className='rank_container'>#{rank}</div>
            <div className='name_container'>{teamname}</div>
            <div className='info_box avgplace'>{avg_place.toFixed(2)}</div>  
            <div className='info_box elims'>{elims}</div>  
            <div className='info_box wins'>{wins}</div>  
            <div className='info_box'>{points}</div>  
        </div>
    )
}

function LeaderboardTCS() {

    const leaderboard_id = new URLSearchParams(useLocation().search).get('id');

    const [leaderboard, setLeaderboard] = useState(null)
    const [page, setPage] = useState([0, 10])

    useEffect(() => {

        const fetch_data = () => {

            fetch("https://api.wls.gg/v5/leaderboards/"+leaderboard_id)
            .then(response => {return response.json()})
            .then(data => {
                let leaderboard_list = []
                for (let team in data.teams){
                    leaderboard_list.push({
                        teamname: Object.values(data.teams[team].members).map(member => member.name).sort().join(' - '),
                        elims: Object.values(data.teams[team].sessions).map(session => session.kills).reduce((acc, curr) => acc + curr, 0),
                        avg_place: Object.values(data.teams[team].sessions).map(session => session.place).reduce((acc, curr, _, arr) => acc + curr / arr.length, 0),
                        wins: Object.values(data.teams[team].sessions).map(session => session.place).reduce((acc, curr) => acc + (curr === 1 ? 1 : 0), 0),
                        place: data.teams[team].place,
                        points: data.teams[team].points
                    })
                }
                setLeaderboard(leaderboard_list)
            })

        }


        fetch_data()
        const interval = setInterval(fetch_data, 1000)
        return () => clearInterval(interval)


    }, [])

    function nextPage(){
        setPage(page.map(num => num + 10))
    }

    function previousPage(){
        setPage(page.map(num => num - 10))
    }
    
    return (
        <div className='tcs'> 
            <div className='header'>
                <img className='logo' src={Logo} />
                <a className='link' href="https://www.wls.gg/WarLegend/events/TCSeSportsLeagueSoloJuly/0/leaderboard" target="_blank" rel="noopener noreferrer">Play</a>
                <a className='link' href="https://www.twitch.tv/tcsesportsleague" target="_blank" rel="noopener noreferrer">Watch</a>
            </div>
            <div className='leaderboard_container'>
                <div className='leaderboard_table'>
                    <div className='header_container'>
                        <div className='rank_header' >RANK</div>
                        <div className='name_header'>TEAM</div>
                        <div style={{fontSize: '13px'}} className='info_header avgplace'>AVG PLACE</div>
                        <div className='info_header elims'>ELIMS</div>
                        <div className='info_header wins'>WINS</div>
                        <div className='info_header'>POINTS</div>
                    </div>
                    {leaderboard ? leaderboard.slice(page[0],page[1]).map(data => <Row rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place}/>) : ''}
                </div>
                <div className='page-manager'>
                    <div onClick={previousPage} className='previous-page page-btn'>
                        {"<<"} Previous Page
                    </div>
                    <div onClick={nextPage} className='previous-page page-btn'>
                        Next Page {">>"}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LeaderboardTCS