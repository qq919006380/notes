/**
 * Time-based greeting popup.
 * Shows a friendly message based on the current hour, only on home page.
 * Ported from IndexBigImg.vue: bgTimeColor() + addTip()
 */
(function () {
  // Inject tip styles
  var style = document.createElement('style');
  style.textContent =
    '.index-tip{position:fixed;display:flex;align-items:center;top:-60px;left:50%;opacity:0;min-width:320px;max-width:90vw;transform:translateX(-50%);transition:opacity .3s linear,top .4s ease;z-index:99999;padding:15px 15px 15px 20px;border:1px solid #ebeef5;border-radius:8px;line-height:17px;pointer-events:none;box-shadow:0 2px 12px rgba(0,0,0,0.1)}' +
    '.index-tip p{line-height:17px;margin:0;font-size:14px}' +
    '.tip-icon{margin-right:10px;line-height:17px}' +
    '.tip-info{background-color:#edf2fc;border-color:#ebeef5}' +
    '.tip-info .tip-info-content{color:#606266}' +
    '@media(max-width:640px){.index-tip{min-width:auto;width:90vw}}';
  document.head.appendChild(style);

  function addTip(content, type, startHeight, dieTime) {
    startHeight = startHeight || 70;
    dieTime = dieTime || 3000;

    var tips = document.querySelectorAll('.index-tip');
    var newTop;
    if (tips.length === 0) {
      newTop = startHeight;
    } else {
      var lastTip = tips[tips.length - 1];
      var lastTop = parseInt(lastTip.getAttribute('data-top') || String(startHeight));
      newTop = lastTop + lastTip.offsetHeight + 12;
    }

    var div = document.createElement('div');
    div.className = 'index-tip tip-' + type;
    div.style.top = '-60px';
    div.setAttribute('data-top', newTop);

    var icons = {
      info: 'icon-info',
      success: 'icon-dagouyouquan',
      danger: 'icon-cuowu',
      warning: 'icon-gantanhao'
    };

    div.innerHTML =
      '<i class="iconfont ' + (icons[type] || icons.info) + ' tip-icon"></i>' +
      '<p class="tip-' + type + '-content">' + content + '</p>';

    document.body.appendChild(div);

    setTimeout(function () {
      div.style.top = newTop + 'px';
      div.style.opacity = '1';
    }, 10);

    setTimeout(function () {
      div.style.top = '0px';
      div.style.opacity = '0';
      setTimeout(function () { div.remove(); }, 500);
    }, dieTime);
  }

  function showGreeting() {
    // Only show on home page
    if (window.location.pathname !== '/') return;

    var now = new Date();
    var hours = now.getHours();
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var seconds = String(now.getSeconds()).padStart(2, '0');
    var h = hours < 10 ? '0' + hours : hours;
    var time = h + ':' + minutes + ':' + seconds;

    var msg;
    if (hours >= 6 && hours < 12) {
      msg = '早上好呀~~，现在是 ' + time + '，吃早餐了吗？';
    } else if (hours >= 12 && hours < 16) {
      msg = '下午好呀~~，现在是 ' + time + '，繁忙的下午也要适当休息哦~~';
    } else if (hours >= 16 && hours < 19) {
      msg = '到黄昏了~~，现在是 ' + time + '，该准备吃饭啦~~';
    } else if (hours >= 19 && hours < 24) {
      msg = '晚上好呀~~，现在是 ' + time + '，该准备洗漱睡觉啦~~';
    } else {
      msg = '别再熬夜了~~，现在是 ' + time + '，早点睡吧~~';
    }

    addTip(msg, 'info', 50, 4000);
  }

  // Show after 1 second delay
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(showGreeting, 1000);
    });
  } else {
    setTimeout(showGreeting, 1000);
  }
})();
