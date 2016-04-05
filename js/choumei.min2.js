
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




window.onload = function() {

    setTimeout(function(){

        var mySwiper = new Swiper(".swiper-container", {
            slidesPerView: "auto",
            centeredSlides: !0,
            watchSlidesProgress: !0,
            pagination: ".swiper-pagination",
            paginationClickable: !0,

            onProgress: function(a) {
                var b, c, d;
                for (b = 0; b < a.slides.length; b++) c = a.slides[b],
                    d = c.progress,
                    scale = 1 - Math.min(Math.abs(.2 * d), 1),
                    es = c.style,
                    es.opacity = 1 - Math.min(Math.abs(d / 2), 1),
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(4px,0," + -Math.abs(120 * d) + "px)"
            },
            onSetTransition: function(a, b) {
                for (var c = 0; c < a.slides.length; c++) es = a.slides[c].style,
                    es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
            }
        });

    },1000);


};



