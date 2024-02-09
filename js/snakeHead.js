import p5 from 'https://cdn.skypack.dev/p5';

const thresholdReachedTarget = 0.3;

export class SnakeHead {
    constructor(p, pos) {
        this.p = p;
        this.pos = pos;
        this.velocity = 0.5;
        this.target;
        this.targetReached = false;
    }

    follow(target) {
        this.target = target;
        const dir = p5.Vector.sub(this.target, this.pos);

        if(dir.mag() < thresholdReachedTarget) {
            this.targetReached = true;
        }

        dir.normalize();
        dir.x *= this.velocity;
        dir.y *= this.velocity;
        this.pos = p5.Vector.add(this.pos, dir);
        
    }

    show() {
        this.p.strokeWeight(1);
        this.p.fill(0);
        this.p.line(this.pos.x, this.pos.y, this.target.x, this.target.y);
        this.p.ellipse(this.pos.x, this.pos.y, 4, 4);
    }
}