// import {BootScene} from './scenes/BootScene';
// import {MenuScene} from './scenes/MenuScene';
import {LolaCatchScene} from './scenes/LolaCatchScene';
import Phaser from 'phaser';

export const lolaCatchConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 980,
    height: 700,
    // backgroundColor: '#32345b',
    transparent: true,
    parent: 'lola-catch-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
            debug: false,
        },
    },
    scene: [LolaCatchScene],
    render: {
        pixelArt: true,
    },
};
