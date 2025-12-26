import './App.css';
import {LolaCatchGame} from './components/games/LolaCatchGame';
import {ShooterGame} from './components/games/ShooterGame';
import {Menu} from './components/Menu';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

export const App = () => (
    <div className="app-wrapper">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/game" element={<ShooterGame />} />
                <Route path="/lola-catch" element={<LolaCatchGame />} />
            </Routes>
        </BrowserRouter>
    </div>
);
