import p5 from 'https://cdn.skypack.dev/p5';
import { Segment } from './segment.js';

export class Snake {
    constructor(p, size, pos) {
        this.p = p;
        this.segments = [];
        this.size = Math.max(1, size);
        this.maxStroke = 4;
        this.minStroke = 1;
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

    update(target) {
        this.segments[0].follow(target);
        if(this.segments.length > 1) {
            for(let i = 1; i < this.segments.length; i++) {
                this.segments[i].follow();
            }
        }
    }

    show() {
        this.p.stroke(255);
        for(let i = 0; i < this.segments.length; i++) {
            const n = this.maxStroke - (this.maxStroke - this.minStroke) / (this.segments.length) * i;
            this.p.strokeWeight(n);
            this.segments[i].show();
        }
    }
}