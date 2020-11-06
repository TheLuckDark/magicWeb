let canvas,
  ctx,
  bar,
  star,
  progress,
  loadSpeed = 0.5,
  hasMouse = false,
  mouse_star = {
    x: -100,
    y: -100,
    r: 8,
    color: "green"
  };

init();

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  initStar();
  progress = 0;
  window.onresize = resize;
  resize();
  bar = new Bar();
  updateAni();
  star = new Star();
  updateStar();
}
function drawLinearGradient() {
  let gra = ctx.createLinearGradient(0, 0, 300, 300);
  gra.addColorStop(0, '#eea2a2');
  // gra.addColorStop(0.5, 'green');
  gra.addColorStop(1, '#7ac5d8');
  ctx.fillStyle = gra;
  ctx.fillRect(0, 0, 300, 300);
}

function updateAni() {
  progress += loadSpeed;
  if (progress > 100) {
    progress = 0;
  } else {
  }
  renderBG();
  bar.render(progress);
  requestAnimationFrame(updateAni);
}
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (bar) {
    bar.resize();
  }
}

function renderBG() {
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initStar() {
  canvas.onmouseenter = onmouseenter;
  canvas.onmouseleave = onmouseleave;
  canvas.onmousemove = onmousemove;
}

function onmouseenter() {
  hasMouse = true;
}
function onmouseleave() {
  hasMouse = false;
}
function onmousemove(e) {
  mouse_star.x = e.clientX;
  mouse_star.y = e.clientY;
}
function updateStar() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  star.render();
  requestAnimationFrame(updateStar);
}
function fas() {
  let i, activeParticels = [];
  let particles = [];
  for (i = 0; i < 10; ++i) {
    particles.push(new Particle(12, 12));
  }
  for (i = 0; i < particles.length; ++i) {
    if (particles[i].active) {
      activeParticels.push(particles[i]);
      particles[i].render();
    }
  }
  particles = activeParticels.slice(0);
}
function Star() {
  this.density = 10;
  this.particles = [];
  this.bgColor = '#333';
  this.density = 10;
  this.reset = function () {
    this.resize();
  };
  this.resize = function () {
  };
  this.reset();
  this.render = function (ratio) {
    this.drawStar();
    this.renderParticle();
  };
  this.drawStar = function () {
    var img = document.getElementById("hangBang");
    ctx.drawImage(img, mouse_star.x - 20, mouse_star.y - 40, 30, 66);
    // ctx.fillStyle = mouse_star.color;
    // ctx.beginPath();
    // ctx.arc(mouse_star.x, mouse_star.y, mouse_star.r, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.fill();
  };
  this.renderParticle = function () {
    let i, activeParticels = [];
    for (i = 0; i < this.density; ++i) {
      this.particles.push(new StarParticle(mouse_star.x - 10, mouse_star.y - 20));
    }
    for (i = 0; i < this.particles.length; ++i) {
      if (this.particles[i].active) {
        activeParticels.push(this.particles[i]);
        this.particles[i].render();
      }
    }
    this.particles = activeParticels.slice(0);
    // console.log('particles number = '+this.particles.length);
  };
}
function Bar() {
  this.curWidth;
  this.hue;
  this.minHue = 0;
  this.maxHue = 90;
  this.w;
  this.h;
  this.l;
  this.t;
  this.bgColor = '#333';
  this.density = 10;
  this.particles = [];

  this.reset = function () {
    this.curWidth = 0;
    this.hue = this.minHue;
    this.resize();
  };
  this.resize = function () {
    this.w = canvas.width > 1200 ? 1000 : canvas.width * 0.8;
    this.h = 50;
    this.l = (canvas.width - this.w) / 2;
    this.t = (canvas.height - this.h) / 6*5;
  };
  this.reset();
  this.render = function (ratio) {
    this.caculate(ratio);
    this.drawBG();
    this.drawBar();
    this.renderParticle();
  };
  this.caculate = function (ratio) {
    ratio = ratio > 100 ? 1 : ratio / 100;
    bar.hue = this.minHue +
      ratio * (this.maxHue - this.minHue);
    bar.curWidth = this.w * ratio;
    bar.curWidth = bar.curWidth > this.w ?
      this.w : bar.curWidth;
  };
  this.drawBG = function () {
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(this.l, this.t, this.w, this.h);
  };
  this.drawBar = function () {
    ctx.fillStyle = 'rgba(122,197,216 , 1)';
    ctx.fillRect(this.l, this.t, this.curWidth, this.h);
    let grad = ctx.createLinearGradient(
      this.l, this.t, this.l + this.curWidth, this.t + this.h);
    grad.addColorStop(0, "#eea2a2");
    grad.addColorStop(1, "#7ac5d8");
    ctx.fillStyle = grad;
    ctx.fillRect(this.l, this.t, this.curWidth, this.h);
  };
  this.renderParticle = function () {
    let i, activeParticels = [];
    for (i = 0; i < this.density; ++i) {
      this.particles.push(new Particle(this.l + this.curWidth, this.t));
    }
    for (i = 0; i < this.particles.length; ++i) {
      if (this.particles[i].active) {
        activeParticels.push(this.particles[i]);
        this.particles[i].render();
      }
    }
    this.particles = activeParticels.slice(0);
    // console.log('particles number = '+this.particles.length);
  };
}

function Particle(l, t) {
  this.x = l;
  this.y = t;
  this.vx = -(0.8 + Math.random() * 1);
  this.vy = -(1 + Math.random() * 3);
  this.g = 0.1;
  this.curAlpha = 1;
  this.alphaSpeed = 0.01;
  this.active = true;

  this.render = function () {
    if (this.active) {
      this.calculate();
      this.draw();
    }
  }
  this.draw = function () {
    ctx.fillStyle = 'rgba(122,197,216 ,' + this.curAlpha + ')';
    let size = Math.random() * 2;
    ctx.fillRect(this.x, this.y, size, size);
  };
  this.calculate = function () {
    this.x += this.vx;
    this.vy += this.g;
    this.y += this.vy;
    this.curAlpha = Math.max(0,
      this.curAlpha - this.alphaSpeed);
    if (this.curAlpha == 0) {
      this.active = false;
    }
  };
}

function StarParticle(l, t) {
  this.x = l;
  this.y = t;
  this.vx = (-1 + Math.random() * 2);
  this.vy = (1 + Math.random() * 3);
  this.g = 0.1;
  this.curAlpha = 1;
  this.alphaSpeed = 0.01;
  this.active = true;

  this.render = function () {
    if (this.active) {
      this.calculate();
      this.draw();
    }
  }
  this.draw = function () {
    var rNew = Math.floor(Math.random() * 256); //随机生成256以内r值
    var gNew = Math.floor(Math.random() * 256); //随机生成256以内g值
    var bNew = Math.floor(Math.random() * 256); //随机生成256以内b值
    let colorsNew = `rgb(${rNew},${gNew},${bNew})`;
    ctx.fillStyle = colorsNew;
    let size = Math.random() * 2;
    ctx.fillRect(this.x, this.y, size, size);
  };
  this.calculate = function () {
    this.x += this.vx;
    this.vy += this.g;
    this.y += this.vy;
    this.curAlpha = Math.max(0,
      this.curAlpha - this.alphaSpeed);
    if (this.curAlpha == 0) {
      this.active = false;
    }
  };
}
