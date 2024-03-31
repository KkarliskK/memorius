import css from '../style/Leaderboard.module.css';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/leaderboard') 
            .then(response => {
                // Sort the leaderboard data by high score in descending order
                const sortedLeaderboard = response.data.sort((a, b) => b.high_score - a.high_score);
                setLeaderboardData(sortedLeaderboard);
            })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
            });
    }, []);


    return (
        <>
            <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 `} src={wave1} />
            <div className={`relative w-full h-5/6 flex items-center justify-center flex-col ${css.mainScreen}`}> 
                <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
                <div className={`flex flex-col rounded justify-center items-center m-3 ${css.leaderboardContainer}`}>
                    <h1 className={`p-2 m-4 text-2xl font-semibold`}>All time leaderboard</h1>
                    <table className={`flex w-full flex-col`}>
                        <tr>
                            <th>Placement</th>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                        {leaderboardData.map((entry, index) => (
                            // cits stils prieks pirmajam 3 vietam
                            index < 3 ? (
                                <tr key={index} className={`flex p-3 ${index % 2 === 0 ? css.firstRow : css.secondRow} ${css.topThree}`}>
                                    <td className={`flex justify-center items-center ${css.placement}`}>{index + 1}.</td>
                                    <td>{entry.username}</td>
                                    <td>{entry.high_score}</td>
                                </tr>
                            ) : (
                                <tr key={index} className={`flex p-3 ${index % 2 === 0 ? css.firstRow : css.secondRow}`}>
                                    <td className={`flex justify-center items-center ${css.placement}`}>{index + 1}.</td>
                                    <td>{entry.username}</td>
                                    <td>{entry.high_score}</td>
                                </tr>
                            )
                        ))}
                    </table>
                </div>
            </div>
        </>
    );
}

export default Leaderboard;
