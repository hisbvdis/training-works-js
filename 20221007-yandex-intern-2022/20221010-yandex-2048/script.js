const field = [
  [0, 2, 4, 8],
  [0, 0, 0, 0],
  [0, 2, 2, 8],
  [0, 2, 2, 2],
];

const moves = "U U U";

const solution = (field, moves) => {
  for (let move of moves.split(" ")) {
    switch (move) {
      case "U": {
        for (let i = 0; i < field.length; i++) {
          for (let j = 0; j < field[i].length; j++) {
            if (i === 0) {
              continue;
            }
            const currentValue = field[i][j];
            const upValue = field[i - 1][j];
            if (upValue === currentValue) {
              field[i - 1][j] += field[i][j];
              field[i][j] = 0;
              continue;
            }
            if (upValue === 0) {
              field[i - 1][j] += field[i][j];
              field[i][j] = 0;
              continue;
            }
          }
        }
        break;
      }
      case "D": {
        for (let i = field.length - 1; i >= 0; i--) {
          for (let j = 0; j < field[i].length; j++) {
            if (i === field.length - 1) {
              continue;
            }
            const currentValue = field[i][j];
            const downValue = field[i + 1][j];
            if (downValue === currentValue) {
              field[i + 1][j] += field[i][j];
              field[i][j] = 0;
              continue;
            }
            if (downValue === 0) {
              field[i + 1][j] += field[i][j];
              field[i][j] = 0;
              continue;
            }
          }
        }
        break;
      }
      case "L": {
        for (let i = 0; i < field.length; i++) {
          for (let j = 0; j < field[i].length; j++) {
            if (j === 0) {
              continue;
            }
            const currentValue = field[i][j];
            const leftValue = field[i][j - 1];
            if (leftValue === currentValue) {
              field[i][j - 1] += field[i][j];
              field[i][j] = 0;
              continue;
            }
            if (leftValue === 0) {
              field[i][j - 1] += field[i][j];
              field[i][j] = 0;
              continue;
            }
          }
        }
        break;
      }
      case "R": {
        for (let i = 0; i < field.length; i++) {
          for (let j = field[i].length - 1; j >= 0; j--) {
            if (j === field[i].length - 1) {
              continue;
            }
            const currentValue = field[i][j];
            const rightValue = field[i][j + 1];
            if (rightValue === currentValue) {
              field[i][j + 1] += field[i][j];
              field[i][j] = 0;
              continue;
            }
            if (rightValue === 0) {
              field[i][j + 1] += field[i][j];
              field[i][j] = 0;
              continue;
            }
          }
        }
        break;
      }
    }
  }

  return field;
};

console.log(solution(field, moves));
