export class Score {
    private value = 0;
    private text: Phaser.GameObjects.Text;
    private fontSize = 24;
    private scoreToWin: number;

    constructor(scene: Phaser.Scene, scoreToWin: number) {
        this.scoreToWin = scoreToWin;
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontSize: `${this.fontSize}px`,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            fontFamily: 'joystix',
        };

        this.text = scene.add.text(20, 80, 'Тут очки', style);
    }

    add(points: number = 1) {
        this.value += points;
        this.updateText();
    }

    reset() {
        this.value = 0;
        this.updateText();
    }

    get current() {
        return this.value;
    }

    private updateText() {
        this.text.setText(`Поймано: ${this.value} / ${this.scoreToWin}`);
    }
}
