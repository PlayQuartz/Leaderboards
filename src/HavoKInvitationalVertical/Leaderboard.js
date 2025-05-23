import './style.css';
import React, {useState, useEffect} from "react"
import { useLocation } from 'react-router-dom';
import rankBox from './assets/rankBox.png'
import background from './assets/background.png'

function Row({rank, teamname, points, elims, avg_place, wins}) {
    return (
        <div className='row_container'>
            <div className='rank_container' style={{backgroundImage: `url(${rankBox})`}}>{rank}</div>
            <div className='name_container'>{teamname}</div>
            <div className='info_box'>{points}</div>  
        </div>
    )
}

function LeaderboardHavoKInvitational() {

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
        setPage(page.map(num => num - 10 ))
    }
    
    return (
        <div className='havok-invitational-vertical' style={{backgroundImage: `url(${background})`}}> 
            <div className='leaderboard_container'>
                <div key={page} className='leaderboard_table'>
                    <div className='header_container'>
                        <div className='rank_header' onClick={previousPage} >RANK</div>
                        <div className='name_header'>TEAM</div>
                        <div onClick={nextPage} className='info_header'>POINTS</div>
                    </div>
                    {leaderboard ? leaderboard.slice(page[0],page[1]).map(data => <Row rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place}/>) : ''}
                </div>
            </div>
        </div>

    )
}

export default LeaderboardHavoKInvitational