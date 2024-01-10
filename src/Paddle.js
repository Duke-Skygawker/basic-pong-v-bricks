class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    // paddle dimensions
    this.width = 150;
    this.height = 20;

    // paddle movements
    this.maxSpeed = 7;
    this.speed = 0;

    // paddle spawn point
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#00f";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }
  stop() {
    this.speed = 0;
  }
  update(deltaTime) {
    // handle movement
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x > this.gameWidth - this.width)
      this.position.x = this.gameWidth - this.width;
  }
}

export default Paddle;
