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