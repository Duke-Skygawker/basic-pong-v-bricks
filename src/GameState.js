import Paddle from "./Paddle";
import InputHandler from "./input";
import Ball from "./Ball";

import { buildLevel, level1, level2 } from "./Levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  GAMEWON: 5,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    this.levels = [level1, level2];
    this.currentLevel = 0;
    new InputHandler(this.paddle, this);
  }
  start() {
    if (this.gamestate !== GAMESTATE.MENU) return;
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.ball, this.paddle];
    this.gamestate = GAMESTATE.RUNNING;
  }
  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER ||
      this.gamestate === GAMESTATE.GAMEWON
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevel++;
      if (this.currentLevel >= this.levels.length) {
        this.gamestate = GAMESTATE.GAMEWON;
        return;
      }
      this.bricks = buildLevel(this, this.levels[this.currentLevel]);
      this.lives++;
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }
  displayStats(ctx, text, stat, pox, poy) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(text + stat, pox, poy);
  }
  screenMsg(ctx, opacity, text) {
    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = `rgba(0,0,0,${opacity})`;
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, this.gameWidth / 2, this.gameHeight / 2);
  }

  draw(ctx) {
    if (this.gamestate === GAMESTATE.GAMEWON) {
      this.screenMsg(
        ctx,
        1,
        "You've beat all the levels we have so far. Good Job."
      );
    }
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

    this.displayStats(ctx, "Lives: ", this.lives, 40, 30);
    this.displayStats(ctx, "Level: ", this.currentLevel + 1, 760, 30);

    if (this.gamestate === GAMESTATE.PAUSED) {
      this.screenMsg(ctx, 0.5, "Paused");
    }
    if (this.gamestate === GAMESTATE.MENU) {
      this.screenMsg(ctx, 1, "Press SPACEBAR to start");
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      this.screenMsg(ctx, 1, "GAME OVER");
    }
  }
  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
