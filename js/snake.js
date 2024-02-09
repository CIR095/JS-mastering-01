import { Segment } from './segment.js';
import { SnakeHead } from './snakeHead.js';

const thresholdTarget = 0.99;

export class Snake {
    constructor(p, size, pos) {
        this.p = p;
        this.size = Math.max(1, size);
        this.pos = pos;

        this.maxStroke = 5;
        this.minStroke = 2;
        this.color = p.color(Math.random()*155+100, Math.random()*155+100,Math.random()*155+100);

        this.head;
        this.segments = [];
        this.target;
        this.velocity = 0.0;
        this.newTarget = true;
        this.initSnake();
    }

    initSnake() {
        this.head = new SnakeHead(this.p, this.pos);
        this.segments.push(new Segment(this.p, this.pos));
        for(let i = 1; i < this.size; i++) {
            this.segments.push(new Segment(this.p, this.segments[i-1]));
        }
    }

    update(target) {
        this.updateTarget(target);
        this.head.follow(this.target);
        this.segments[0].follow(this.head.pos);
        if(this.segments.length > 1) {
            for(let i = 1; i < this.segments.length; i++) {
                this.segments[i].follow();
            }
        }
    }

    updateTarget(target) {
        if(typeof(target) === 'undefined') {
            if(Math.random() > thresholdTarget || this.head.targetReached) {
                this.newTarget = true;
                this.head.targetReached = false;
            }
            if(this.newTarget) {
                let nx = Math.random() * this.p.width;
                let ny = Math.random() * this.p.height;
                this.target = this.p.createVector(nx, ny);
                this.newTarget = false;
            }
        }
        else {
            this.target = target;
        }
    }

    show() {
        this.p.stroke(this.color);
        for(let i = 0; i < this.segments.length; i++) {
            const n = this.maxStroke - (this.maxStroke - this.minStroke) / (this.segments.length) * i;
            this.p.strokeWeight(n);
            this.segments[i].show();
        }
        this.head.show();
        this.p.fill(255);
        this.p.strokeWeight(0);
        this.p.ellipse(this.target.x, this.target.y, 3, 3);
    }
}