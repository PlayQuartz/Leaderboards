import './style.css';
import React, {useState, useEffect} from "react"
import { useLocation } from 'react-router-dom';

function Row({rank, teamname, points, elims, avg_place, wins}) {
    return (
        <div className='row_container'>
            <div className='rank_container'>{rank < 100 ? rank < 10 ? '00'+rank : '0'+rank : rank}</div>
            <div className='name_container'>{teamname.toUpperCase()}</div>
            <div className='info_box'>{avg_place.toFixed(1)}</div>  
            <div className='info_box'>{elims}</div>  
            <div className='info_box'>{wins}</div>  
            <div className='info_box'>{points}</div>  
        </div>
    )
}

function Leaderboard() {

    const leaderboard_id = new URLSearchParams(useLocation().search).get('id');

    const [leaderboard, setLeaderboard] = useState(null)
    const [page, setPage] = useState([0, 21])

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
        setPage(page.map(num => num + 21))
    }

    function previousPage(){
        setPage(page.map(num => num - 21 ))
    }
    
    return (
        <div className='leaderboard_battez_vous'> 
            <div key={page.toString()} className='leaderboard_container'>
                <div className='leaderbaord_page'>
                    <div className='leaderboard_table table1'>
                        <div className='header_container'>
                            <div className='rank_header' onClick={previousPage} >TOP</div>
                            <div className='name_header'>JOUEUR</div>
                            <div style={{fontSize: '10px'}} className='info_header'>PLACE MOY.</div>
                            <div className='info_header'>ÉLIM.</div>
                            <div className='info_header'>WINS</div>
                            <div onClick={nextPage} className='info_header'>PTS</div>
                        </div>
                        {leaderboard ? leaderboard.slice(page[0],(page[1]-14)).map(data => <Row rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place}/>) : ''}
                    </div>
                    <div className='leaderboard_table table2'>
                        <div className='header_container'>
                            <div className='rank_header' onClick={previousPage} >TOP</div>
                            <div className='name_header'>JOUEUR</div>
                            <div style={{fontSize: '10px'}} className='info_header'>PLACE MOY.</div>
                            <div className='info_header'>ÉLIM.</div>
                            <div className='info_header'>WINS</div>
                            <div onClick={nextPage} className='info_header'>PTS</div>
                        </div>
                        {leaderboard ? leaderboard.slice(page[0]+7,page[1]-7).map(data => <Row rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place}/>) : ''}
                    </div>
                    <div className='leaderboard_table table3'>
                        <div className='header_container'>
                            <div className='rank_header' onClick={previousPage} >TOP</div>
                            <div className='name_header'>JOUEUR</div>
                            <div style={{fontSize: '10px'}} className='info_header'>PLACE MOY.</div>
                            <div className='info_header'>ÉLIM.</div>
                            <div className='info_header'>WINS</div>
                            <div onClick={nextPage} className='info_header'>PTS</div>
                        </div>
                        {leaderboard ? leaderboard.slice(page[0]+14,page[1]).map(data => <Row rank={data.place} teamname={data.teamname} points={data.points} elims={data.elims} wins={data.wins} avg_place={data.avg_place}/>) : ''}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Leaderboard