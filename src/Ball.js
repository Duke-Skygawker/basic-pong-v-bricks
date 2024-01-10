import { detectCollision } from "./CollisionDetection";

export default class Ball {
  constructor(game) {
    // get ball
    this.img = document.getElementById("img-ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    // ball dimensions
    this.size = 16;

    this.reset();
  }

  reset() {
    this.position = { x: 10, y: 400 };
    this.speed = { x: 4, y: -2 };
  }
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    // wall left right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //  top of game
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    // bottom of game
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives -= 1;
      this.reset();
    }

    // check collision with paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
