/**
 * Update all ground position and draw. Also check for collision against the player.
 */
 function updateGround() {
  // animate ground
  player.isFalling = true;
  for (var i = 0; i < ground.length; i++) {
    ground[i].update();
    ground[i].draw();

    // stop the player from falling when landing on a platform
    var angle;
    if (player.minDist(ground[i]) <= player.height/2 + platformWidth/2 &&
      (angle = Math.atan2(player.y - ground[i].y, player.x - ground[i].x) * 180/Math.PI) > -130 &&
      angle < -50) {
      player.isJumping = false;
    player.isFalling = false;
    player.y = ground[i].y - player.height + 5;
    player.dy = 0;
  }
}

  // remove ground that have gone off screen
  if (ground[0] && ground[0].x < -platformWidth) {
    ground.splice(0, 1);
  }
}

/**
 * Update all environment position and draw.
 */
 function updateEnvironment() {
  // animate environment
  for (var i = 0; i < environment.length; i++) {
    environment[i].update();
    environment[i].draw();
  }

  // remove environment that have gone off screen
  if (environment[0] && environment[0].x < -platformWidth) {
    environment.splice(0, 1);
  }
}

/**
 * Update all enemies position and draw. Also check for collision against the player.
 */
 function updateEnemies() {
  // animate enemies
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();

    // player ran into enemy
    if (player.minDist(enemies[i]) <= player.width - platformWidth/2) {
      gameOver();
    }
  }

  // remove enemies that have gone off screen
  if (enemies[0] && enemies[0].x < -platformWidth) {
    enemies.splice(0, 1);
  }
}

/**
 * Spawn new sprites off screen
 */
 function spawnSprites() {
  // increase score
  score++;

  // first create a gap
  if (gapLength > 0) {
    gapLength--;
  }
  // then create ground
  else if (platformLength > 0) {
    var type = getType();

    ground.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase - platformHeight * platformSpacer,
      type
      ));
    platformLength--;

    // add random enemies
    spawnEnemySprites();
  }
  // start over
  else {
    // increase gap length every speed increase of 4
    gapLength = rand(player.speed - 2, player.speed);
    // only allow a ground to increase by 1
    platformHeight = bound(rand(0, platformHeight + rand(0, 2)), 0, 4);
    platformLength = rand(Math.floor(player.speed/2), player.speed * 4);
  }
}

/**
 * Spawn new enemy sprites off screen
 */
 function spawnEnemySprites() {
  if (score > 100 && Math.random() > 0.96 && enemies.length < 3 && platformLength > 5 &&
    (enemies.length ? canvas.width - enemies[enemies.length-1].x >= platformWidth * 3 ||
     canvas.width - enemies[enemies.length-1].x < platformWidth : true)) {
    enemies.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase - platformHeight * platformSpacer - platformWidth,
      Math.random() > 0.5 ? 'spikes' : 'slime'
      ));
}
}