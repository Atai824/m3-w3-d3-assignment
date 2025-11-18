const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// 1 — открытый рот, 0 — закрытый рот
// 0: вправо, 1: влево
const pacImages = [
  ["./images/PacMan1.png", "./images/PacMan2.png"], // вправо
  ["./images/PacMan3.png", "./images/PacMan4.png"], // влево
];

function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);

  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.width = 100;

  // направление по умолчанию — вправо
  let direction = 0;

  // начальная картинка
  newimg.src = pacImages[direction][0];

  newimg.style.left = position.x + "px";
  newimg.style.top = position.y + "px";
  game.appendChild(newimg);

  return {
    position,
    velocity,
    newimg,
    mouth: 0, // 0 open / 1 close
    direction, // 0 right / 1 left
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

   
    if (item.velocity.x > 0) item.direction = 0; 
    else item.direction = 1;

    
    item.mouth = item.mouth === 0 ? 1 : 0;

    
    item.newimg.src = pacImages[item.direction][item.mouth];

    
    item.newimg.style.left = item.position.x + "px";
    item.newimg.style.top = item.position.y + "px";
  });

  setTimeout(update, 100);
}

function checkCollisions(item) {
  let imgWidth = item.newimg.width;
  let imgHeight = item.newimg.height;

  if (
    item.position.x + item.velocity.x + imgWidth > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
  }

  if (
    item.position.y + item.velocity.y + imgHeight > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac());
}

if (typeof module !== "undefined") {
  module.exports = { checkCollisions, update, pacMen };
}
