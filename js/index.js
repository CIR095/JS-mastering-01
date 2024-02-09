import p5 from 'https://cdn.skypack.dev/p5';
import { Snake } from './snake.js';

let xoff = 0;
let yoff = 0;

const sketch = (p) => {
    let snake;

    p.setup = function() {
        p.createCanvas(400, 300);
        p.background(100);

        snake = new Snake(p, 10);
    };

    p.draw = function() {
        p.background(100);

        let nx = p.noise(xoff) * p.width;
        let ny = p.noise(yoff*4) * p.height;

        snake.update(p.createVector(nx, ny));
        snake.show();

        xoff += 0.01;
        yoff += 0.01;
    };
};
new p5(sketch);
