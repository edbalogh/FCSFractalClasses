import Leaf from './leaf.js';

export default class Branch {
    color = 'brown';
    endPos = {};
    tree = [];
    constructor(startPos, length, angle) {
      this.startPos = startPos;
      this.length = length;
      this.angle = angle;
      this.canGrow = true;
      this.calculateEndPosition();
      this.children = [];
      // console.log(`creating new branch at x: ${this.startPos.x}, y: ${this.startPos.y}, length: ${this.length}, angle: ${this.angle}`);
    }
  
    draw(ctx) {
      // this.calculateEndPosition();
      // console.log(`drawing [${this.startPos.x},${this.startPos.y}] to [${this.endPos.x},${this.endPos.y}] at distance ${this.length} an angle ${this.angle}`)
      ctx.beginPath();
    //   ctx.strokeStyle = this.color;
      ctx.moveTo(this.startPos.x, this.startPos.y);
      ctx.lineTo(this.endPos.x, this.endPos.y);
      ctx.stroke();
      ctx.closePath();
    }
  
    calculateEndPosition() {
      const radians = this.angle * Math.PI / 180;
      this.endPos.x = this.startPos.x + Math.floor(this.length * Math.cos(radians))
      this.endPos.y = this.startPos.y - Math.floor(this.length * Math.sin(radians))
      // console.log(`radians=${radians},x=${this.startPos.x}:${this.endPos.x},y=${this.startPos.y}:${this.endPos.y}`)
    }
  
    grow() {
      if (!this.canGrow) return [];
      let newGrowth = []
      if (this.length > 10) {
        newGrowth = newGrowth.concat(this.getRandomBranches(Math.floor(Math.random()*5)+1))
      } else {
        newGrowth.push(new Leaf(this.endPos));
      }
      this.canGrow = false;
      this.children = this.children.concat(newGrowth)
      return newGrowth;
    }
  
    getRandomBranches(number) {
      const results = []
      for (let i = 0; i < number; i++) {
        const angleAdjustment = Math.floor(Math.random() * 120) - 60;
        const lengthAdjustment = 0.67 + Math.random() / 10;
        // add width
        // add color
        // add ability to start in a random location on parent branch
        // console.log(`angleAdjustment: ${angleAdjustment},lengthAdjustment: ${lengthAdjustment}`)
        results.push(new Branch(this.endPos, this.length * lengthAdjustment, this.angle + angleAdjustment));
      }
      return results;
    }
}