import {} from '../../../../../games/lolaCatch/Game';
import {lolaCatchGameEvents} from '../../../../../games/lolaCatch/systems/LolaCatchGameEvents';
import {Gap} from '../../../../Gap/Gap';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

export function LolaCatchGameOverOverlay() {
    const [visible, setVisible] = useState(false);
    const [score, setScore] = useState(0);
    const [targetScore, setTargetScore] = useState(0);
    const [scene, setScene] = useState<Phaser.Scene | null>(null);

    useEffect(() => {
        lolaCatchGameEvents.on(
            'lola-catch-game-over',
            ({scene, score, targetScore}) => {
                setScore(score);
                setTargetScore(targetScore);
                setScene(scene);
                setVisible(true);
            },
        );

        return () => {
            lolaCatchGameEvents.off('lola-catch-game-over');
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="overlay">
            <div className="overlay-inner">
                <img
                    className="overlay-image"
                    src="/src/assets/images/game_over_kitty_2.png"
                    alt="Lola Catch Game Over"
                />
                <h2>{'Не получилось..'}</h2>
                <Gap size="medium" />
                <p>
                    Поймано:{' '}
                    <span className="tag-success">
                        {score} / {targetScore}
                    </span>
                </p>
                <Gap size="medium" />
                <button
                    className="menu-button-retry"
                    onClick={() => {
                        setVisible(false);
                        scene?.scene.restart();
                    }}
                >
                    Повторить
                </button>
                <Gap size="medium" />
                <Link to={'/'}>В меню</Link>
            </div>
        </div>
    );
}
