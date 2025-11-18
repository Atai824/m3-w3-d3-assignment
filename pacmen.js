const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  let velocity = setToRandom(10); 
  let position = setToRandom(200);

  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // right or left wall
  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
      item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
  }

  // bottom or top wall
  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
      item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); 
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
