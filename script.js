const marbleOrb = document.getElementById("marbleOrb");
const marbleLayers = [...marbleOrb.querySelectorAll(".marble-layer")];
const toggleButton = document.getElementById("toggleAnimation");
const shuffleButton = document.getElementById("shuffleMarble");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let paused = false;
let marbleTimer = null;

/**
 * 指定レイヤーに、毎回少し違う位置・角度・大きさを設定します。
 * CSSのtransitionが、現在位置から新しい位置まで滑らかに補間します。
 */
function randomizeLayer(layer, index) {
  const x = random(-24, 24);
  const y = random(-24, 24);
  const rotate = random(-170, 170);
  const scale = random(0.88, 1.22);

  // 各層がまったく同じ動きをしないよう、少し係数を変える
  const direction = index % 2 === 0 ? 1 : -1;

  layer.style.setProperty("--move-time", `${random(3.6, 6.8).toFixed(2)}s`);
  layer.style.transform = `
    translate(${(x * direction).toFixed(1)}px, ${(y * direction).toFixed(1)}px)
    rotate(${(rotate * direction).toFixed(1)}deg)
    scale(${scale.toFixed(2)})
  `;

  layer.style.borderRadius = [
    `${random(35, 65).toFixed(0)}%`,
    `${random(35, 65).toFixed(0)}%`,
    `${random(35, 65).toFixed(0)}%`,
    `${random(35, 65).toFixed(0)}%`
  ].join(" ");
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function shuffleMarble() {
  marbleLayers.forEach(randomizeLayer);
}

function scheduleNextMarbleMove() {
  if (reduceMotion || paused) return;

  clearTimeout(marbleTimer);

  marbleTimer = setTimeout(() => {
    shuffleMarble();
    scheduleNextMarbleMove();
  }, random(2600, 4800));
}

function startMarble() {
  if (reduceMotion) return;

  shuffleMarble();
  scheduleNextMarbleMove();
}

function stopMarble() {
  clearTimeout(marbleTimer);
  marbleTimer = null;
}

toggleButton.addEventListener("click", () => {
  paused = !paused;

  document.body.classList.toggle("animations-paused", paused);
  toggleButton.textContent = paused ? "再生する" : "一時停止";

  if (paused) {
    stopMarble();
  } else {
    scheduleNextMarbleMove();
  }
});

shuffleButton.addEventListener("click", () => {
  if (paused || reduceMotion) return;
  shuffleMarble();
  scheduleNextMarbleMove();
});

if (reduceMotion) {
  toggleButton.disabled = true;
  toggleButton.textContent = "端末設定で動きを軽減中";
  shuffleButton.disabled = true;
} else {
  startMarble();
}
