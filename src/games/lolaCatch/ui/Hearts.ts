export class Hearts {
    private hearts: Phaser.GameObjects.Image[] = [];
    private currentHp: number;
    private maxHp: number;
    private scene: Phaser.Scene = Phaser.Scene.prototype;
    private x: number = 20;
    private y: number = 20;

    constructor(scene: Phaser.Scene, maxHp: number) {
        this.scene = scene;
        this.maxHp = maxHp;
        this.currentHp = maxHp;
        this.createHearts();
    }

    private createHearts() {
        for (let i = 0; i < this.maxHp; i++) {
            const heart = this.scene.add.image(
                this.x + i * 50,
                this.y,
                'heart',
            );

            heart.setOrigin(0, 0);
            heart.setScrollFactor(0);
            heart.setScale(0.25);

            this.hearts.push(heart);
        }

        this.update(this.currentHp);
    }

    update(hp: number) {
        this.currentHp = Phaser.Math.Clamp(hp, 0, this.maxHp);

        this.hearts.forEach((heart, index) => {
            heart.setVisible(index < this.currentHp);
        });
    }

    lose(amount: number = 1) {
        this.update(this.currentHp - amount);
    }

    gain(amount: number = 1) {
        this.update(this.currentHp + amount);
    }

    get hp() {
        return this.currentHp;
    }
}
