const field = [
  "ooo------Y--AND------",
  "-----EXY--A--N---D--E",
  "-X-----Y--A-N---D----",
  "------EXY----A---N---",
  "--DE--X---------YA---",
  "-----ND---EXY--AN--D-",
  "----E-----X-Y----A--N",
  "D-----E-XY---AN---D--",
  "E--------------------",
  "-------X---Y------A-N",
  "----D-EX----------YA-",
  "--N-DEX--Y-A--N-----D",
  "E------X--Y----------",
];

const moves = `R 12 D 2 R 2 U 1 R 2`;

solution(field, moves);


function solution(field, moves) {
  let snake = { length: 3, headX: 0, headY: 2 };

  const richField = field.map((str) => str.split(""));
  // .map((arr, x) => arr.map((value, y) => ({ x, y, value })));

  moves
    .match(/\w\s\d{1,2}/gi)
    .map((item) => item.split(" "))
    .map(([dir, count]) => ({ dir, count }))
    .forEach(({ dir, count }) => {
      for (let i = 0; i < count; i++) {
        const option = {
          R: { x: 0, y: +1 },
          L: { x: 0, y: -1 },
          U: { x: -1, y: 0 },
          D: { x: +1, y: 0 },
        };

        snake.headX += option[dir].x;
        snake.headY += option[dir].y;
        if ("YANDEX".includes(richField[snake.headX][snake.headY])) {
          snake.length += 1;
        }
      }
    });

  return [[snake.headX, snake.headY], snake.length];
}