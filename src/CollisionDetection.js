export function detectCollision(ball, gameObject) {
  // ball coords
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;

  // object coords
  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}
