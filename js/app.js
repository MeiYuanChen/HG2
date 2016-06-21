
window.onload = function() {


    var iid=Heng.getIid();
//获取微信用户信息
    var weixin_userinfo_api = "/api/weixin/userInfo";
    var weixinurl = Heng.options.base_url + weixin_userinfo_api + "?Authorization=" + Heng.getToken();// 请求微信用户信息地址
    var wxVm=new Vue({
        el: '#example',
        data:{
            msg:''
        },
        methods:{
            getData:function(){
                $.ajax({
                    type:'GET',
                    url:weixinurl,
                    success:function(data){
                        wxVm.msg=data;
                    }
                })
            }
        }
    });
    wxVm.getData();
    wxVm.$watch('msg', function (newVal, oldVal) {
        // 这个回调将在 `vm.a`  改变后调用
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
    });

};

