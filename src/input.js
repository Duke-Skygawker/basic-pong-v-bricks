class InputHandler {
  constructor(paddle, game) {
    const ArrowLeft = "ArrowLeft";
    const ArrowRight = "ArrowRight";
    const A = "a";
    const D = "d";
    const Spacebar = " ";
    const Escape = "Escape";
    document.addEventListener("keydown", (e) => {
      // alert(e.key);

      switch (e.key) {
        case ArrowLeft:
        case A:
        case "A":
          paddle.moveLeft();
          break;

        case ArrowRight:
        case D:
        case "D":
          paddle.moveRight();
          break;

        case Escape:
          game.togglePause();
          break;
        case Spacebar:
          game.start();
      }
    });
    document.addEventListener("keyup", (e) => {
      // alert(e.key);

      switch (e.key) {
        case ArrowLeft:
        case A:
        case "A":
          if (paddle.speed < 0) paddle.stop();
          break;

        case ArrowRight:
        case D:
        case "D":
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    });
  }
}

export default InputHandler;
