import './style.css';
import React, {useState, useEffect} from "react"
import { useLocation } from 'react-router-dom';

function Row({rank, teamname, points, elims, avg_place, wins}) {
    return (
        <div className='row_container_prod'>
            <div className='rank_container_prod'>#{rank}</div>
            <div className='name_container_prod'>{teamname}</div>
            <div className='info_box_prod'>{avg_place.toFixed(2)}</div>  
            <div className='info_box_prod'>{elims}</div>  
            <div className='info_box_prod'>{wins}</div>  
            <div className='info_box_prod'>{points}</div>  
        </div>
    )
}

function LeaderboardTCSProd() {

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
        <div className='tcs_prod'> 
            <div className='leaderboard_container_prod'>
                <div className='leaderboard_table_prod' style={{left: "240px"}}>
                    <div className='header_container_prod'>
                        <div className='rank_header_prod' onClick={previousPage} >RANK</div>
                        <div className='name_header_prod'>TEAM</div>
                        <div style={{fontSize: '13px'}} className='info_header_prod'>AVG PLACE</div>
                        <div className='info_header_prod'>ELIMS</div>
                        <div className='info_header_prod'>WINS</div>
                        <div onClick={nextPage} className='info_header_prod'>POINTS</div>
                    </div>
                    {leaderboard ? leaderboard.slice(page[0],page[1]).map(data => <Row rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place}/>) : ''}
                </div>
            </div>
        </div>

    )
}

export default LeaderboardTCSProd