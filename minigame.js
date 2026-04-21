// ===== DOPRAVNÍ MINIHRA – "Přejdi křižovatku" =====
// Cyklista musí projet přes křižovatku bez kolize s auty
// Ovládání: šipky / WASD nebo touch tlačítka

let mgCanvas, mgCtx, mgAnimId;
let mgRunning = false;
let mgWon = false;

const MG = {
  W: 480, H: 480,
  // Bike player
  bike: { x: 240, y: 420, size: 22, speed: 3, dx: 0, dy: 0 },
  // Cars – horizontal and vertical lanes
  cars: [],
  keys: {},
  frame: 0,
  timeLeft: 30,
  timerInterval: null,
  onWin: null,
  touches: { up: false, down: false, left: false, right: false }
};

const CAR_CONFIGS = [
  // { x_start, y, direction: 'h'=horizontal, speed, color }
  { lane: 'h', y: 180, startX: -60, speed: 2.2, color: '#e63232', delay: 0 },
  { lane: 'h', y: 180, startX: -60, speed: 2.2, color: '#3296e6', delay: 120 },
  { lane: 'h', y: 180, startX: -60, speed: 2.2, color: '#e6b432', delay: 240 },
  { lane: 'h', y: 300, startX: MG.W + 60, speed: -2.0, color: '#32e67a', delay: 60 },
  { lane: 'h', y: 300, startX: MG.W + 60, speed: -2.0, color: '#9b32e6', delay: 180 },
  { lane: 'v', x: 180, startY: -60, speed: 2.0, color: '#e67a32', delay: 30 },
  { lane: 'v', x: 180, startY: -60, speed: 2.0, color: '#32e6e6', delay: 160 },
  { lane: 'v', x: 300, startY: MG.H + 60, speed: -2.2, color: '#e632b4', delay: 90 },
  { lane: 'v', x: 300, startY: MG.H + 60, speed: -2.2, color: '#e6e632', delay: 210 },
];

function initCars() {
  MG.cars = CAR_CONFIGS.map(cfg => ({
    ...cfg,
    cx: cfg.lane === 'h' ? cfg.startX : cfg.x,
    cy: cfg.lane === 'v' ? cfg.startY : cfg.y,
    w: cfg.lane === 'h' ? 48 : 24,
    h: cfg.lane === 'v' ? 48 : 24,
    frameOffset: cfg.delay
  }));
}

function updateCars() {
  MG.cars.forEach(car => {
    if (MG.frame < car.frameOffset) return;
    if (car.lane === 'h') {
      car.cx += car.speed;
      if (car.speed > 0 && car.cx > MG.W + 80) car.cx = -80;
      if (car.speed < 0 && car.cx < -80) car.cx = MG.W + 80;
    } else {
      car.cy += car.speed;
      if (car.speed > 0 && car.cy > MG.H + 80) car.cy = -80;
      if (car.speed < 0 && car.cy < -80) car.cy = MG.H + 80;
    }
  });
}

function drawRoad(ctx) {
  // Background
  ctx.fillStyle = '#1a1f2e';
  ctx.fillRect(0, 0, MG.W, MG.H);

  // Road horizontal
  ctx.fillStyle = '#2a2f3a';
  ctx.fillRect(0, 155, MG.W, 170);
  // Road vertical
  ctx.fillRect(155, 0, 170, MG.H);

  // Intersection
  ctx.fillStyle = '#2e3444';
  ctx.fillRect(155, 155, 170, 170);

  // Lane lines horizontal
  ctx.setLineDash([20, 15]);
  ctx.strokeStyle = 'rgba(255,214,0,0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 240); ctx.lineTo(155, 240); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(325, 240); ctx.lineTo(MG.W, 240); ctx.stroke();

  // Lane lines vertical
  ctx.beginPath(); ctx.moveTo(240, 0); ctx.lineTo(240, 155); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(240, 325); ctx.lineTo(240, MG.H); ctx.stroke();
  ctx.setLineDash([]);

  // Zebra crossing (goal)
  ctx.fillStyle = 'rgba(255,214,0,0.15)';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(160 + i * 30, 20, 20, 40);
  }
  ctx.fillStyle = '#FFD600';
  ctx.font = 'bold 13px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏁 CÍL', 240, 18);
}

function drawCar(ctx, car) {
  ctx.save();
  ctx.translate(car.cx + car.w / 2, car.cy + car.h / 2);
  if (car.lane === 'v') ctx.rotate(Math.PI / 2);

  // Car body
  ctx.fillStyle = car.color;
  ctx.beginPath();
  ctx.roundRect(-car.w / 2, -car.h / 2, car.w, car.h, 6);
  ctx.fill();

  // Windshield
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(-8, -car.h / 2 + 4, 16, 8);

  // Wheels
  ctx.fillStyle = '#111';
  [[-car.w / 2 + 3, -7], [car.w / 2 - 3, -7], [-car.w / 2 + 3, 5], [car.w / 2 - 3, 5]].forEach(([wx, wy]) => {
    ctx.beginPath(); ctx.arc(wx, wy, 4, 0, Math.PI * 2); ctx.fill();
  });
  ctx.restore();
}

function drawBike(ctx, bike) {
  ctx.save();
  ctx.translate(bike.x, bike.y);
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath(); ctx.ellipse(0, 10, 14, 6, 0, 0, Math.PI * 2); ctx.fill();
  // Emoji bike
  ctx.font = `${bike.size * 1.6}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🚴', 0, 0);
  ctx.restore();
}

function checkCollision(bike, car) {
  const bx = bike.x - bike.size * 0.6, by = bike.y - bike.size * 0.6;
  const bw = bike.size * 1.2, bh = bike.size * 1.2;
  return !(bx + bw < car.cx || bx > car.cx + car.w ||
           by + bh < car.cy || by > car.cy + car.h);
}

function checkGoal(bike) {
  return bike.y < 65 && bike.x > 155 && bike.x < 325;
}

function mgLoop() {
  if (!mgRunning) return;
  MG.frame++;

  // Input
  const b = MG.bike;
  b.dx = 0; b.dy = 0;
  if (MG.keys['ArrowLeft'] || MG.keys['a'] || MG.keys['A'] || MG.touches.left)  b.dx = -b.speed;
  if (MG.keys['ArrowRight'] || MG.keys['d'] || MG.keys['D'] || MG.touches.right) b.dx =  b.speed;
  if (MG.keys['ArrowUp'] || MG.keys['w'] || MG.keys['W'] || MG.touches.up)    b.dy = -b.speed;
  if (MG.keys['ArrowDown'] || MG.keys['s'] || MG.keys['S'] || MG.touches.down)  b.dy =  b.speed;

  b.x = Math.max(10, Math.min(MG.W - 10, b.x + b.dx));
  b.y = Math.max(10, Math.min(MG.H - 10, b.y + b.dy));

  updateCars();

  // Draw
  const ctx = mgCtx;
  drawRoad(ctx);
  MG.cars.forEach(car => drawCar(ctx, car));
  drawBike(ctx, b);

  // Timer display
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.beginPath(); ctx.roundRect(8, 8, 100, 34, 8); ctx.fill();
  ctx.fillStyle = MG.timeLeft <= 5 ? '#e63232' : '#FFD600';
  ctx.font = 'bold 16px Outfit, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`⏱ ${MG.timeLeft}s`, 18, 30);

  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath(); ctx.roundRect(MG.W - 170, 8, 162, 34, 8); ctx.fill();
  ctx.fillStyle = '#aaa';
  ctx.font = '12px Outfit, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('WASD / šipky', MG.W - 12, 28);

  // Collision check
  for (const car of MG.cars) {
    if (checkCollision(b, car)) {
      mgEnd(false);
      return;
    }
  }

  // Goal check
  if (checkGoal(b)) {
    mgEnd(true);
    return;
  }

  mgAnimId = requestAnimationFrame(mgLoop);
}

function mgStart(onWinCallback) {
  MG.onWin = onWinCallback;
  MG.bike = { x: 240, y: 420, size: 22, speed: 3.2, dx: 0, dy: 0 };
  MG.frame = 0;
  MG.timeLeft = 30;
  MG.keys = {};
  MG.touches = { up: false, down: false, left: false, right: false };
  mgRunning = true;
  mgWon = false;
  initCars();

  if (MG.timerInterval) clearInterval(MG.timerInterval);
  MG.timerInterval = setInterval(() => {
    if (!mgRunning) return;
    MG.timeLeft--;
    if (MG.timeLeft <= 0) mgEnd(false);
  }, 1000);

  mgCanvas = document.getElementById('mgCanvas');
  mgCtx = mgCanvas.getContext('2d');

  if (mgAnimId) cancelAnimationFrame(mgAnimId);
  mgLoop();
}

function mgEnd(won) {
  mgRunning = false;
  clearInterval(MG.timerInterval);
  cancelAnimationFrame(mgAnimId);
  mgWon = won;

  const ctx = mgCtx;
  // Overlay
  ctx.fillStyle = won ? 'rgba(46,204,113,0.82)' : 'rgba(230,50,50,0.82)';
  ctx.fillRect(0, 0, MG.W, MG.H);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 42px Bebas Neue, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(won ? '🏆 PROJEL JSI!' : '💥 KOLIZE!', MG.W / 2, MG.H / 2 - 20);
  ctx.font = '18px Outfit, sans-serif';
  ctx.fillText(won ? 'Nápověda odemčena!' : 'Zkus to znovu...', MG.W / 2, MG.H / 2 + 20);

  const resultDiv = document.getElementById('mgResult');
  if (won) {
    resultDiv.innerHTML = `<div class="mg-win-msg">🎉 Skvěle! Odemknul jsi nápovědu!</div>`;
    document.getElementById('mgRestartBtn').style.display = 'none';
    document.getElementById('mgClaimBtn').style.display = 'inline-flex';
  } else {
    resultDiv.innerHTML = `<div class="mg-lose-msg">💥 Srazil jsi se! Zkus znovu.</div>`;
    document.getElementById('mgRestartBtn').style.display = 'inline-flex';
    document.getElementById('mgClaimBtn').style.display = 'none';
  }
  resultDiv.style.display = 'block';
}

function mgClaim() {
  unlockHint();
  hideMiniGame();
  if (typeof MG.onWin === 'function') MG.onWin();
}

function showMiniGame(onWinCallback) {
  const user = getCurrentUser();
  if (!user) {
    showAuthModal('login');
    showToast('Pro odemčení nápovědy se musíš přihlásit!', 'warn');
    return;
  }
  const overlay = document.getElementById('mgOverlay');
  overlay.classList.add('active');
  document.getElementById('mgResult').style.display = 'none';
  document.getElementById('mgRestartBtn').style.display = 'none';
  document.getElementById('mgClaimBtn').style.display = 'none';
  setTimeout(() => mgStart(onWinCallback), 100);
}

function hideMiniGame() {
  mgRunning = false;
  clearInterval(MG.timerInterval);
  cancelAnimationFrame(mgAnimId);
  document.getElementById('mgOverlay').classList.remove('active');
}

// Keyboard events
document.addEventListener('keydown', e => { MG.keys[e.key] = true; });
document.addEventListener('keyup',   e => { MG.keys[e.key] = false; });
