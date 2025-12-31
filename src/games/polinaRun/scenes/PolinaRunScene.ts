import Phaser from 'phaser';

export class PolinaRunScene extends Phaser.Scene {
    private dino!: Phaser.Physics.Arcade.Sprite;
    private obstacles!: Phaser.Physics.Arcade.Group;
    private ground!: Phaser.Physics.Arcade.StaticGroup;
    private isGameOver = false;

    constructor() {
        super('PolinaRunScene');
    }

    preload() {
        this.load.image('dino', '/src/assets/images/polina.png');
        this.load.image('grinch', '/src/assets/images/grinch.png');
        this.load.image('ground', '/src/assets/images/ground.jpg');
    }

    create() {
        // Гравитация
        this.physics.world.gravity.y = 1000;

        // Земля
        this.ground = this.physics.add.staticGroup();
        this.ground.create(400, 580, 'ground').setScale(2).refreshBody();

        // Динозавр
        this.dino = this.physics.add.sprite(100, 500, 'dino');
        this.dino.setCollideWorldBounds(true);

        this.physics.add.collider(this.dino, this.ground);

        // Препятствия
        this.obstacles = this.physics.add.group();

        this.physics.add.collider(this.dino, this.obstacles, () =>
            this.gameOver(),
        );

        // Спавн препятствий
        this.time.addEvent({
            delay: 1500,
            loop: true,
            callback: this.spawnObstacle,
        });

        // Прыжок
        this.input.keyboard?.on('keydown-SPACE', this.jump, this);
        this.input.on('pointerdown', this.jump, this);
    }

    private jump() {
        if (this.isGameOver) return;

        // прыжок только если на земле
        if (this.dino.body?.blocked.down) {
            this.dino.setVelocityY(-500);
        }
    }

    private spawnObstacle() {
        if (this.isGameOver) return;

        const obstacle = this.obstacles.create(
            850,
            520,
            'grinch',
        ) as Phaser.Physics.Arcade.Sprite;

        obstacle.setVelocityX(-300);
        obstacle.setImmovable(true);
        obstacle.body.allowGravity = false;
    }

    private gameOver() {
        this.isGameOver = true;
        this.physics.pause();

        this.add
            .text(400, 300, 'GAME OVER', {
                fontSize: '48px',
                color: '#000',
            })
            .setOrigin(0.5);
    }
}
