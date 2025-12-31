// import {BootScene} from './scenes/BootScene';
// import {MenuScene} from './scenes/MenuScene';
import {PolinaRunScene} from './scenes/PolinaRunScene';
import Phaser from 'phaser';

export const polinaRunConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 980,
    height: 700,
    // backgroundColor: '#32345b',
    transparent: true,
    parent: 'polina-run-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
            debug: false,
        },
    },
    scene: [PolinaRunScene],
    render: {
        pixelArt: true,
    },
};
