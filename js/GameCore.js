// define variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var player, score, stop, ticker;
var ground = [], water = [], enemies = [], environment = [];

// platform variables
var platformHeight, platformLength, gapLength;
var platformWidth = 32;
var platformBase = canvas.height - platformWidth;  
var platformSpacer = 64;

 function GameLoop() { // Main Loop of the game
  if (!stop) {
    requestAnimFrame( GameLoop );
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.draw();

    // update entities
    updateEnvironment();
    updatePlayer();
    updateGround();
    updateEnemies();

    // draw the score
    ctx.fillText('Actual Score: ' + score + 'm', canvas.width - 140, 30);

    // spawn a new Sprite
    if (ticker % Math.floor(platformWidth / player.speed) === 0) {
      spawnSprites();
    }

    if (ticker > (Math.floor(platformWidth / player.speed) * player.speed * 20) && player.dy !== 0) {
      player.speed = bound(++player.speed, 0, 15);
      player.walkAnim.frameSpeed = Math.floor(platformWidth / player.speed) - 1;

      // reset ticker
      ticker = 0;

      // spawn a platform to fill in gap created by increasing player speed
      if (gapLength === 0) {
        var type = getType();
        ground.push(new Sprite(
          canvas.width + platformWidth % player.speed,
          platformBase - platformHeight * platformSpacer,
          type
          ));
        platformLength--;
      }
    }
    ticker++;
  }
}

window.onload = init; // Launch init when the window is load
assetLoader.downloadAll();
