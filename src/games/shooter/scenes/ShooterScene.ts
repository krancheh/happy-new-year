import Phaser from 'phaser';

export class ShooterScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('ShooterScene');
    }

    preload() {
        // this.load.image('bg', 'assets/images/grass.p');
    }

    create() {
        // this.add.image(400, 300, 'bg');
        this.cursors = this.input.keyboard!.createCursorKeys();

        this.player = this.physics.add.sprite(400, 500, '');
        this.player.setDisplaySize(40, 40);
        this.player.setTint(0xff0000);
        this.player.setCollideWorldBounds(true);
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left?.isDown) this.player.setVelocityX(-300);
        if (this.cursors.right?.isDown) this.player.setVelocityX(300);
    }
}
