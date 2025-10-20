import './style.css';
import React, { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import BackgroundImage from './assets/background_popup.png'
import rank_img from './assets/rank_popup.png'
import points_img from './assets/points_popup.png'

function Row({ rank, teamname, points, elims, avg_place, wins, index, alive }) {
    return (
        <>
            <div className='rank' style={{ backgroundImage: `url(${rank_img})`, opacity: alive ? "1": "0.5" }}>{rank}</div>
            <div className='name-and-vr' style={{ backgroundImage: `url(${points_img})`, opacity: alive ? "1": "0.5" }}>
                <div className='name'>{teamname}</div>
                <div className='info points'>{points}</div>
            </div>

        </>
    )
}

function PopUpLeaderboard() {

    const leaderboard_id = new URLSearchParams(useLocation().search).get('id');

    const [leaderboard, setLeaderboard] = useState(null)
    const [page, setPage] = useState(0)

    useEffect(() => {

        const fetch_data = () => {

            const queries = { queries: [{ range: { from: 0, to: 50000 }, flags: 1 }], flags: 1 };
            fetch(`https://api.wls.gg/v5/leaderboards/${leaderboard_id}/v7/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(queries),
            })
                .then((response) => response.json())
                .then(data => {
                    let leaderboard_list = []
                    for (let team of data.queries[0].entries) {
                        leaderboard_list.push({
                            teamname: Object.values(team.members).map(member => member.name).sort().join(' - '),
                            elims: team.stats[107],
                            avg_place: team.stats[102],
                            wins: team.stats[104],
                            place: team.rank,
                            points: team.stats[1],
                            alive: (team.flags & 2) === 2
                        })
                    }
                    setLeaderboard(leaderboard_list)
                }

                )
        }


        fetch_data()
        const interval = setInterval(fetch_data, 10000)
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
        <div className='popup_erazer_cup'>

            <div className='leaderboard_container_prod'>
                <div className='leaderboard_table_prod' style={{ backgroundImage: `url(${BackgroundImage})` }}>

                    {leaderboard ? leaderboard.slice(page * 10, (page + 1) * 10).map((data, index) => <Row index={index} rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place} alive={data.alive} />) : ''}
                </div>
            </div>
        </div>

    )
}

export default PopUpLeaderboard