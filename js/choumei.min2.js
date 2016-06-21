
//响应式 改变html字体大小
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return;
            } else if (clientWidth > 720) {
                docEl.style.fontSize = 45 + 'px';
            } else if (clientWidth < 320) {
                docEl.style.fontSize = 20 + 'px';
            } else if (clientWidth < 720 || clientWidth > 320) {
                docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})
(document, window);







