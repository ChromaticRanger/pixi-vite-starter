import * as PIXI from 'pixi.js';
import sound from 'pixi-sound';

const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

(async () => {
    const app = new Application();
    await app.init({
        width: 640,
        height: 360,
        backgroundColor: 0x1099bb
    });

    document.body.appendChild(app.canvas);

    const rectangle = new Graphics();
    rectangle
        .roundRect(0, 0, 64, 64, 15)
        .fill(0xFFFFFF);

    rectangle.x = 100;
    rectangle.y = 100;

    app.stage.addChild(rectangle);

    let rectangleSpeed: number = 200;
    const bounceSound = sound.Sound.from('sounds/boing.mp3');
    app.ticker.add((ticker) => {
        const delta = ticker.deltaTime / 100;
        rectangle.x += rectangleSpeed * delta;

        if(rectangle.x > app.screen.width - rectangle.width) {
            rectangle.x = app.screen.width - rectangle.width;
            rectangleSpeed = -rectangleSpeed;
            bounceSound.play();
        } else if(rectangle.x < 0) {
            rectangle.x = 0;
            rectangleSpeed = -rectangleSpeed;
            bounceSound.play();
        }
    });
})();