import mitt from 'mitt';

/**
 * События игры Lola Catch.
 */
export const lolaCatchGameEvents = mitt<{
    'lola-catch-game-over': {
        scene: Phaser.Scene;
        score: number;
        targetScore: number;
    };
    'lola-catch-victory': {scene: Phaser.Scene; score: number};
}>();
