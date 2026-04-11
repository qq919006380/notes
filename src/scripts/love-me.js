/**
 * Love-me click effect: shows floating hearts on mouse click.
 * Ported from docs/.vuepress/plugins/love-me/love-me.js
 */
(function (window, document) {
  var hearts = [];

  // Inject heart CSS
  var style = document.createElement('style');
  style.textContent =
    '.love-heart{width:10px;height:10px;position:fixed;left:0;top:0;background:#f00;transform:rotate(45deg);pointer-events:none;will-change:transform,opacity}' +
    '.love-heart::after,.love-heart::before{content:"";width:inherit;height:inherit;background:inherit;border-radius:50%;position:absolute}' +
    '.love-heart::after{top:-5px}' +
    '.love-heart::before{left:-5px}';
  document.head.appendChild(style);

  function randomColor() {
    return 'rgb(' + ~~(255 * Math.random()) + ',' + ~~(255 * Math.random()) + ',' + ~~(255 * Math.random()) + ')';
  }

  function createHeart(e) {
    var heart = document.createElement('div');
    heart.className = 'love-heart';
    hearts.push({
      el: heart,
      x: e.clientX - 5,
      y: e.clientY - 5,
      scale: 1,
      alpha: 1,
      color: randomColor()
    });
    document.body.appendChild(heart);
  }

  var animating = false;
  function render() {
    for (var i = hearts.length - 1; i >= 0; i--) {
      var h = hearts[i];
      if (h.alpha <= 0) {
        h.el.remove();
        hearts.splice(i, 1);
      } else {
        h.y--;
        h.scale += 0.004;
        h.alpha -= 0.013;
        h.el.style.cssText =
          'opacity:' + h.alpha +
          ';transform:translate(' + h.x + 'px,' + h.y + 'px) scale(' + h.scale + ',' + h.scale + ') rotate(45deg)' +
          ';background:' + h.color +
          ';z-index:99999';
      }
    }
    if (hearts.length > 0) {
      requestAnimationFrame(render);
    } else {
      animating = false;
    }
  }

  document.addEventListener('click', function(e) {
    createHeart(e);
    if (!animating) {
      animating = true;
      requestAnimationFrame(render);
    }
  });
})(window, document);
