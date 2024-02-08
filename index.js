import p5 from 'https://cdn.skypack.dev/p5';

const sketch = (p) => {
    let myBall;

    p.setup = function() {
        p.createCanvas(600, 300);
        p.background(100);

        myBall = new Ball(p, p.width / 2, p.height / 2, 50);
    };

    p.draw = function() {
        p.background(100);
        p.fill(255, 0, 0);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
        myBall.display();
    };
};

new p5(sketch);

class Ball {
    constructor(p, x ,y, diameter) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.diameter = diameter;
    }

    display() {
        this.p.ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}