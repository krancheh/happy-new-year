export class FallingBombSpawner {
    private scene: Phaser.Scene = Phaser.Scene.prototype;
    public fallingBombs: Phaser.Physics.Arcade.Group;
    private spawnTimer!: Phaser.Time.TimerEvent;
    private fallingBombsVelocity = 400;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.fallingBombs = scene.physics.add.group();
    }

    start() {
        this.spawnTimer = this.scene.time.addEvent({
            delay: 1500,
            loop: true,
            callback: this.spawnFallingBomb,
            callbackScope: this,
        });
        this.scene.time.addEvent({
            delay: 10000,
            loop: false,
            callback: this.speedUpSpawning,
            callbackScope: this,
        });
    }

    private spawnFallingBomb() {
        const x = Phaser.Math.Between(20, this.scene.scale.width - 20);
        const y = -20;
        const key = 'falling_bomb';

        const fallingBomb = this.fallingBombs.create(
            x,
            y,
            key,
        ) as Phaser.Physics.Arcade.Image;

        if (!fallingBomb) return;

        fallingBomb
            .setActive(true)
            .setScale(1.2)
            .setVisible(true)
            .setVelocityY(this.fallingBombsVelocity)
            .setCollideWorldBounds(false);
    }

    private speedUpSpawning() {
        this.spawnTimer.timeScale *= 2;
        this.fallingBombsVelocity *= 1.2;
    }

    stop() {
        this.spawnTimer.remove(false);
        this.fallingBombs.clear(true, true);
    }
}
