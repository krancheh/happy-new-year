// import {BootScene} from './scenes/BootScene';
// import {MenuScene} from './scenes/MenuScene';
import {ShooterScene} from './scenes/ShooterScene';
import Phaser from 'phaser';

export const shooterConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#0b1026',
    parent: 'shooter-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
            debug: false,
        },
    },
    scene: [ShooterScene],
};
