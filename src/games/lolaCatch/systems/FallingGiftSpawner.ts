import {FALLING_GIFT_SPRITES} from '../consts';
import Phaser from 'phaser';

export class FallingGiftSpawner {
    private scene: Phaser.Scene = Phaser.Scene.prototype;
    public fallingGifts: Phaser.Physics.Arcade.Group;
    private spawnTimer!: Phaser.Time.TimerEvent;
    private fallingGiftsVelocity = 300;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.fallingGifts = scene.physics.add.group();
    }

    start() {
        this.spawnTimer = this.scene.time.addEvent({
            delay: 2000,
            loop: true,
            callback: this.spawnFallingGift,
            callbackScope: this,
        });

        this.scene.time.addEvent({
            delay: 10000,
            loop: false,
            callback: this.speedUpSpawning,
            callbackScope: this,
        });
    }

    stop() {
        this.spawnTimer.remove(false);
        this.fallingGifts.clear(true, true);
    }

    private spawnFallingGift() {
        const x = Phaser.Math.Between(20, this.scene.scale.width - 20);
        const y = -20;
        const key = Phaser.Utils.Array.GetRandom(FALLING_GIFT_SPRITES);

        const fallingGift = this.fallingGifts.create(
            x,
            y,
            key,
        ) as Phaser.Physics.Arcade.Image;

        if (!fallingGift) return;

        fallingGift
            .setActive(true)
            .setScale(1.2)
            .setVisible(true)
            .setVelocityY(this.fallingGiftsVelocity)
            .setCollideWorldBounds(false);
    }

    private speedUpSpawning() {
        this.spawnTimer.timeScale *= 2;
        this.fallingGiftsVelocity *= 1.2;
    }

    update(getDamage: () => void) {
        this.fallingGifts.children.each((child) => {
            const gift = child as Phaser.Physics.Arcade.Image;

            if (gift.active && gift.y > this.scene.scale.height + 50) {
                gift.disableBody(true, true);

                if (gift.texture.key === 'falling_gift_3') {
                    getDamage();
                }
            }
            return null;
        });
    }
}
