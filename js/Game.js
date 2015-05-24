function init(){ // Main init
  startGame();
}
$('.restart').click(function() {
  $('#game-over').hide();
  startGame();
});

/**
 * Start the game - reset all variables and entities, spawn ground and Fire.
 */
 function startGame() {
  document.getElementById('game-over').style.display = 'none';
  ground = [];
  environment = [];
  enemies = [];
  player.reset();
  ticker = 0;
  stop = false;
  score = 0;
  platformHeight = 2;
  platformLength = 15;
  gapLength = 0;

  ctx.font = '16px arial, sans-serif';

  for (var i = 0; i < 30; i++) {
    ground.push(new Sprite(i * (platformWidth-3), platformBase - platformHeight * platformSpacer, 'grass'));
  }
  background.reset();
  GameLoop();
}

/**
 * End the game and restart
 */
 function gameOver() {
  stop = true;
  $('#score').html(score);
  $('#game-over').show();
}