import p5 from 'https://cdn.skypack.dev/p5';
import { Segment } from './segment.js';

export class Snake {
    constructor(p, size, pos) {
        this.p = p;
        this.segments = [];
        this.size = Math.max(1, size);
        this.maxStroke = 4;
        this.minStroke = 1;
        this.xoff = Math.random() * 10;
        this.yoff = Math.random() * 10;
        this.target;
        if(typeof(pos) === 'undefined') {
            this.pos = p.createVector(p.width/2, p.height/2);
        }
        else {
            this.pos = pos;
        }
        this.initSnake();
    }

    initSnake() {
        this.segments.push(new Segment(this.p, this.pos));
        for(let i = 1; i < this.size; i++) {
            this.segments.push(new Segment(this.p, this.segments[i-1]));
        }
    }

    update() {
        let nx = this.p.noise(this.xoff) * this.p.width;
        let ny = this.p.noise(this.yoff*4) * this.p.height;
        this.target = this.p.createVector(nx, ny);
        
        this.segments[0].follow(this.target);
        if(this.segments.length > 1) {
            for(let i = 1; i < this.segments.length; i++) {
                this.segments[i].follow();
            }
        }

        this.xoff += 0.01;
        this.yoff += 0.01;
    }

    show() {
        this.p.stroke(255);
        for(let i = 0; i < this.segments.length; i++) {
            const n = this.maxStroke - (this.maxStroke - this.minStroke) / (this.segments.length) * i;
            this.p.strokeWeight(n);
            this.segments[i].show();
        }
        this.p.fill(255,0,0);
        this.p.ellipse(this.target.x, this.target.y, 5, 5);
    }
}