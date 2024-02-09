import p5 from 'https://cdn.skypack.dev/p5';
import { Snake } from './snake.js';

const sketch = (p) => {
    let snake;

    p.setup = function() {
        p.createCanvas(400, 300);
        p.background(100);

        snake = new Snake(p, 10);
    };

    p.draw = function() {
        p.background(100);

        p.stroke(255);
        p.strokeWeight(1);
        p.fill(255, 0, 0);
        p.ellipse(p.mouseX, p.mouseY, 30, 30);

        p.stroke(0, 255, 0);
        p.strokeWeight(1);

        snake.update();
        snake.show();
    };
};
new p5(sketch);
