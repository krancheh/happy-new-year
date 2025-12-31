import Phaser from 'phaser';

export class EnergyBar {
    private graphics: Phaser.GameObjects.Graphics;
    private energy: number;

    constructor(scene: Phaser.Scene, initial = 100) {
        this.graphics = scene.add.graphics();
        this.energy = Phaser.Math.Clamp(initial, 0, 100);
    }

    setEnergy(value: number) {
        this.energy = Phaser.Math.Clamp(value, 0, 100);
    }

    getEnergy() {
        return this.energy;
    }

    changeEnergy(delta: number) {
        this.setEnergy(this.energy + delta);
    }

    draw() {
        const x = 20;
        const y = 120;
        const width = 200;
        const height = 20;

        const percent = Phaser.Math.Clamp(this.energy / 100, 0, 1);

        this.graphics.clear();

        // фон
        this.graphics.fillStyle(0x222222, 0.8);
        this.graphics.fillRect(x, y, width, height);

        // энергия
        this.graphics.fillStyle(0xfff130, 1);
        this.graphics.fillRect(x, y, width * percent, height);

        // рамка
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.graphics.strokeRect(x, y, width, height);
    }
}
