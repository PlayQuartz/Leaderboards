import './style.css';
import React, { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import BackgroundImage from './assets/background.png'
import rank_img from './assets/rank.png'
import name_img from './assets/name.png'
import points_img from './assets/points.png'

function Row({ rank, teamname, points, elims, avg_place, wins, index }) {
    return (
        <>
            <div className={rank <= 3 ? `rank top${rank}` : 'rank'} style={{ backgroundImage: `url(${rank_img})` }}>{rank}</div>
            <div className={index % 2 ? 'name-and-vr' : 'name-and-vr odd'} style={{ backgroundImage: `url(${name_img})` }}>
                <div className='name'>{teamname}</div>
            </div>
            <div className='info points' style={{ backgroundImage: `url(${points_img})` }}>{points}</div>
        </>
    )
}

function LeaderboardErazerCup() {

    const leaderboard_id = new URLSearchParams(useLocation().search).get('id');

    const [leaderboard, setLeaderboard] = useState(null)
    const [page, setPage] = useState(0)

    useEffect(() => {

        const fetch_data = () => {

            fetch("https://api.wls.gg/v5/leaderboards/" + leaderboard_id)
                .then(response => { return response.json() })
                .then(data => {
                    let leaderboard_list = []
                    for (let team in data.teams) {
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

    function nextPage() {
        if (page != 6) {
            setPage(page + 1)
        }

    }

    function previousPage() {
        if (page != 0) {
            setPage(page - 1)
        }

    }

    return (
        <div className='erazer_cup' style={{ backgroundImage: `url(${BackgroundImage})` }}>

            <div className='btn-container'>
                <div className='btn previous' onClick={previousPage}>Previous Page</div>
                <div className='btn next' onClick={nextPage}>Next Page</div>
            </div>


            <div className='leaderboard_container_prod'>
                <div className='leaderboard_table_prod'>

                    <div className='rank header' onClick={previousPage} >RANK</div>
                    <div className='name-and-vr header'>
                        <div className='name header'>PLAYER</div>
                    </div>
                    <div onClick={nextPage} className='info header'>POINTS</div>

                    {leaderboard ? leaderboard.slice(page * 10, (page + 1) * 10).map((data, index) => <Row index={index} rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place} />) : ''}
                </div>
                <div className='leaderboard_table_prod'>

                    <div className='rank header' onClick={previousPage} >RANK</div>
                    <div className='name-and-vr header'>
                        <div className='name header'>PLAYER</div>
                    </div>
                    <div onClick={nextPage} className='info header'>POINTS</div>

                    {leaderboard ? leaderboard.slice((page + 1) * 10, (page + 2) * 10).map((data, index) => <Row index={index} rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place} />) : ''}
                </div>
                <div className='leaderboard_table_prod'>

                    <div className='rank header' onClick={previousPage} >RANK</div>
                    <div className='name-and-vr header'>
                        <div className='name header'>PLAYER</div>
                    </div>
                    <div onClick={nextPage} className='info header'>POINTS</div>

                    {leaderboard ? leaderboard.slice((page + 2) * 10, (page + 3) * 10).map((data, index) => <Row index={index} rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place} />) : ''}
                </div>
                <div className='leaderboard_table_prod'>

                    <div className='rank header' onClick={previousPage} >RANK</div>
                    <div className='name-and-vr header'>
                        <div className='name header'>PLAYER</div>
                    </div>
                    <div onClick={nextPage} className='info header'>POINTS</div>

                    {leaderboard ? leaderboard.slice((page + 3) * 10, (page + 4) * 10).map((data, index) => <Row index={index} rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place} />) : ''}
                </div>
            </div>
        </div>

    )
}

export default LeaderboardErazerCup