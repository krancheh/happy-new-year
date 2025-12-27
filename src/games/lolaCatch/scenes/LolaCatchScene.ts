import {PlayerController} from '../PlayerController';
import {FallingGiftSpawner} from '../systems/FallingGiftSpawner';
import {EnergyBar} from '../ui/EnergyBar';
import {Score} from '../ui/Score';
import Phaser from 'phaser';

export class LolaCatchScene extends Phaser.Scene {
    private playerController!: PlayerController;

    private ground!: Phaser.GameObjects.TileSprite;
    private giftsBg!: Phaser.GameObjects.TileSprite;
    private xmasTreeBg!: Phaser.GameObjects.TileSprite;

    private energyBar!: EnergyBar;
    private score!: Score;
    private fallingGiftSpawner!: FallingGiftSpawner;

    /** Обработчик поимки подарка. */
    private catchFallingGift: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback =
        (_player, fallingGift) => {
            const gift = fallingGift as Phaser.Physics.Arcade.Image;
            this.score.add(1);

            gift.disableBody(true, true);
        };

    constructor() {
        super('LolaCatch');
    }

    preload() {
        this.load.image('ground', 'src/assets/images/ground.jpg');
        this.load.image('gifts-bg', 'src/assets/images/gifts.png');
        this.load.image('xmas-tree-bg', 'src/assets/images/xmas_tree.png');
        this.load.spritesheet('polina', 'src/assets/images/polina.png', {
            frameWidth: 82,
            frameHeight: 132,
        });
        // this.load.image('gifts', 'src/assets/images/gifts.png');
        for (let i = 1; i <= 6; i++) {
            this.load.image(
                `falling_gift_${i}`,
                `src/assets/images/falling_gift_${i}.png`,
            );
        }
    }

    create() {
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

        // Коллизия с игроком
        this.physics.add.overlap(
            this.playerController.player,
            this.fallingGiftSpawner.fallingGifts,
            this.catchFallingGift,
            undefined,
            this,
        );

        this.score = new Score(this);
    }

    update() {
        // Sync energy and render
        this.energyBar.setEnergy(this.playerController.getEnergy());
        this.energyBar.draw();

        // Draw score
        this.score.draw();

        // player input/movement
        this.playerController.update();

        // falling gifts lifecycle
        this.fallingGiftSpawner.update();
    }
}
