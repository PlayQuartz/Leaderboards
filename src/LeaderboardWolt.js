import './App.css';
import React, {useState, useEffect} from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Row({rank, teamname, points, elims, avg_place, wins}) {
    return (
        <div className='row_container'>
            <div className='name_container'>
                <div className='rank_container' style={{fontFamily: rank < 4 ? 'OmnesBlack' : 'OmnesSemiBold'}}>{rank}</div>
                <div className='team_name' style={{fontFamily: rank < 4 ? 'OmnesBlack' : 'OmnesSemiBold'}}>{teamname}</div>
            </div>
            <div className='info_box' style={{fontFamily: rank < 4 ? 'OmnesBlack' : 'OmnesSemiBold'}}>{avg_place.toFixed(2)}</div>  
            <div className='info_box' style={{fontFamily: rank < 4 ? 'OmnesBlack' : 'OmnesSemiBold'}}>{elims}</div>  
            <div className='info_box' style={{fontFamily: rank < 4 ? 'OmnesBlack' : 'OmnesSemiBold'}}>{wins}</div>  
            <div className='info_box' style={{fontFamily: rank < 4 ? 'OmnesBlack' : 'OmnesSemiBold'}}>{points}</div>  
        </div>
    )
}

function LeaderboardWolt() {

    const leaderboard_id = new URLSearchParams(useLocation().search).get('id');

    const [leaderboard, setLeaderboard] = useState(null)
    const [page, setPage] = useState([0, 10])

    useEffect(() => {
        fetch("https://api.wls.gg/v5/leaderboards/"+leaderboard_id)
        .then(response => {return response.json()})
        .then(data => {
            let leaderboard_list = []
            for (let team in data.teams){
                leaderboard_list.push({
                    teamname: Object.values(data.teams[team].members).map(member => member.name).join(' - '),
                    elims: Object.values(data.teams[team].sessions).map(session => session.kills).reduce((acc, curr) => acc + curr, 0),
                    avg_place: Object.values(data.teams[team].sessions).map(session => session.place).reduce((acc, curr, _, arr) => acc + curr / arr.length, 0),
                    wins: Object.values(data.teams[team].sessions).map(session => session.place).reduce((acc, curr) => acc + (curr === 1 ? 1 : 0), 0),
                    place: data.teams[team].place,
                    points: data.teams[team].points
                })
            }
            console.log(data)
            setLeaderboard(leaderboard_list)
        })
    }, [])

    function nextPage(){
        setPage(page.map(num => num + 10))
    }

    function previousPage(){
        setPage(page.map(num => num - 10 ))
    }
    
    return (
        <div className='leaderboard_container'>
            <div className='leaderboard_table'>
                <div className='header_container'>
                    <div className='name_header'>
                        <div onClick={previousPage} style={{marginLeft: "13px"}}>RANK</div>
                        <div>TEAM</div>
                    </div>
                    <div className='info_header'>AVG PLACE</div>
                    <div className='info_header'>ELIMS</div>
                    <div className='info_header'>WINS</div>
                    <div onClick={nextPage} className='info_header'>POINTS</div>
                </div>
                {leaderboard ? leaderboard.slice(page[0],page[1]).map(data => <Row rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place}/>) : ''}
            </div>
            <div className='wolt_character'></div>
        </div>
    )
}

export default LeaderboardWolt