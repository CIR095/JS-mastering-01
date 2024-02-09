import p5 from 'https://cdn.skypack.dev/p5';

export class Segment {
    constructor(p, parent) {
        this.p = p;
        this.parent;

        this.angle = 0;
        this.len = 20;

        if(parent instanceof Segment) {
            this.parent = parent;
        }
        this.target = this.setTarget();

        this.head = p.createVector(this.target.x, this.target.y);
        this.end = p.createVector(this.target.x - this.len * Math.cos(this.angle), this.target.y - this.len * Math.sin(this.angle));
    }

    setTarget() {
        if(this.parent instanceof Segment) {
            return this.p.createVector(this.parent.end.x, this.parent.end.y);
        }
        else {
            return this.p.createVector(this.p.mouseX, this.p.mouseY);
        }
    }

    follow() {
        this.target = this.setTarget();

        const dir = p5.Vector.sub(this.target, this.end);
        dir.setMag(this.len);
        dir.mult(-1);
        this.end = p5.Vector.add(this.target, dir);

        this.angle = dir.heading();

        this.head.set(this.target.x, this.target.y);
    }

    show() {
        this.p.line(this.end.x, this.end.y, this.head.x, this.head.y);
        this.p.ellipse(this.end.x, this.end.y, 5, 5);
    }
}