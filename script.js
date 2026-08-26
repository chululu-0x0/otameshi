const FRAME_SIZES = [8, 16, 32, 64];

const normalImages = {
  1: "./assets/frame/minidot-8-1.png",
  2: "./assets/frame/minidot-8-2.png",
  3: "./assets/frame/minidot-8-3.png",
  4: "./assets/frame/minidot-8-4.png",
  5: "./assets/frame/minidot-8-5.png",
  6: "./assets/frame/minidot-8-6.png",
  7: "./assets/frame/minidot-8-7.png",
  8: "./assets/frame/minidot-8-8.png",
  9: "./assets/frame/minidot-8-9.png",
};

/*
  比較用の角画像。
  1 = 左上
  3 = 右上
  7 = 左下
  9 = 右下

  今回は下記のファイル名で配置する前提です。

  minidot-8-2kado-1.png
  minidot-8-2kado-3.png
  minidot-8-2kado-7.png
  minidot-8-2kado-9.png
*/
const cornerImages = {
  1: "./assets/frame/minidot-8-2kado-1.png",
  3: "./assets/frame/minidot-8-2kado-3.png",
  7: "./assets/frame/minidot-8-2kado-7.png",
  9: "./assets/frame/minidot-8-2kado-9.png",
};

function getImageMap(useCornerVariant = false) {
  if (!useCornerVariant) {
    return normalImages;
  }

  return {
    ...normalImages,
    ...cornerImages,
  };
}

function createFrameTable(size, useCornerVariant = false) {
  const imageMap = getImageMap(useCornerVariant);
  const table = document.createElement("table");

  table.className = `pixel-frame size-${size}`;
  table.setAttribute("aria-label", `${size}px表示の3×3画像枠`);

  const tbody = document.createElement("tbody");

  for (let row = 0; row < 3; row += 1) {
    const tr = document.createElement("tr");

    for (let column = 0; column < 3; column += 1) {
      const number = row * 3 + column + 1;
      const td = document.createElement("td");
      const img = document.createElement("img");

      img.src = imageMap[number];
      img.alt = "";
      img.width = size;
      img.height = size;
      img.draggable = false;

      td.appendChild(img);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  return table;
}

function createComparisonCard(size, useCornerVariant = false) {
  const card = document.createElement("article");
  card.className = "frame-card";

  const label = document.createElement("div");
  label.className = "frame-card__label";

  const title = document.createElement("strong");
  title.textContent = `${size}px`;

  const scale = document.createElement("span");
  scale.textContent = size === 8 ? "原寸 ×1" : `整数倍 ×${size / 8}`;

  label.append(title, scale);

  const preview = document.createElement("div");
  preview.className = "frame-preview";
  preview.appendChild(createFrameTable(size, useCornerVariant));

  const info = document.createElement("p");
  info.className = "frame-card__info";
  info.textContent =
    `1マス ${size}px / テーブル全体 ${size * 3}px × ${size * 3}px`;

  card.append(label, preview, info);
  return card;
}

function renderFrames(targetId, useCornerVariant = false) {
  const target = document.getElementById(targetId);

  FRAME_SIZES.forEach((size) => {
    target.appendChild(createComparisonCard(size, useCornerVariant));
  });
}

renderFrames("normalFrames", false);
renderFrames("cornerFrames", true);
