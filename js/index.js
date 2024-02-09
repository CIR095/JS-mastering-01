import p5 from 'https://cdn.skypack.dev/p5';
import { Snake } from './snake.js';

const sketch = (p) => {
    let snakes = [];

    p.setup = function() {
        p.createCanvas(400, 300);
        p.background(100);

        for(let i = 0; i < 4; i++) {
            snakes.push(new Snake(p, 10, p.createVector(Math.random()*p.width, Math.random()*p.height)));
        }
        console.log(snakes);
    };

    p.draw = function() {
        p.background(100);

        for(let i = 0; i < snakes.length; i++) {
            snakes[i].update();
            snakes[i].show();
        }
    };
};
new p5(sketch);
