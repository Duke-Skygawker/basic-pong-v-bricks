import Game from "./GameState";

const canvas = document.getElementById("gameScreen");

const ctx = canvas.getContext("2d");
// seems like we don't need that anymore, but I'll leave for reference
// ctx.clearRect(0, 0, 800, 600);

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let game = new Game(canvasWidth, canvasHeight);

let lastTime = 0;

// images

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  // clear canvas on update
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
