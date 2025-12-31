import {polinaRunConfig} from './config';
import Phaser from 'phaser';

let game: Phaser.Game | null = null;

export function startGame(level: number) {
    if (!game) {
        game = new Phaser.Game(polinaRunConfig);
        game.scene.start('PolinaRunScene', {level});
    }
}

export function destroyGame() {
    if (game) {
        game.destroy(true);
        game = null;
    }
}
