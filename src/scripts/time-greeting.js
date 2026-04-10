/**
 * Time-based greeting popup.
 * Shows a friendly message based on the current hour, only on home page.
 * Ported from IndexBigImg.vue: bgTimeColor() + addTip()
 */
(function () {
  // Inject tip styles
  var style = document.createElement('style');
  style.textContent =
    '.index-tip{position:fixed;display:flex;align-items:center;top:-10px;left:50%;opacity:0;min-width:320px;transform:translateX(-50%);transition:opacity .3s linear,top .4s;z-index:99999;padding:15px 15px 15px 20px;border:1px solid #ebeef5;border-radius:4px;line-height:17px;pointer-events:none}' +
    '.index-tip p{line-height:17px;margin:0;font-size:14px}' +
    '.tip-icon{margin-right:10px;line-height:17px}' +
    '.tip-info{background-color:#edf2fc;border-color:#ebeef5}' +
    '.tip-info .tip-info-content{color:#909399}' +
    '@media(max-width:640px){.index-tip{min-width:auto;width:90vw}}';
  document.head.appendChild(style);

  function addTip(content, type, startHeight, dieTime) {
    startHeight = startHeight || 50;
    dieTime = dieTime || 3000;

    var tips = document.querySelectorAll('.index-tip');
    var lastTop = tips.length === 0
      ? 0
      : parseInt(tips[tips.length - 1].getAttribute('data-top') || '0');
    var newTop = lastTop + (tips.length !== 0
      ? tips[tips.length - 1].offsetHeight + 17
      : startHeight);

    var div = document.createElement('div');
    div.className = 'index-tip tip-' + type;
    div.style.top = lastTop + 'px';
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
      msg = '\u65e9\u4e0a\u597d\u5440~~\uff0c\u73b0\u5728\u662f ' + time + '\uff0c\u5403\u65e9\u9910\u4e86\u5417\uff1f';
    } else if (hours >= 12 && hours < 16) {
      msg = '\u4e0b\u5348\u597d\u5440~~\uff0c\u73b0\u5728\u662f ' + time + '\uff0c\u7e41\u5fd9\u7684\u4e0b\u5348\u4e5f\u8981\u9002\u5f53\u4f11\u606f\u54e6~~';
    } else if (hours >= 16 && hours < 19) {
      msg = '\u5230\u9ec4\u660f\u4e86~~\uff0c\u73b0\u5728\u662f ' + time + '\uff0c\u8be5\u51c6\u5907\u5403\u996d\u5566~~';
    } else if (hours >= 19 && hours < 24) {
      msg = '\u665a\u4e0a\u597d\u5440~~\uff0c\u73b0\u5728\u662f ' + time + '\uff0c\u8be5\u51c6\u5907\u6d17\u6f31\u7761\u89c9\u5566~~';
    } else {
      msg = '\u522b\u518d\u71ac\u591c\u4e86~~\uff0c\u73b0\u5728\u662f ' + time + '\uff0c\u65e9\u70b9\u7761\u5427~~';
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
