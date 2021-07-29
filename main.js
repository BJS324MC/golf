var cd = innerWidth < innerHeight,
  globalWidth = innerWidth,
  globalHeight = innerHeight,
  b = Math.min(globalHeight, globalWidth * (cd ? 1.4975 : 0.4977511244));
globalWidth = Math.min(globalWidth, globalHeight * (cd ? 0.6677796327 : 2.0090361446));
globalHeight = b;
const SHOT_NAMES = {
  0: "PAR",
  1: "BIRDIE",
  2: "EAGLE",
  3: "ALBATROSS",
  "-1": "BOGEY",
  "-2": "DOUBLE BOGEY",
  "-3": "TRIPLE BOGEY"
};
var canvas = document.getElementById("golf"),
  ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
var tw = (globalWidth + globalHeight) / 1998,
  start = [0, 0],
  count = 0,
  shots = 0,
  cam = [0, 0],
  track = cam.slice(),
  animator = new Animator(),
  grid=true,
  error = false,
  following = false,
  lv = 0,
  tl=0,
  bt,
  ev,
  images = [
      "imgs/grass.jpeg",
      "imgs/water.jpeg",
      "imgs/start.png",
      "imgs/stone.png",
      "imgs/boost.jpeg",
      "imgs/sand.png",
      "imgs/hole.png",
      "imgs/spring.png",
      "imgs/ice.png",
      "imgs/arrow.png",
      "imgs/teleporter.png",
      "imgs/blueice.png",
      "imgs/lava.jpg"
    ];
images.forEach((a, i) => {
  let src = a;
  images[i] = new Image();
  images[i].onload = img => {
    count++;
    if (count === images.length) {
      game = new Golf();
      //bt=new Button(0,0,images[1],0.05);
      //levels[lv]();
      fill(-1,-1,2,2,0)
    };
  };
  images[i].src = src;
})

function fill(x, y, w, h, v) {
  for (let i = x; i < w; i++)
    for (let j = y; j < h; j++) game.createTile(i, j, v);
}

function fill2(x, y, w, h, f) {
  for (let i = x; i < w; i++)
    for (let j = y; j < h; j++) game.createTile(i, j, f(i, j));
}
let dragged = false,
  edit=true,
  pressed = false,
  prevD = false,
  balls = [new Ball(0, 0, 0, 0, 200, 10 * tw)];
balls[0].respawnable = true;
grd = ctx.createRadialGradient(globalWidth / 2, globalHeight / 2, Math.max(globalWidth, globalHeight),
  globalWidth / 2, globalHeight / 2, Math.min(globalWidth, globalHeight) / 4);
grd.addColorStop(0, "#0099ff");
grd.addColorStop(1, "#66ccff");
// Rotates the context by 90 degrees clockwise
if (cd) {
  ctx.translate(globalWidth / 2, globalHeight / 2);
  ctx.rotate(Math.PI / 2);
  ctx.translate(-globalWidth / 2, -globalHeight / 2);
}
function draw() {
  let step = 50*tw;
  let left = 0.5 - Math.ceil((canvas.width-cam[0]) / step) * step - step/2;
  let top = 0.5 - Math.ceil((canvas.height-cam[1]) / step) * step - step/2;
  let right = canvas.width + cam[0];
  let bottom = canvas.height + cam[1];
  ctx.beginPath();
  for (let x = left; x < right; x += step) {
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
  }
  for (let y = top; y < bottom; y += step) {
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
  }
  ctx.strokeStyle = "#888";
  ctx.stroke();
}
function loop() {
  if(error)return 0;
  balls[0].updateFollow();
  ctx.fillStyle = grd;
  ctx.fillRect(-innerWidth/2, -innerHeight/2, innerWidth*2, innerHeight*2);
  ctx.save();
  if (following) {
    track = [balls[0].x, balls[0].y];
    cam = [0.8 * cam[0] + 0.2 * track[0], 0.8 * cam[1] + 0.2 * track[1]]
  };
  ctx.translate(globalWidth / 2 - cam[0], globalHeight / 2 - cam[1]);
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
  if (lv === levels.length - 1) {
    ctx.textAlign = "center"
    ctx.fillText("You completed the demo pack! Have fun bouncing!", 0, 0);
    ctx.fillText("Please forgive me.", 0, 400 * tw);
  }
  if(grid)draw();
  ctx.restore();
  ctx.fillStyle = "white"
  ctx.font = (50 * tw) + "px Bebas Neue";
  ctx.textAlign = "right";
  if (cd) ctx.fillText("Shots: " + shots, globalHeight * 0.83 + (innerHeight - globalHeight), globalWidth * 1.24);
  else ctx.fillText("Shots: " + shots, globalWidth - 10, globalHeight - 10);
  animator.refresh();
  if(bt)bt.draw();
  requestAnimationFrame(loop);
}

canvas.addEventListener("touchstart", e => {
  if (edit) {
    let x = Math.round((-globalWidth / 2 + (cd?-cam[1]:cam[0]) + e.touches[0].clientX) / 50),
      y = Math.round((-globalHeight / 2 + (cd?cam[0]:cam[1]) + e.touches[0].clientY) / 50);
    return game.createTile(cd ? y : x, cd ? -x : y, tl);
  }
  dragged = true;
  ev = e.touches[0];
  start = cd ? [ev.clientX - cam[1], ev.clientY + cam[0]] : [ev.clientX + cam[0], ev.clientY + cam[1]];
});
//1 0 0 1
canvas.addEventListener("touchmove", e => {
  if(edit){
    let x = Math.round((-globalWidth / 2 + (cd?-cam[1]:cam[0]) + e.touches[0].clientX) / 50),
      y = Math.round((-globalHeight / 2 + (cd?cam[0]:cam[1]) + e.touches[0].clientY) / 50);
    return game.createTile(cd?y:x,cd?-x:y,tl);
  }
  dragged = true;
  ev = e.touches[0];
  if (!following) {
    cam[0] = cd ? start[1] - ev.clientY : start[0] - ev.clientX;
    cam[1] = cd ? ev.clientX - start[0] : start[1] - ev.clientY;
  };
});
canvas.addEventListener("touchend", e => dragged = false);
canvas.addEventListener('mousedown', e => {
  pressed = true;
  if (edit) {
    let x = Math.round((-globalWidth / 2 + (cd ? -cam[1] : cam[0]) + e.clientX) / 50),
      y = Math.round((-globalHeight / 2 + (cd ? cam[0] : cam[1]) + e.clientY) / 50);
    return game.createTile(cd ? y : x, cd ? -x : y, tl);
  }
  dragged = true;
  ev = e;
  start = [ev.clientX + cam[0], ev.clientY + cam[1]];
});
canvas.addEventListener('mousemove', e => {
  if (!pressed) return false;
  if (edit) {
    let x = Math.round((-globalWidth / 2 + (cd ? -cam[1] : cam[0]) + e.clientX) / 50),
      y = Math.round((-globalHeight / 2 + (cd ? cam[0] : cam[1]) + e.clientY) / 50);
    return game.createTile(cd ? y : x, cd ? -x : y, tl);
  }
  dragged = true;
  ev = e;
  if (!following) {
    cam[0] = cd ? start[1] - ev.clientY : start[0] - ev.clientX;
    cam[1] = cd ? ev.clientX - start[0] : start[1] - ev.clientY;
  };
});
canvas.addEventListener('mouseup', e => { dragged = false;
  pressed = false; });
loop();
/*Find w,h where w:h = 1:2.0090361446 and a+b=1998
a=664
b=1334

globalWidth=(globalWidth+globalHeight)/(3.0090361446),
globalHeight=globalWidth*2.0090361446;
*/