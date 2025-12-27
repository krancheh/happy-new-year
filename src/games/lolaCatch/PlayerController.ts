import Phaser from 'phaser';

export class PlayerController {
    public player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private energy = 100;

    constructor(scene: Phaser.Scene) {
        this.cursors = scene.input.keyboard!.createCursorKeys();
        this.player = scene.physics.add.sprite(470, 545, 'polina');
        this.player.setDepth(1);
        this.player.setCollideWorldBounds(true);
    }

    getEnergy() {
        return this.energy;
    }

    changeEnergy(delta: number) {
        this.energy = Phaser.Math.Clamp(this.energy + delta, 0, 100);
    }

    update() {
        this.player.setVelocity(0);

        const isMovingLeft = this.cursors.left?.isDown;
        const isMovingRight = this.cursors.right?.isDown;
        const hasEnergy = this.energy > 1;

        if (!this.cursors.shift?.isDown && this.energy < 100) {
            this.changeEnergy(0.05);
        }

        const getSprintVelocity = () => {
            if (this.cursors.shift?.isDown && hasEnergy) {
                this.changeEnergy(-0.15);

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
