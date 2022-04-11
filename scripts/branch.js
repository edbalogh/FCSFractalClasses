import Leaf from './leaf.js';

function getRandomNumberInRange(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min)) + min;
  // console.log(`results=${results},min=${min},max=${max}`)
}

export default class Branch {
    color = 'darkbrown';
    endPos = {};
    tree = [];
    constructor(startPos, length, angle, width) {
      this.startPos = startPos;
      this.length = length;
      this.angle = angle;
      this.width = width;
      this.canGrow = true;
      this.endPos = this.calculatePositionFromStart(this.length);
      this.children = [];
      // console.log(`creating new branch at x: ${this.startPos.x}, y: ${this.startPos.y}, length: ${this.length}, angle: ${this.angle}`);
    }
  
    draw(ctx) {
      // this.calculateEndPosition();
      // console.log(`drawing [${this.startPos.x},${this.startPos.y}] to [${this.endPos.x},${this.endPos.y}] at distance ${this.length} an angle ${this.angle}`)

      ctx.lineWidth = this.width;
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.startPos.x, this.startPos.y);
      ctx.lineTo(this.endPos.x, this.endPos.y);
      ctx.stroke();
      ctx.closePath();
    }
  
    calculatePositionFromStart(length) {
      const position = {x: 0, y: 0}
      const radians = this.angle * Math.PI / 180;
      position.x = this.startPos.x + Math.floor(length * Math.cos(radians))
      position.y = this.startPos.y - Math.floor(length * Math.sin(radians))
      // console.log(`radians=${radians},length=${length},x=${this.startPos.x}:${position.x},y=${this.startPos.y}:${position.y}`)
      return position
    }
  
    grow() {
      if (!this.canGrow) return [];
      let newGrowth = []
      if (this.length > 10) {
        newGrowth = newGrowth.concat(this.getRandomBranches(getRandomNumberInRange(1,Math.ceil(2 * this.length / 20))))
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
        const angleAdjustment = getRandomNumberInRange(-45, 45);
        const lengthAdjustment = getRandomNumberInRange(50, 80) / 100;
        const widthAdjustment = getRandomNumberInRange(50, 70) / 100;
        const branchStart = this.calculatePositionFromStart(this.length * (getRandomNumberInRange(30, 90) / 100))
        // add ability to start in a random location on parent branch
        // console.log(`angleAdjustment: ${angleAdjustment},lengthAdjustment: ${lengthAdjustment}`)
        results.push(new Branch(branchStart, this.length * lengthAdjustment, this.angle + angleAdjustment, this.width * widthAdjustment));
      }
      return results;
    }
}