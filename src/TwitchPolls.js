import './App.css';
import React, {useState, useEffect} from "react"

function Option(text, percentage){
    return (
        <div className='choice'>
            <div className='option'>{text}</div>
            <div className='percentage'>{isNaN(percentage) ? 0 : percentage}%</div>
        </div>
    )
}

function TwitchPolls(){

    const [bearerToken, setBearerToken] = useState('vm40p83fxge7q1hsk2ryhpzinj4urh');
    const [refreshToken, setRefreshToken] = useState('je5uosxlr4i5uzkneb6n4sgibo8xff013xnovlm8elcnua8mmg')
    const [latestPoll, setLatestPoll] = useState(null)
    const [totalVotes, setTotalVotes] = useState(0)

    useEffect(() =>{

        function fetch_refreshToken(){

            return fetch('https://id.twitch.tv/oauth2/token', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'client_id': '7i09su5ewv0dxn00b7vzbt26c6k9ao',
                    'client_secret': 'fybsunr9t8n299wwqx2wgzy1rt051p',
                    'grant_type': 'refresh_token',
                    'refresh_token': refreshToken
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.access_token) {
                    setBearerToken(data.access_token);
                    return data.access_token;
                } else {
                    throw new Error('Failed to refresh token');
                }
            })
        }

        fetch_refreshToken()

        function fecth_polls(bearerToken){

            fetch('https://api.twitch.tv/helix/polls?broadcaster_id=28651505', {
                method: 'GET', 
                headers: {
                    'Authorization': `Bearer ${bearerToken}`, 
                    'Client-Id': '7i09su5ewv0dxn00b7vzbt26c6k9ao', 
                }
            })
            .then(response => {
                if(response.status === 401){
                    return fetch_refreshToken().then(token => {return fecth_polls(token)})
                }
                return response.json()
            })
            .then(data =>{
                console.log(bearerToken)
                if(data){
                
                    if(data.data){
                        setLatestPoll(data.data[0])
                        const totalVotes = data.data[0].choices.reduce((accumulator, currentChoice) => {
                            return accumulator + currentChoice.votes;
                        }, 0);
                        setTotalVotes(totalVotes)
                    }
                }
            })


        }

        const interval_id = setInterval(() => {fecth_polls(bearerToken)}, 1000)
        return () => clearInterval(interval_id)

    }, [])

    return (
        <div className='twitch_polls'>
            <div className='container'>
                <div className='question'>{latestPoll && latestPoll.title}</div>
                <div className='choices'>
                    {latestPoll && latestPoll.choices.map(choices => Option(choices.title, choices.votes/totalVotes*100) )}
                </div>
            </div>
        </div>
    )
}

export default TwitchPolls