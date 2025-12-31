export class GameOverOverlay {
    private container: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, onRestart: () => void) {
        const {width, height} = scene.scale;

        // затемнение фона
        const bg = scene.add
            .rectangle(0, 0, width, height, 0x000000, 0.7)
            .setOrigin(0);

        // панель
        const panel = scene.add
            .rectangle(width / 2, height / 2, 300, 180, 0x222222, 1)
            .setStrokeStyle(2, 0xffffff);

        // текст
        const title = scene.add
            .text(width / 2, height / 2 - 50, 'Не получилось..', {
                fontSize: '28px',
                color: '#ffffff',
            })
            .setOrigin(0.5);

        // кнопка
        const button = scene.add
            .text(width / 2, height / 2 + 30, 'Повторить', {
                fontSize: '20px',
                color: '#ffffff',
                backgroundColor: '#444444',
                padding: {x: 16, y: 8},
            })
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true});

        button.on('pointerover', () =>
            button.setStyle({backgroundColor: '#666666'}),
        );
        button.on('pointerout', () =>
            button.setStyle({backgroundColor: '#444444'}),
        );
        button.on('pointerdown', () => {
            this.hide();
            onRestart();
        });

        this.container = scene.add.container(0, 0, [bg, panel, title, button]);

        this.container.setDepth(1000);
        this.container.setVisible(false);
    }

    show() {
        this.container.setVisible(true);
    }

    hide() {
        this.container.setVisible(false);
    }
}
