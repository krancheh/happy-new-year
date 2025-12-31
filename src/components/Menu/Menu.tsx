import './Menu.css';
import {getUsedUniqueNumbers, MAX_NUMBER} from '../../games/utils';
import {Gap} from '../Gap/Gap';
import {MenuItem} from './MenuItem';
import {Link} from 'react-router-dom';

export const Menu = () => {
    const catchedGifts = getUsedUniqueNumbers();
    const giftsCatched = catchedGifts.length;

    const isAllGiftsCatched = giftsCatched >= MAX_NUMBER;

    return (
        <div className="menu">
            <h1>Полина, с новым годом!</h1>
            <Gap size="medium" />
            <p>Играй, чтобы получать подарки!</p>
            <Gap size="medium" />
            <div className="alert">
                <p>
                    - Обязательно лови
                    <span className="menu-success"> лолочек🐈</span>, но избегай
                    <span className="menu-danger"> бомб💣</span>!
                </p>
                <p>
                    - На <span className="menu-success">SHIFT</span> можно
                    ускоряться
                </p>
                <p>- За каждую победу ты получаешь случайный подарок</p>
            </div>
            <Gap size="medium" />
            <h3>
                Собрано подарков: {giftsCatched} из {MAX_NUMBER}🎁
            </h3>
            <Gap size="small" />
            <div className="menu-items-list">
                <MenuItem text="01" success={catchedGifts.includes(1)} />
                <MenuItem text="02" success={catchedGifts.includes(2)} />
                <MenuItem text="03" success={catchedGifts.includes(3)} />
                <MenuItem text="04" success={catchedGifts.includes(4)} />
                <MenuItem text="05" success={catchedGifts.includes(5)} />
                <MenuItem text="06" success={catchedGifts.includes(6)} />
                <MenuItem text="07" success={catchedGifts.includes(7)} />
            </div>
            {isAllGiftsCatched ? (
                <h3>Ты собрала все подарки! 🎉🎉🎉</h3>
            ) : (
                <>
                    <Link className="menu-button" to="/lola-catch/1">
                        Играть
                    </Link>
                </>
            )}
            {/* <div className="menu-button"> */}

            {/* </div> */}
            {/* <Link to="/game">Shooter</Link> */}
        </div>
    );
};
