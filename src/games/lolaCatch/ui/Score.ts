export class Score {
    private graphics: Phaser.GameObjects.Graphics;
    private score = 0;

    constructor(scene: Phaser.Scene) {
        this.graphics = scene.add.graphics();
    }

    add(points: number) {
        this.score += points;
    }

    getScore() {
        return this.score;
    }

    draw() {
        const x = 20;
        const y = 50;
        const fontSize = 24;
        const text = `Score: ${this.score}`;
        this.graphics.clear();

        const style = {
            fontSize: `${fontSize}px`,
            color: '#ffffff',
        };
        // this.graphics.fillStyle(0x000000, 0.5);
        // const textUi = this.graphics.scene.make
        //     .text({
        //         x: 0,
        //         y: 0,
        //         text: text,
        //         style: style,
        //     })
        this.graphics.scene.add.text(x, y, text, style);
    }
}
