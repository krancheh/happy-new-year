import {PlayerController} from '../PlayerController';
import {FallingGiftSpawner} from '../systems/FallingGiftSpawner';
import {lolaCatchGameEvents} from '../systems/LolaCatchGameEvents';
import {EnergyBar} from '../ui/EnergyBar';
import {Hearts} from '../ui/Hearts';
import {Score} from '../ui/Score';
import {FallingBombSpawner} from './../systems/FallingBombSpawner';
import Phaser from 'phaser';

const base = import.meta.env.BASE_URL;

export class LolaCatchScene extends Phaser.Scene {
    private targetScore!: number;
    // private level!: number;

    private playerController!: PlayerController;

    private ground!: Phaser.GameObjects.TileSprite;
    private giftsBg!: Phaser.GameObjects.TileSprite;
    private xmasTreeBg!: Phaser.GameObjects.TileSprite;

    private hearts!: Hearts;
    private score!: Score;
    private energyBar!: EnergyBar;
    private fallingGiftSpawner!: FallingGiftSpawner;
    private fallingBombSpawner!: FallingBombSpawner;

    /** Обработчик поимки подарка. */
    private catchFallingGift: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback =
        (_player, fallingGift) => {
            this.sound.play('catch_gift');
            const gift = fallingGift as Phaser.Physics.Arcade.Image;
            this.score.add(1);

            if (this.score.current >= this.targetScore) {
                // this.fallingGiftSpawner.stop();
                this.fallingBombSpawner.stop();
                this.physics.pause();

                // Emit victory event
                lolaCatchGameEvents.emit('lola-catch-victory', {
                    scene: this,
                    score: this.score.current,
                });
            }
            gift.disableBody(true, true);
        };

    private catchFallingBomb: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback =
        (_player, fallingBomb) => {
            const bomb = fallingBomb as Phaser.Physics.Arcade.Image;
            bomb.disableBody(true, true);
            this.getDamage();
        };

    private getDamage = () => {
        this.hearts.lose(1);
        this.sound.play('get_damage');

        if (this.hearts.hp <= 0) {
            this.fallingGiftSpawner.stop();
            this.fallingBombSpawner.stop();
            this.physics.pause();

            // Emit game over event
            lolaCatchGameEvents.emit('lola-catch-game-over', {
                scene: this,
                score: this.score.current,
                targetScore: this.targetScore,
            });
        }
    };

    constructor() {
        super('LolaCatch');
    }

    init(data: {level: number}) {
        this.targetScore = data.level * 25;
    }

    preload() {
        // Ассеты картинок
        this.load.image('ground', `${base}assets/images/ground.jpg`);
        this.load.image('gifts-bg', `${base}assets/images/gifts.png`);
        this.load.image('xmas-tree-bg', `${base}assets/images/xmas_tree.png`);
        this.load.spritesheet('polina', `${base}assets/images/polina.png`, {
            frameWidth: 82,
            frameHeight: 132,
        });
        this.load.image('heart', `${base}assets/images/heart.png`);
        // Load falling gift images
        for (let i = 1; i <= 6; i++) {
            this.load.image(
                `falling_gift_${i}`,
                `${base}assets/images/falling_gift_${i}.png`,
            );
        }
        this.load.image(
            'falling_bomb',
            `${base}assets/images/falling_bomb.png`,
        );

        // Ассеты звуков
        this.load.audio('catch_gift', `${base}assets/sounds/catch.wav`);
        this.load.audio('get_damage', `${base}assets/sounds/roblox_oof.mp3`);
    }

    create() {
        this.sound.setVolume(0.1);
        const groundHeight = 586;
        const groundScale = 0.25;

        this.ground = this.add
            .tileSprite(
                0,
                this.scale.height - groundHeight * groundScale + 50,
                this.scale.width * 4,
                groundHeight,
                'ground',
            )
            .setOrigin(0, 0);
        this.ground.setScale(groundScale);

        this.giftsBg = this.add.tileSprite(
            this.scale.width - 230,
            this.scale.height - 135,
            64,
            64,
            'gifts-bg',
        );
        this.giftsBg.setScale(2);

        this.xmasTreeBg = this.add.tileSprite(
            this.scale.width - 115,
            this.scale.height - 267,
            64,
            128,
            'xmas-tree-bg',
        );
        this.xmasTreeBg.setScale(3.2);

        this.anims.create({
            key: 'polina-run',
            frames: this.anims.generateFrameNumbers('polina', {
                start: 2,
                end: 5,
            }),
            frameRate: 8,
            repeat: -1,
        });

        // Player and input now handled by PlayerController
        this.playerController = new PlayerController(this);

        // Energy bar is now a dedicated object
        this.energyBar = new EnergyBar(this, this.playerController.getEnergy());

        // Falling gifts handled by a spawner
        this.fallingGiftSpawner = new FallingGiftSpawner(this);
        this.fallingGiftSpawner.start();

        // Falling bombs handled by a spawner
        this.fallingBombSpawner = new FallingBombSpawner(this);
        this.fallingBombSpawner.start();

        // Коллизия с игроком
        this.physics.add.overlap(
            this.playerController.player,
            this.fallingGiftSpawner.fallingGifts,
            this.catchFallingGift,
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.playerController.player,
            this.fallingBombSpawner.fallingBombs,
            this.catchFallingBomb,
            undefined,
            this,
        );

        this.score = new Score(this, this.targetScore);

        // Ensure font is loaded before displaying score
        document.fonts.load('24px joystix').then(() => {
            this.score.reset();
        });

        this.hearts = new Hearts(this, 5);
    }

    update() {
        // Sync energy and render
        this.energyBar.setEnergy(this.playerController.getEnergy());
        this.energyBar.draw();

        // player input/movement
        this.playerController.update();

        // falling gifts lifecycle
        this.fallingGiftSpawner.update(this.getDamage);
    }
}
