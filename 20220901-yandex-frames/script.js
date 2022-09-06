function createFrames(photoCount, wallWidth, wallHeight) {
  const aspectRatio = wallWidth / wallHeight;
  const columnsNum = Math.ceil(Math.sqrt(photoCount));
  const rowsNum = Math.ceil(photoCount / columnsNum);
  const partialRowLength = photoCount % columnsNum;

  const photo = {};
  photo.width = Math.round(wallWidth / columnsNum);
  photo.height = Math.round(photo.width / aspectRatio);

  let startX = 0;
  if (partialRowLength > 0) {
    startX = (wallWidth - partialRowLength * photo.width) / 2;
  }
  
  let startY = 0;
  
  if (rowsNum * photo.height < wallHeight) {
    startY = (wallHeight - rowsNum * photo.height) / 2;
  }
  
  photo.x = startX;
  photo.y = startY;
  photo.pinX = Math.round(photo.x + photo.width / 2);
  photo.pinY = Math.round(photo.y);

  const res = [];

  for (let i = 0; i < rowsNum; i++) {
    res[i] = [];

    for (let j = 0; j < columnsNum; j++) {
      res[i].push({
        row: i,
        col: j,
        width: photo.width,
        height: photo.height,
        x: photo.x,
        y: photo.y,
        pinX: photo.pinX,
        pinY: photo.pinY,
      });

      if (i === 0 && partialRowLength > 0 && j >= partialRowLength - 1) {
        photo.x = 0;
        photo.y = photo.y + photo.height;
        photo.pinX = Math.round(photo.x + photo.width / 2);
        photo.pinY = Math.round(photo.y);
        break;
      } else if (j === columnsNum - 1) {
        photo.x = startX;
        photo.y = startY + photo.height;
        photo.pinX = Math.round(photo.x + photo.width / 2);
        photo.pinY = Math.round(photo.y);
      } else {
        photo.x = photo.x + photo.width;
        photo.pinX = Math.round(photo.x + photo.width / 2);
        photo.pinY = Math.round(photo.y);
      }
    }
  }

  // return res.flat().map(({ width, height, pinX, pinY, x, y }) => ({
  //   width,
  //   height,
  //   x: pinX,
  //   y: pinY,
  // }));

  return res.flat().map(({ width, height, pinX, pinY, x, y }) => ({
    width,
    height,
    x,
    y,
  }));
}


// =============================================================================
// ДЕМОНСТРАЦИЯ
// =============================================================================
const framesCount = 5;
const wallWidth = 100;
const wallHeight = 30;
const frames = createFrames(framesCount, wallWidth, wallHeight);

root.style.inlineSize = wallWidth * 10 + "px";
root.style.blockSize = wallHeight * 10 + "px";
root.style.backgroundColor = "#ccc";
root.style.position = "relative";

frames.forEach(({x, y, width, height}) => {
  const elem = document.createElement("div");
  elem.style.position = "absolute";
  elem.style.left = x * 10 + "px";
  elem.style.top = y * 10 + "px";
  elem.style.inlineSize = width * 10 + "px";
  elem.style.blockSize = height * 10 + "px";
  elem.style.backgroundColor = "#fff";
  elem.style.border = "1px solid black";
  root.append(elem);
})