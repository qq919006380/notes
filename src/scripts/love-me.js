/**
 * Love-me click effect: shows floating hearts on mouse click.
 * Ported from docs/.vuepress/plugins/love-me/love-me.js
 */
(function (window, document) {
  var hearts = [];

  // Inject heart CSS
  var style = document.createElement('style');
  style.textContent =
    '.love-heart{width:10px;height:10px;position:fixed;background:#f00;transform:rotate(45deg);pointer-events:none}' +
    '.love-heart::after,.love-heart::before{content:"";width:inherit;height:inherit;background:inherit;border-radius:50%;position:fixed}' +
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
          'left:' + h.x + 'px;top:' + h.y + 'px;opacity:' + h.alpha +
          ';transform:scale(' + h.scale + ',' + h.scale + ') rotate(45deg);background:' + h.color +
          ';z-index:99999';
      }
    }
    requestAnimationFrame(render);
  }

  document.addEventListener('click', createHeart);
  render();
})(window, document);
