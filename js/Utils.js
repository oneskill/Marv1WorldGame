/**
 * Get a random number between range
 * @param {integer}
 * @param {integer}
 */
 function rand(low, high) {
  return Math.floor( Math.random() * (high - low + 1) + low );
}

/**
 * Bound a number between range
 * @param {integer} num - Number to bound
 * @param {integer}
 * @param {integer}
 */
 function bound(num, low, high) {
  return Math.max( Math.min(num, high), low);
}


/**
 * Get the type of a platform based on platform height
 * @return Type of platform
 */
 function getType() {
  var type;
  switch (platformHeight) {
    case 0:
    case 1:
    type = Math.random() > 0.5 ? 'grass1' : 'grass2';
    break;
    case 2:
    type = 'grass';
    break;
    case 3:
    type = 'box';
    break;
  }
  if (platformLength === 1 && platformHeight < 3 && rand(0, 3) === 0) {
    type = 'cliff';
  }

  return type;
}

/**
 * Request Animation Polyfill
 */
 var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback, element){
    window.setTimeout(callback, 1000 / 60);
  };
})();
