/**
 * Reading progress bar.
 * Updates #reading-progress width based on scroll position.
 */
(function () {
  var bar = document.getElementById('reading-progress');
  if (!bar) return;

  var style = document.createElement('style');
  style.textContent = '#reading-progress{position:fixed;top:0;left:0;height:3px;background:var(--reading-progress-color,#b160ea);z-index:100000;transition:width .1s linear;width:0}';
  document.head.appendChild(style);

  window.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
})();
