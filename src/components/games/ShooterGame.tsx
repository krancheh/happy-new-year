import {destroyGame, startGame} from '../../games/shooter/Game';
import {useEffect} from 'react';

export function ShooterGame() {
    useEffect(() => {
        startGame();

        return () => {
            destroyGame();
        };
    }, []);

    return <div id="shooter-game" />;
}
