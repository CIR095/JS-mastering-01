import p5 from 'https://cdn.skypack.dev/p5';

const sketch = (p) => {
  p.setup = function() {
    p.createCanvas(600, 600);
    p.background(100);
  };

  p.draw = function() {
    p.background(100);
    p.fill(255, 0, 0);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };
};

new p5(sketch);
