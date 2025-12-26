import {shooterConfig} from './config';
import Phaser from 'phaser';

let game: Phaser.Game | null = null;

export function startGame() {
    if (!game) {
        game = new Phaser.Game(shooterConfig);
    }
}

export function destroyGame() {
    if (game) {
        game.destroy(true);
        game = null;
    }
}
