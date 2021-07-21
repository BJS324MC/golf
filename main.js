var globalWidth=360,
globalHeight=630;
let tmp=Math.min(globalWidth,globalHeight*(globalWidth>globalHeight?2.0090361446:0.4977511244));
globalHeight=Math.min(globalHeight,globalWidth*(globalWidth>globalHeight?0.4977511244:2.0090361446));
globalWidth=tmp;
let canvas = document.getElementById("golf"),
  ctx = canvas.getContext("2d");
canvas.width = globalWidth*1.5;
canvas.height = globalHeight*1.5;
var tw = (globalWidth+globalHeight)/1998,
  cd=globalWidth<globalHeight;
const SHOT_NAMES = {
  0: "PAR",
  1: "BIRDIE",
  2: "EAGLE",
  3: "ALBATROSS",
  "-1": "BOGEY",
  "-2": "DOUBLE BOGEY",
  "-3": "TRIPLE BOGEY"
};
maxs=0;
count = 0;
shots = 0;
score = 0;
var map = [[3, 0, 5, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 0, 5, 3, 3, 3, 3, 3, 3, 3, 3, 0], [3, 0, 3, 0, 3, 0, 3, 0, 5, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0], [3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 5, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0, 3, 5, 5, 0, 3, 3, 3, 0], [3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0], [3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 0], [3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0], [3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 5, 3, 3, 3, 3, 0], [0, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0], [3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 5, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0], [3, 3, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 3, 0, 3, 5, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0], [3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0], [3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0], [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0], [3, 3, 3, 0, 3, 5, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0], [3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0], [3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 5, 0, 3, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0], [3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 0], [3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, 3, 0, 3, 0, 3, 0], [3, 3, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0], [3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0], [3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0], [3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0], [3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0], [3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 5, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0], [3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0], [3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0, 3, 5, 3, 0, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0], [3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 3, 0], [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 5, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0], [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0], [3, 3, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0, 3, 5, 3, 0, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0], [3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0], [3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0], [3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0], [3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 5, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 0], [3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0], [3, 5, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
let cam = [0, 0],
  max = 0,
  track = cam.slice();
let images = [
      "imgs/grass.jpeg",
      "imgs/water.jpeg",
      "imgs/start.png",
      "imgs/stone.png",
      "imgs/boost.jpeg",
      "imgs/sand.png",
      "imgs/hole.png",
      "imgs/spring.png",
      "imgs/teleporter.png"
    ];
var animator = new Animator();
let lv = 0;
var levels = [
  () => {
    fill(-2, -4, 18, 6, 2)
    fill(-1, -3, 17, 5, 0)
    fill(-1, -3, 2, 5, 0)
    fill(6, -1, 8, 3, 2)
    fill(2, -3, 17, -2, 1)
    fill(2, 4, 17, 5, 1)
    fill(5, 0, 10, 2, 3)
    game.createTile(5, -1, 5);
    game.createTile(5, 2, 5);
    game.createTile(16, 0, 6);
    par = 2;
  },
  () => {
    fill(-10, -10, 10, 10, 0);
    fill(-8, -8, 8, 8);
    fill(-3, -3, 3, 3, 0)
    fill(-1, -1, 1, 8, 0)
    fill(1, 7, 8, 10)
    fill(-10, -1, -8, 1, 4)
    fill(-10, -10, -8, -4, 3)
    fill(-7, -10, 10, -9, 1)
    game.createTile(3, 0, 5);
    game.createTile(8, 9, 6);
    game.createTile(9, 9, 6);
    par = 8;
  },
  () => {
    fill(-6, -9, 4, -6, 2)
    fill(-6, -8, 4, -4, 0)
    fill(-6, -4, -4, 1, 3)
    fill(-2, -6, 2, -5, 4)
    fill(-2, -5, 2, -4, 5)
    fill(-2, -2, 2, 1, 5);
    fill(-1, -2, 2, 1, 0);
    fill(5, 1, 10, 6, 2);
    fill(6, 1, 9, 5, 0);
    game.createTile(7, 3, 6);
    par = 3;
  },
  () => {
    fill(-5, 0, 5, 2, 0)
    game.createTile(-5, 0, new Teleporter(-5, 0, 4, 0))
    game.createTile(3, 0, 5)
    fill(2, 0, 3, 2, 2);
    fill(8, -4, 9, 1, 3);
    fill(-5, -6, 9, -4, 0);
    fill(-6, -6, -5, -4, 2);
    game.createTile(-5, -4, 5);
    game.createTile(3, 1, 2)
    fill(0, 4, 5, 5, 3);
    fill(-2, 4, 0, 5, 4);
    game.createTile(-3, 4, 5)
    game.createTile(-5, 4, new Teleporter(-5, 4, 40, 4))
    fill(16, 4, 31, 5, 0);
    game.createTile(16, 4, 6)
    par = 8;
  },
  () => {
    map.forEach((a, i) => a.forEach((b, j) => b ? game.createTile(i - 20, j - 20, b) : 0))
    game.createTile(18, 18, 6);
    par = 20;
  },
  () => {
    fill(0, -1, 50, 1, 4)
    fill(0, -1, 2, 1, 0)
    fill(50, -1, 51, 1, 5)
    fill(124, -1, 303, 1, 3);
    fill(303, -1, 304, 1, 6);
    par = 2;
  },
  () => {
    fill(-10, -10, 10, 10, 0);
    for (let i = -5; i < 5; i++)
      for (let j = -5; j < 5; j++) balls.push(new Ball(i * 50, j * 50, 0, 0, 1, 10))
  }
  ]
images.forEach((a, i) => {
  let src = a;
  images[i] = new Image();
  images[i].onload = img => {
    count++;
    if (count === images.length) {
      game = new Golf();
      levels[lv]();
    };
  };
  images[i].src = src;
})

function fill(x, y, w, h, v) {
  for (let i = x; i < w; i++)
    for (let j = y; j < h; j++) game.createTile(i, j, v);
}
let dragged = false,
  prevD = false,
  ev;
let balls = [new Ball(0, 0, 0, 0, 200, 10*tw)];
balls[0].respawnable = true;
var grd = ctx.createRadialGradient(globalWidth / 2, globalHeight / 2, Math.max(globalWidth, globalHeight),
  globalWidth / 2, globalHeight / 2, Math.min(globalWidth, globalHeight) / 4);
grd.addColorStop(0, "#0099ff");
grd.addColorStop(1, "#66ccff");
if (cd) {
  ctx.translate(globalWidth / 2, globalHeight / 2);
  ctx.rotate(Math.PI / 2);
  ctx.translate(-globalWidth / 2, -globalHeight / 2);
}

function loop() {
  if (balls[0].speed > max) max = balls[0].speed;
  ctx.fillStyle = grd;
  ctx.fillRect(-globalWidth, -globalHeight, globalWidth * 3, globalHeight * 3);
  ctx.save();
  track = [balls[0].x, balls[0].y];
  cam = [0.8 * cam[0] + 0.2 * track[0], 0.8 * cam[1] + 0.2 * track[1]];
  ctx.translate(globalWidth / 2 - cam[0], globalHeight / 2 - cam[1]);
  //ctx.scale(tw,tw)
  if (count === images.length) game.drawAll(ctx);
  if (dragged) balls[0].onDrag(ev, ctx);
  else if (prevD) balls[0].onDrop();
  prevD = dragged;
  balls.forEach((a, i) => {
    if (a.out) return balls.splice(i, 1);
    let p1 = JSON.parse(JSON.stringify(a.polygon.pos));
    a.move();
    let p2 = JSON.parse(JSON.stringify(a.polygon.pos));
    for (let b of balls) {
      if (b.x === a.x && b.y === a.y) continue;
      let response = new SAT.Response(),
        collided = SAT.testCircleCircle(a.polygon, b.polygon, response);
      if (collided && !b.collided) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (a.radius + b.radius >= dist) { // the balls overlap
          // normalise the vector between them
          const nx = dx / dist;
          const ny = dy / dist;

          const touchDistFroma = (dist * (a.radius / (a.radius + b.radius)))
          const contactX = a.x + nx * touchDistFroma;
          const contactY = a.y + ny * touchDistFroma;

          a.x = contactX - nx * a.radius;
          a.y = contactY - ny * a.radius;

          b.x = contactX + nx * b.radius;
          b.y = contactY + ny * b.radius;
        }
        a.bounce(b);
        break
      }
      else {
        a.collided = false;
        b.collided = false;
      }
    }
    if (count === images.length) a.collideTile();
    //a.reflect();
    a.draw(ctx);
  })
  if (lv === 6) {
    ctx.textAlign = "center"
    ctx.fillText("You completed the demo pack! Now have fun clearing these.", 0, 0);
  }
  ctx.restore();
  ctx.fillStyle = "white"
  ctx.font = (50*tw)+"px Bebas Neue";
  ctx.textAlign = "right";
  if(cd) ctx.fillText("Shots: "+shots,globalHeight*0.83,globalWidth*1.24);
  else ctx.fillText("Shots: " + shots, globalWidth - 10, globalHeight - 10);
  animator.refresh();
  requestAnimationFrame(loop);
}
addEventListener("touchstart", e => {
  dragged = true;
  ev = e
});
addEventListener("touchmove", e => {
  dragged = true;
  ev = e;
});
addEventListener("touchend", e => dragged = false);
loop();