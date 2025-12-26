import './LolaCatchGame.css';
import {destroyGame, startGame} from '../../games/lolaCatch/Game';
import {useEffect} from 'react';

export function LolaCatchGame() {
    useEffect(() => {
        startGame();

        return () => {
            destroyGame();
        };
    }, []);

    return (
        <div className="lola-catch-wrapper">
            <div id="lola-catch-game" />
            <img className="bg-gif" src="/src/assets/images/bg.gif" />
        </div>
    );
}
