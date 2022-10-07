let canvasBox = document.getElementById('canvas');
let ctx = canvasBox.getContext('2d');

// Canvas - Ось X
ctx.beginPath();
ctx.strokeStyle = "#80B0DD";
ctx.lineWidth = "2";
ctx.moveTo(0, 200);
ctx.lineTo(700, 200);
ctx.stroke();
ctx.closePath();

const N = 5;

// TODO

// ===========================================================================
// 1. Задати синусоїду та косинусоїду на проміжку `[0..2π]`:
// ===========================================================================
// СИНУСОИДА и КОСИНУСОИДА
const PI2 = Math.PI * 2;
const sinArray = [];
const cosArray = [];
let x = 0;

while (x < PI2) {
  const ySin = Math.round( Math.sin(x) * 100 ) / 100;
  const yCos = Math.round( Math.cos(x) * 100 ) / 100;
  
  sinArray.push({x, y: ySin});
  cosArray.push({x, y: yCos});

  x = Math.round((x + 0.01) * 100) / 100;
}

// Canvas
ctx.beginPath();
ctx.strokeStyle = "#F01C27";
ctx.moveTo(0, 200);
// console.log( sinArray );
sinArray.forEach(({x, y}) => ctx.lineTo(x * 100, y * -150 + 200));
ctx.stroke();
ctx.closePath();

// Canvas
ctx.beginPath();
ctx.strokeStyle = "#29FD3E";
ctx.moveTo(0, 200);
cosArray.forEach(({x, y}) => ctx.lineTo(x * 100, y * -150 + 200));
ctx.stroke();
ctx.closePath();


// ===========================================================================
// 2. Інтервал `[π/4..5π/4]` поділити вертикальними лініями на `N` діапазонів
// ===========================================================================
const start = Math.PI / 4;
const end = Math.PI * 5 / 4;
// console.log( start, end );
const length = end - start;
const partLength = length / N;
const verticalLines = [];

for (let i = 0; i <= N; i++) {
  const coord = start + partLength * i;
  verticalLines.push(Math.round(coord * 100) / 100);
}

// console.log( "verticalLines: " + verticalLines );

// Canvas
ctx.beginPath();
ctx.strokeStyle = "#9A81B2";
verticalLines.forEach(x => {
  ctx.moveTo(x * 100, 0);
  ctx.lineTo(x * 100, 400);
});
ctx.stroke();
ctx.closePath();


// ===========================================================================
// 3. Точки перетину вертикальних ліній з синусоїдою та косинусоїдою 
//    послідовно з'єднати лінією:
// ===========================================================================
const crossSin = [];
const crossCos = [];

// console.log( "verticalLines: " + verticalLines );
// console.log( sinArray );

verticalLines.forEach((xVert) => {
  sinArray.forEach(coord => {
    // console.log( xVert, coord.x );
    if (coord.x === xVert) {
      crossSin.push(coord);
    }
  })

  cosArray.forEach(coord => {
    if (coord.x === xVert) {
      crossCos.push(coord);
    }
  })
})

crossCos.reverse();

const crossTotal = [...crossSin, ...crossCos];

// Canvas
ctx.beginPath();
ctx.strokeStyle = "#350966";
ctx.fillStyle = "#350966";
crossTotal.forEach(({x, y}) => ctx.lineTo(x * 100, y * -150 + 200));
ctx.stroke();
ctx.fill();
ctx.closePath();


// ===========================================================================
// 4. Знайти площу утвореного полігона:
// ===========================================================================
// console.log( crossTotal );
let sum = 0;
let subtraction = 0;
// console.log( crossTotal );

for (let i = 0; i < crossTotal.length - 1; i++) {
  // Сумма координат
  const currentX = crossTotal[i].x;
  const nextY = crossTotal[i + 1].y;
  sum = sum + (currentX * nextY);

  // Разница координат
  const currentY = crossTotal[i].y;
  // console.log( currentY );
  const nextX = crossTotal[i + 1].x;
  subtraction = subtraction - (currentY * nextX);
}

const square = Math.abs( sum + subtraction ) / 2;


// ===========================================================================
// 5. Знайдене значення вивести в консоль.
// ===========================================================================
console.log( square );