import * as PIXI from 'pixi.js';
import { Sound } from '@pixi/sound';
import {Text} from 'pixi.js';

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
    const bounceSound = await Sound.from('sounds/boing.mp3');

    let bounceCount = 0;

    const bounceCountText = new Text({
        text: `${ bounceCount }`, 
        style: {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xff1010,
            align: 'left',
        }
    });
    bounceCountText.x = 10;
    bounceCountText.y = 10;
    app.stage.addChild( bounceCountText );

    app.ticker.add((ticker) => {
        const delta = ticker.deltaTime / 100;
        rectangle.x += rectangleSpeed * delta;

        if( rectangle.x > app.screen.width - rectangle.width ) {
            rectangle.x = app.screen.width - rectangle.width;
            rectangleSpeed = -rectangleSpeed;
            bounceSound.play();
            bounceCount++;
            bounceCountText.text = `${ bounceCount }`;
        } else if( rectangle.x < 0 ) {
            rectangle.x = 0;
            rectangleSpeed = -rectangleSpeed;
            bounceSound.play();
            bounceCount++;
            bounceCountText.text = `${ bounceCount }`;
        }
    });
})();