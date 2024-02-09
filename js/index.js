import p5 from 'https://cdn.skypack.dev/p5';
import { Snake } from './snake.js';

let centerTargets = false;
let target = undefined;

const sketch = (p) => {
    let snakes = [];

    p.setup = function() {
        const myDiv = document.getElementById('myCanvas');
        var style = window.getComputedStyle(myDiv);
        var paddingTop = parseInt(style.getPropertyValue('padding-top'), 10);
        var paddingBottom = parseInt(style.getPropertyValue('padding-bottom'), 10);
        var paddingLeft = parseInt(style.getPropertyValue('padding-left'), 10);
        var paddingRight = parseInt(style.getPropertyValue('padding-right'), 10);
        var widthWithoutPadding = myDiv.clientWidth - paddingLeft - paddingRight;
        var heightWithoutPadding = myDiv.clientHeight - paddingTop - paddingBottom;
        let cnv = p.createCanvas(widthWithoutPadding, heightWithoutPadding);
        cnv.parent('myCanvas');

        for(let i = 0; i < 10; i++) {
            snakes.push(new Snake(p, 20, p.createVector(Math.random()*p.width, Math.random()*p.height)));
        }
    };

    p.draw = function() {
        p.background(70);
        if(centerTargets) {
            target = p.createVector(p.mouseX, p.mouseY);
        }
        for(let i = 0; i < snakes.length; i++) {
            snakes[i].update(target);
            snakes[i].show();

            if(p.dist(p.mouseX, p.mouseY, snakes[i].head.pos.x, snakes[i].head.pos.y) < 10) {
                p.fill(255);
                p.text(snakes[i].color, snakes[i].head.pos.x, snakes[i].head.pos.y);
            }
        }
    };
};
new p5(sketch);


document.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
        centerTargets = true;
    }
});
document.addEventListener('mouseup', function(event) {
    if (event.button === 0) {
        centerTargets = false;
        target = undefined;
    }
});