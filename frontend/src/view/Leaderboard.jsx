
import css from '../style/Leaderboard.module.css';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';

function Leaderboard() {
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
                        <tr className={`flex p-3 text-yellow-500 ${css.firstRow}`}>
                            <td className={`flex justify-center items-center ${css.placement}`}>1.</td>
                            <td>Griffin</td>
                            <td>1580</td>
                        </tr>
                        <tr className={`flex p-3 text-zinc-400 ${css.secondRow}`}>
                            <td className={`flex justify-center items-center ${css.placement}`}>2.</td>
                            <td>Griffin</td>
                            <td>1390</td>
                        </tr>
                        <tr className={`flex p-3 text-amber-700 ${css.firstRow}`}>
                            <td className={`flex justify-center items-center ${css.placement}`}>3.</td>
                            <td>Swanson</td>
                            <td>289</td>
                        </tr>
                        <tr className={`flex p-3 ${css.secondRow}`}>
                            <td className={`flex justify-center items-center ${css.placement}`}>4.</td>
                            <td>Brown</td>
                            <td>160</td>
                        </tr>
                        <tr className={`flex p-3 ${css.firstRow}`}>
                            <td className={`flex justify-center items-center ${css.placement}`}>5.</td>
                            <td>Red</td>
                            <td>158</td>
                        </tr>
                        <tr className={`flex p-3 ${css.secondRow}`}>
                            <td className={`flex justify-center items-center ${css.placement}`}>6.</td>
                            <td>Blue</td>
                            <td>70</td>
                        </tr>
                        <tr className={`flex p-3 ${css.firstRow}`}>
                            <td className={`flex justify-center items-center ${css.placement}`}>7.</td>
                            <td>Guest</td>
                            <td>16</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Leaderboard;