import Brick from "./Brick";

export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, index) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 80 * brickIndex,
          y: 75 + 24 * index,
        };
        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

export const level1 = [
  [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
export const level2 = [
  [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
];
