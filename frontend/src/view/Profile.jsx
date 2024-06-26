import css from '../style/Profile.module.css';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';
import pfp from '../assets/pfp.png';
import { Crown, Medal, Tag } from "@phosphor-icons/react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Line } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'


function Profile() {
    const { username } = useParams();
    const [userData, setUserData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [bestLevel, setBestLevel] = useState('');
    const [bestScore, setBestScore] = useState('');
    const [lastGames, setLastGames] = useState([]);
    const [isGraphicView, setIsGraphicView] = useState(false);
    const [averageTime, setAverageTime] = useState(0); 
    const [averageScore, setAverageScore] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`http://localhost:8000/api/user/${username}`)
            .then(response => {
                setUserData(response.data);
                console.log(response.data);
                // Set userId here too
                const userId = response.data.id;
                // Fetch stats and games using userId
                axios.get(`http://localhost:8000/api/stats/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    }
                })
                .then(response => {
                    setBestScore(response.data.highest_high_score);
                    setBestLevel(response.data.highest_level);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

                axios.get(`http://localhost:8000/api/games/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    }
                })
                .then(response => {
                    setLastGames(response.data);
                    const totalTime = response.data.reduce((total, game) => total + parseFloat(game.time), 0);
                    const totalScore = response.data.reduce((total, game) => total + parseFloat(game.score), 0);
                    setAverageTime(totalTime / response.data.length);
                    setAverageScore(totalScore / response.data.length);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false); // Set isLoading to false after the request
            });
    }, [username]);

    const toggleView = () => {
        setIsGraphicView(prevState => !prevState); // Toggle the state between true and false
    };
    

    const timeChartData = {
        labels: lastGames.map(game => game.level),
        datasets: [
            {
                label: 'Time to Complete a Level',
                data: lastGames.map(game => game.time),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            }
        ]
    };

    const scoreChartData = {
        labels: lastGames.map(game => game.level),
        datasets: [
            {
                label: 'Score',
                data: lastGames.map(game => game.score),
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
            }
        ]
    };

    if (isLoading){
        return <>
                   <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 z-10 `} src={wave1} />
                    <div className={`relative w-full h-5/6 flex items-center justify-center ${css.mainScreen}`}>
                        <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
                        <div className={`flex flex-col w-3/5 h-4/5 items-center justify-center rounded z-10 shadow-lg ${css.errorScreen}`}>
                            <h1 className={`font-bold text-5xl text-center pt-3 header-landing m-4 ${css.errorText}`}>Loading...</h1>
                        </div>
                    </div>
               </>
    }

    if (!userData.username) {
        return <>
                <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 z-10 `} src={wave1} />
                    <div className={`relative w-full h-5/6 flex items-center justify-center ${css.mainScreen}`}>
                        <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
                        <div className={`flex flex-col w-3/5 h-4/5 items-center justify-center rounded z-10 shadow-lg ${css.errorScreen}`}>
                            <h1 className={`font-bold text-5xl text-center pt-3 header-landing m-4 ${css.errorText}`}>Something went wrong ;(</h1>
                            <h1 className={`font-bold text-5xl text-center pt-3 header-landing m-4 ${css.errorText}`}>User not found!</h1>
                            <Link className={`p-3 m-3 ${css.returnButton}`} to={'/'}>Return to Landing page</Link>
                        </div>
                    </div>
                </>
    }
    return (
        <>
            <div className={`relative w-full flex items-center justify-center flex-col ${css.mainScreen}`}> 
                <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
                <div className={`flex w-7/12 flex-col m-4 p-3 rounded shadow-lg justify-center items-center z-10 ${css.profileContainer}`}>
                    <div className={`flex w-full p-3 justify-center items-center flex-col ${css.pfpContainer}`}>
                        <img src={userData.pfp} className={`${css.pfp}`} />
                        <h2 className={`text-3xl m-3`}>{userData.username}</h2>
                    </div>
                    <div className={`flex`}>
                        <div>Name: {userData.name}</div>
                    </div>
                    <div className={`flex`}>
                        <div>Bio: {userData.bio}</div>
                    </div>
                    <div className={`flex justify-center items-center w-full p-2 m-2`}><Tag size={30} /><h2 className={`text-xl`}>Tags: </h2>
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>Speedrunner</div>
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>Tryhard</div> {/**automate this later on */}
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>MVP</div>{/**add multiple designs later */}
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>Early Supporter</div>
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>Beast</div>
                    </div>  
                    <div className={`flex justify-evenly items-center w-10/12 m-3`}>
                        <div className={`flex flex-col items-center justify-center p-3 m-1 h-40 w-1/3 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>
                            <h2 className={`text-3xl m-2`}>Best Score</h2>
                            <h2 className={`flex justify-center items-center text-3xl w-full m-2`}><Crown size={36} />{bestScore}</h2>
                        </div>
                        <div className={`flex flex-col items-center justify-center p-3 m-1 h-40 w-1/3 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>
                            <h2 className={`text-3xl m-2`}>Best Level</h2>
                            <h2 className={`flex justify-center items-center text-3xl w-full m-2`}><Medal size={36} />{bestLevel}</h2>
                        </div>
                    </div>
                </div>
                <div className={`flex w-7/12 flex-col m-4 p-3 rounded shadow-lg justify-center items-center z-10 ${css.profileContainer}`}>
                    <div className={`${css.header}`}>
                        <h1 className={`text-3xl `}>Last Games</h1>
                    </div>
                    <div className={`${css.gamesInfo}`}>
                        {isGraphicView ? (
                            <div className={`${css.graphicView}`}>
                                <p>Average Time to Complete a Level: {averageTime} seconds.</p> <Line  data={timeChartData} /> 
                                <p>Average Score:  {averageScore}</p>  <Line data={scoreChartData} />
                                {/* Add more graphic stats as needed */}
                            </div>
                        ) : (
                            lastGames.map(game => (
                                <div key={game.id} className={`flex justify-center items-center w-full m-2 p-2 ${css.singleGame}`}>
                                    <p className={`text-lg m-2`}>Level: {game.level}</p>
                                    <p className={`text-lg m-2`}>Score: {game.score}</p>
                                    <p className={`text-lg m-2`}>Moves: {game.moves}</p>
                                    <p className={`text-lg m-2`}>Time: {game.time} seconds</p>
                                    {/* Render other game details */}
                                </div>
                            ))
                        )}
                    </div>
                    <button className={`p-2 m-2 cursor-pointer ${css.toggleButton}`} onClick={toggleView}>
                        {isGraphicView ? 'Switch to Text View' : 'Switch to Graphic View'}
                    </button>
                </div>
                <img className={`absolute w-4/5 bottom-0 left-0 h-1/6 z-0 `} src={wave1} />
            </div>
        </>
    );
}

export default Profile;