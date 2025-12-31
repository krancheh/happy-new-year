import './App.css';
import {LolaCatchGame} from './components/games/LolaCatchGame';
import {PolinaRunGame} from './components/games/PolinaRunGame/PolinaRunGame';
import {ShooterGame} from './components/games/ShooterGame';
import {Menu} from './components/Menu';
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';

export const App = () => (
    <div className="app-wrapper">
        <HashRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/game" element={<ShooterGame />} />
                <Route path="/lola-catch/:level" element={<LolaCatchGame />} />
                <Route path="/polina-run/:level" element={<PolinaRunGame />} />
            </Routes>
        </HashRouter>
    </div>
);
