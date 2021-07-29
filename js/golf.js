class Golf {
  constructor() {
    this.world = {};
    this.tileWidth = 50 * tw;
    this.classes = {
      0: new Grass(),
      1: new Water(),
      2: new Stone(),
      3: new Sand(),
      4: new Boost(),
      5: new Spring(),
      6: new Hole(),
      7: new Ice(),
      8: new BlueIce(),
      9: new Lava()
    }
    this.frontLayer = [];
  }
  createTile(x, y, v) {
    if (!this.world[x]) this.world[x] = {};
    this.world[x][y] = v;
  }
  getTile(x, y) {
    let tile = this.world[x];
    if (tile && typeof tile[y] !== "undefined") tile = tile[y];
    else return false;
    let t = this.classes[tile] ? this.classes[tile] : tile;
    t.x = x;
    t.y = y;
    t.tileWidth = this.tileWidth;
    t.updatePolygon();
    return t
  }
  drawTile(ctx, x, y) {
    let t = this.getTile(x, y);
    if (t) t.draw(ctx);
  }
  drawAll(ctx) {
    for (let i in this.world)
      for (let j in this.world[i]) this.drawTile(ctx, i, j);
    while (this.frontLayer.length) {
      this.frontLayer.shift()();
    }
  }
}
class Tile {
  constructor(x, y, tileWidth = 50 * tw) {
    this.x = x;
    this.y = y;
    this.tileWidth = tileWidth;
    this.polygon = new SAT.Box(new SAT.Vector(this.x * tileWidth - tileWidth / 2, this.y * tileWidth - tileWidth / 2), tileWidth, tileWidth);
    this.placable = false;
    this.block = false;
    this.activated = false;
  }
  action(ball) {
    return ball;
  }
  updatePolygon() {
    this.polygon = new SAT.Box(new SAT.Vector(this.x * this.tileWidth - this.tileWidth / 2, this.y * this.tileWidth - this.tileWidth / 2), this.tileWidth, this.tileWidth);
  }
}
class Hole extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.image = images[6];
    this.hole = true;
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
};
class InvisibleHole extends Hole {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.image = images[3];
  }
}
class FakeHole extends Hole {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.hole = false;
    this.fallable = true;
  }
  fallIn(ball) {
    ball.speed = 0;
    setTimeout(() => {
      ctx.fillStyle = "rgba(255,255,255,0.5";
      ctx.fillRect(-innerWidth, -innerHeight, innerWidth * 3, innerHeight * 3)
    }, 1000)
    setTimeout(() => throwError(ctx, innerWidth / 2 - 400, innerHeight / 2 - 50, {
      title: "Unable to connect",
      width: 800,
      height: 100,
      message: "Your browser can't establish a connection to https://bjs324mc.github.io/golf. Refresh the page or try again later."
    }), 3000)
    error = true;
  }
}
class Grass extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.image = images[0];
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
}
class Water extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.image = images[1];
    this.fallable = true;
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
  fallIn(ball) {
    ball.speed = 0;
    ball.fallOff();
  }
};
class Stone extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth)
    this.image = images[3];
    this.block = true;
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
};
class Wall extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.block = true;
  }
};
class Ice extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.image = images[8];
  }
  action(ball) {
    ball.fric = 0.01;
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
}
class BlueIce extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth)
    this.image = images[11];
    this.block = true;
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
};
class Arrow extends Tile {
  constructor(x, y, tileWidth, angle = 0) {
    super(x, y, tileWidth);
    this.angle = angle;
    this.image = images[9];
  }
  action(ball) {
    if (!ball.canFall) return 0;
    let a = (ball.angle + 360) % 360,
      b = (this.angle + 270) % 360,
      c = (b - a + 360) % 360,
      d = (a - b + 360) % 360,
      v = c <= d ? c : -d;
    ball.angle += Math.abs(v) < 20 ? v : v / 20;
    ball.speed = Math.max(ball.speed, 1);
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.save();
    ctx.translate(this.x * this.tileWidth, this.y * this.tileWidth);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.drawImage(this.image, -pol.w / 2, -pol.h / 2, pol.w, pol.h);
    ctx.restore();
  }
};
class Teleporter extends Tile {
  constructor(x, y, x2, y2, tileWidth) {
    super(x, y, tileWidth);
    this.des = { x: x2, y: y2 };
    this.image = images[10];
  }
  action(ball) {
    ball.x = this.des.x * this.tileWidth;
    ball.y = this.des.y * this.tileWidth;
  }
  draw() {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
    game.frontLayer.push(() => {
      ctx.globalAlpha = 0.5;
      ctx.drawImage(this.image, this.des.x * this.tileWidth - pol.w / 2, this.des.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
      ctx.fillStyle = "rgba(255,255,0,1)";
      ctx.fillRect(this.des.x * this.tileWidth - pol.w / 2, this.des.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
      ctx.globalAlpha = 1;
    });
  }
}
class Lava extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.image = images[12];
    this.fallable = true;
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
  fallIn(ball) {
    ball.speed = 0;
    if (ball.falling || !ball.canFall) return false;
    ball.falling = true;
    animator.addAnimation(x => ball.radius = x, { 0: ball.radius, 1: 0 }, 500,
      f => {
        if (!ball.respawnable) { return ball.out = true };
        ball.x = (ball.respawnX = 0);
        ball.y = (ball.respawnY = 0);
        ball.radius = f[0];
        ball.falling = false;
      });
  }
}
class Portal extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);

  }
  action(ball) {

  }
}
class Sand extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.image = images[5];
  }
  action(ball) {
    ball.fric = 0.2;
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
};
class Spring extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.airTime = 2;
    this.image = images[7];
  }
  action(ball) {
    if (!ball.canFall) return false;
    ball.canFall = false;
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
};
class Boost extends Tile {
  constructor(x, y, tileWidth) {
    super(x, y, tileWidth);
    this.image = images[4];
  }
  action(ball) {
    ball.speed += 0.3 * tw / (cd ? 0.951125 : 1);
  }
  draw(ctx) {
    let pol = this.polygon;
    ctx.drawImage(this.image, this.x * this.tileWidth - pol.w / 2, this.y * this.tileWidth - pol.h / 2, pol.w, pol.h);
  }
};

function interceptOnCircle(p1, p2, c, r) {
  var p3 = { x: p1.x - c.x, y: p1.y - c.y } //shifted line points
  var p4 = { x: p2.x - c.x, y: p2.y - c.y }

  var m = p4.x === p3.x ? 0 : (p4.y - p3.y) / (p4.x - p3.x); //slope of the line
  var b = p3.y - m * p3.x; //y-intercept of line

  var mm = Math.pow(m, 2);

  var underRadical = Math.pow(r, 2) * (mm + 1) - Math.pow(b, 2); //the value under the square root sign 
  if (underRadical < 0) {
    //line completely missed
    return false;
  } else {
    var rd = Math.sqrt(underRadical);
    var t1 = (-2 * m * b + 2 * rd) / (2 * mm + 2); //one of the intercept x's
    var t2 = (-2 * m * b - 2 * rd) / (2 * mm + 2); //other intercept's x
    var i1 = { x: t1 + c.x, y: m * t1 + b + c.y } //intercept point 1
    var i2 = { x: t2 + c.x, y: m * t2 + b + c.y } //intercept point 2
    var id1 = Math.pow(p1[0] - i1[0], 2) + Math.pow(p1[1] - i1[1], 2);
    var id2 = Math.pow(p1[0] - i2[0], 2) + Math.pow(p1[1] - i2[1], 2);
    if (id1 > id2) return [i2, i1]
    return [i1, i2];
  }
}

function movePointByDistance(p1, p2, dt) {
  let d = Math.hypot(p2.x - p1.x, p2.y - p1.y)
  t = dt / d;
  return { x: (1 - t) * p1.x + t * p2.x, y: (1 - t) * p1.y + t * p2.y };
}
/*
TO DO:
1.
*/