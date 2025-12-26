import Phaser from 'phaser';

export class LolaCatchScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private grass!: Phaser.GameObjects.TileSprite;
    private giftsBg!: Phaser.GameObjects.TileSprite;
    private xmasTreeBg!: Phaser.GameObjects.TileSprite;
    private energy = 100;
    private energyBar!: Phaser.GameObjects.Graphics;

    private drawEnergyBar() {
        const x = 20;
        const y = 20;
        const width = 200;
        const height = 20;

        const percent = Phaser.Math.Clamp(this.energy / 100, 0, 1);

        this.energyBar.clear();

        // фон
        this.energyBar.fillStyle(0x222222, 0.8);
        this.energyBar.fillRect(x, y, width, height);

        // энергия
        // #fff130ff
        this.energyBar.fillStyle(0xfff130, 1);
        this.energyBar.fillRect(x, y, width * percent, height);

        // рамка
        this.energyBar.lineStyle(2, 0xffffff, 1);
        this.energyBar.strokeRect(x, y, width, height);
    }

    constructor() {
        super('LolaCatch');
    }

    preload() {
        this.load.image('grass', 'src/assets/images/grass.png');
        this.load.image('gifts-bg', 'src/assets/images/gifts.png');
        this.load.image('xmas-tree-bg', 'src/assets/images/xmas_tree.png');
        this.load.spritesheet('polina', 'src/assets/images/polina.png', {
            frameWidth: 82,
            frameHeight: 132,
        });
    }

    create() {
        const grassHeight = 338;
        const grassScale = 0.45;

        this.grass = this.add
            .tileSprite(
                0,
                this.scale.height - grassHeight * grassScale + 30,
                this.scale.width * 2.45,
                grassHeight,
                'grass',
            )
            .setOrigin(0, 0);
        this.grass.setScale(grassScale);

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

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.player = this.physics.add.sprite(470, 545, 'polina');
        // this.player.setDisplaySize(40, 40);
        // this.player.setTint(0xff0000);
        this.player.setDepth(1);
        this.player.setCollideWorldBounds(true);

        this.energyBar = this.add.graphics();
    }

    update() {
        this.drawEnergyBar();
        this.player.setVelocity(0);

        const isMovingLeft = this.cursors.left?.isDown;
        const isMovingRight = this.cursors.right?.isDown;
        const hasEnergy = this.energy > 1;

        if (!this.cursors.shift?.isDown && this.energy < 100) {
            this.energy = this.energy + 0.05;
        }

        const getSprintVelocity = () => {
            if (this.cursors.shift?.isDown && hasEnergy) {
                this.energy = this.energy - 0.15;
                console.log(this.energy);

                return 1.5;
            }
            return 1;
        };

        const startRunAnimation = () => {
            if (!this.player.anims.isPlaying) {
                this.player.play('polina-run');
            }
        };

        const idleAnimation = () => {
            this.player.anims.stop();
            this.player.setFrame(0);
        };

        if (isMovingLeft && isMovingRight) {
            idleAnimation();
            return;
        }

        if (isMovingLeft || isMovingRight) {
            startRunAnimation();
            const velocity = (isMovingLeft ? -400 : 400) * getSprintVelocity();
            this.player.setVelocityX(velocity);
            this.player.setFlipX(isMovingLeft);
        } else {
            idleAnimation();
        }
    }
}
