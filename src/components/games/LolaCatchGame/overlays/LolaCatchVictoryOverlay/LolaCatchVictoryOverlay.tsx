import {} from '../../../../../games/lolaCatch/Game';
import {lolaCatchGameEvents} from '../../../../../games/lolaCatch/systems/LolaCatchGameEvents';
import {getRandomUniqueNumber} from '../../../../../games/utils';
import {Gap} from '../../../../Gap/Gap';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

export function LolaCatchVictoryOverlay() {
    const [visible, setVisible] = useState(false);
    const [score, setScore] = useState(0);
    // const [scene, setScene] = useState<Phaser.Scene | null>(null);
    const [giftNumber, setGiftNumber] = useState<number | null>(null);

    useEffect(() => {
        lolaCatchGameEvents.on('lola-catch-victory', ({score}) => {
            setScore(score);
            setGiftNumber(getRandomUniqueNumber());
            // setScene(scene);
            setVisible(true);
        });

        return () => {
            lolaCatchGameEvents.off('lola-catch-victory');
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="overlay">
            <div className="overlay-inner">
                <img
                    className="overlay-image"
                    src="/src/assets/images/victory_lamb.png"
                    alt="Lola Catch Game Victory"
                />
                <h2>Поздравляю!</h2>
                <Gap size="medium" />
                <p>Поймано: {score}</p>
                <Gap size="small" />
                <p className="alert">
                    Скорее открывай подарок{' '}
                    <span className="tag-success">№ {giftNumber}</span>!
                </p>
                <Gap size="medium" />
                <Link className="menu-button" to={'/'}>
                    В меню
                </Link>
            </div>
        </div>
    );
}
