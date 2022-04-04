export default class Leaf {
    canGrow = false;
    // todo: randomize shade of green and size
    
    constructor(startPos) {
      this.startPos = startPos;
    }
  
    grow() {}
  
    draw(ctx) {
      // console.log(`drawing leaf,x: ${this.startPos.x},y: ${this.startPos.y}`)
      ctx.fillStyle = 'green';
      ctx.fillRect(this.startPos.x, this.startPos.y, 5, 5);
    }
}
  