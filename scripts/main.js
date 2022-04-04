import Branch from './branch.js';

document.body.onload = initialize

function initialize() {
  const canvas = document.createElement('CANVAS');
  const ctx = canvas.getContext('2d');
  canvas.setAttribute('width', 800);
  canvas.setAttribute('height', 600);
  canvas.setAttribute('style', 'background-color: gray');
  document.body.appendChild(canvas);
  start(ctx)
}

let branches = [];
function start(ctx) {
  console.log('starting...')
  const startPos = { x: 400, y: 600 };
  branches.push(new Branch(startPos, 100, 90));
  let keepGoing = true;
  while (keepGoing) {
    const initLength = branches.length;
    console.log(`******** total branches: ${initLength} **********`)
    branches.forEach(b => {
      if (b.canGrow) {
        branches = branches.concat(b.grow());
      }
    });
    keepGoing = branches.length > initLength;
  }
  branches.forEach(b => {
    b.draw(ctx)
  });
}



