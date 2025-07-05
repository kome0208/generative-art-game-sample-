let player;
let enemies = [];
let enemySpeed = 15;

let gameStartedAt;
let gameClearTime = 30000;
let gameOver = false;
let gameClear = false;

function preload() {
  preloadAssets(); // objects.jsから
}

function setup() {
  createCanvas(400, 600);

  setupFrames(bagSprite, bagFrames);
  setupFrames(canSprite, canFrames);
  setupFrames(spannerSprite, spannerFrames);

  player = new Player();
  gameStartedAt = millis();
}

function draw() {
  clear(); // 背景を透明に

  drawLanes();

  if (gameOver) {
    showText("Game Over", color(255, 0, 0));
    return;
  }

  if (!gameClear && millis() - gameStartedAt >= gameClearTime) {
    gameClear = true;
  }

  if (gameClear) {
    showText("Game Clear!!", color(0, 255, 255));
    return;
  }

  player.show();

  // 敵生成
  if (frameCount % 20 === 0) {
    let type = random(["can", "spanner"]);
    enemies.push(new Enemy(type));
  }

  // 敵表示・移動・判定
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update();
    enemies[i].show();
    if (enemies[i].isColliding(player)) {
      gameOver = true;
    }
    if (enemies[i].y > height + 40) {
      enemies.splice(i, 1);
    }
  }

  drawTimer();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    player.moveRight();
  }
}

function drawLanes() {
  stroke(255, 0, 0); // レーンを赤で表示
  strokeWeight(2);
  for (let i = 1; i < 4; i++) {
    let x = i * width / 4;
    line(x, 0, x, height);
  }
}

function showText(txt, col) {
  fill(col);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(txt, width / 2, height / 2);
}

function drawTimer() {
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  let remaining = max(0, ceil((gameClearTime - (millis() - gameStartedAt)) / 1000));
  text("残り: " + remaining + " 秒", 10, 10);
}


