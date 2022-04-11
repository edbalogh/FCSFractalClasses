export default class Leaf {
    canGrow = false;
    // todo: randomize shade of green and size
    
    constructor(startPos) {
      this.startPos = startPos;
      this.color = this.getRandomColor();
    }

    getRandomColor() {
      const greyScale = Math.floor(Math.random() * 64)
      const red = greyScale;
      const green = Math.floor(Math.random() * 128) + 64;
      const blue = greyScale;
      return "rgb(" + red + ", " + green + ", " + blue + ")";
    }
  
    grow() {}
  
    draw(ctx) {
      // console.log(`drawing leaf,x: ${this.startPos.x},y: ${this.startPos.y}`)
      ctx.fillStyle = this.color;
      ctx.fillRect(this.startPos.x, this.startPos.y, 5, 5);
    }
}
  