// import './LolaCatchGame.css';
import {destroyGame, startGame} from '../../../games/polinaRun/Game';
// import {LolaCatchGameOverOverlay} from './overlays/LolaCatchGameOverOverlay';
// import {LolaCatchVictoryOverlay} from './overlays/LolaCatchVictoryOverlay/LolaCatchVictoryOverlay';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

export const PolinaRunGame: React.FC = () => {
    const {level} = useParams();

    useEffect(() => {
        startGame(Number(level));

        return () => {
            destroyGame();
        };
    }, [level]);

    return (
        <div className="game">
            <div className="lola-catch-wrapper">
                <div id="polina-run-game" />
                {/* <img className="bg-gif" src="/src/assets/images/bg.gif" /> */}
            </div>
            {/* <LolaCatchGameOverOverlay />
            <LolaCatchVictoryOverlay /> */}
        </div>
    );
};
