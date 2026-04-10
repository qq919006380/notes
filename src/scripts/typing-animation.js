/**
 * Typing animation for banner description.
 * Text fades in char-by-char, pauses, then fades out char-by-char, looping.
 * Ported from IndexBigImg.vue: textFadeInAndOut()
 */
(function () {
  var desc = ['Hello world!'];
  var fadeInTime = 200;
  var fadeOutTime = 100;
  var nextTime = 800;

  function init() {
    var descEl = document.getElementById('banner-description');
    if (!descEl) return;

    var textSpan = descEl.querySelector('span:first-child');
    var cursor = descEl.querySelector('.typed');
    if (!textSpan || !cursor) return;

    var descIndex = 0;
    var charIndex = 0;
    var currentText = desc[descIndex];
    var fadeInInterval = setInterval(fadeIn, fadeInTime);
    var fadeOutInterval;

    function fadeIn() {
      cursor.style.animation = 'none';
      textSpan.textContent = currentText.substring(0, charIndex++);
      if (charIndex > currentText.length) {
        clearInterval(fadeInInterval);
        cursor.style.animation = 'typedBlink 1s infinite';
        setTimeout(function () {
          charIndex = currentText.length;
          fadeOutInterval = setInterval(fadeOut, fadeOutTime);
        }, nextTime);
      }
    }

    function fadeOut() {
      if (charIndex >= 0) {
        cursor.style.animation = 'none';
        textSpan.textContent = currentText.substring(0, charIndex--);
      } else {
        clearInterval(fadeOutInterval);
        cursor.style.animation = 'typedBlink 1s infinite';
        setTimeout(function () {
          descIndex = (descIndex + 1) % desc.length;
          currentText = desc[descIndex];
          charIndex = 0;
          fadeInInterval = setInterval(fadeIn, fadeInTime);
        }, nextTime);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
