
/**
 * Created by WZJS-CMY on 16/3/22.
 */
//需要扫码
var app=angular.module('myApp',[]);
var iid=Heng.getIid();
//获取微信用户信息
var weixin_userinfo_api = "/api/weixin/userInfo";
var url = Heng.options.base_url + weixin_userinfo_api + "?Authorization=" + Heng.getToken();// 请求微信用户信息地址
app.controller('weixin',function($scope,$http){
    WXConfig('5693024816932578630');
    $http.get(url).success(
        function(response) {
            $scope.data=response.Result;
        }
    );

});

//6个话题信息
var theme_page_six_api = "/api/heng/getThemePage?pageIndex=1&pageSize=6";
var theme_page_six_url = Heng.options.base_url + theme_page_six_api + "&Authorization=" + Heng.getToken();// 请求微信用户信息地址
app.controller('themepagesix',function($scope,$http){
    setTimeout(function(){
        $http.get(theme_page_six_url).success(function(response){$scope.list=response.List;});
    },100);
    $http.get(theme_page_six_url).success(function(response){$scope.list=response.List;});
});
//最后一个链接
app.controller("lasthref",function($scope,$http){
    $scope.lh="token=" + Heng.getToken();

    //更新阅读数
    $scope.updateReadTimes=function(themeid){
        $scope.addreadtimesCount=1;
        var readtimes_url=Heng.options.base_url+"/api/heng/updateReadTimes?themeId="+themeid+"&Authorization=" + Heng.getToken();// 请求微信用户信息地址
        $http.get(readtimes_url).success(function(response){


        }).error(function(e){

        });
    };
});
//获取微信用户未读回复数量（总）
var unreadInfo_api="/api/heng/getUnreadInfo";
var unreadInfo_url=Heng.options.base_url + unreadInfo_api + "?Authorization=" + Heng.getToken();// 请求微信用户信息地址
app.controller('unreadInfo',function($scope,$http){
    setTimeout(function(){
        $http.get(unreadInfo_url).success(function(response){$scope.unread=response.Result;});
    },100);
    $http.get(unreadInfo_url).success(function(response){$scope.unread=response.Result;});
});
//所有话题信息
var alltheme_list_api = "/api/heng/getAllThemeList";
var alltheme_list_url = Heng.options.base_url + alltheme_list_api + "?Authorization=" + Heng.getToken();// 请求微信用户信息地址
app.controller('allthemelist',function($scope,$http){
    setTimeout(function(){
        $http.get(alltheme_list_url).success(function(response){$scope.alllist=response.List;});
    },100);
    $http.get(alltheme_list_url).success(function(response){$scope.alllist=response.List;});
});

//当前话题信息

var theme_info_api = "/api/heng/getThemeInfo/"+iid;
var theme_info_url = Heng.options.base_url + theme_info_api + "?Authorization=" + Heng.getToken();// 请求微信用户信息地址
app.controller('themeinfo',function($scope,$http){


    //$http.get("http://meiyuanchen.github.io/hg/js/themeinfo.json").success(function(response){$scope.info=response.Result;});
    $http.get(theme_info_url).success(function(response){$scope.info=response.Result;});
    setInterval(function(){
        $http.get(theme_info_url).success(function(response){$scope.info=response.Result;});
    },5000);
});
//html转义
app.filter("trustHtml",function($sce){
    return function (input){
        return $sce.trustAsHtml(input);
    }
});



//获取评论
var startcommentpage=1;
var endcommentpage=100;
var comment_page_api = "/api/heng/getCommentPage?themeId="+iid+"&pageIndex="+startcommentpage+"&pageSize="+endcommentpage;
var comment_page_url = Heng.options.base_url + comment_page_api + "&Authorization=" + Heng.getToken();// 请求微信用户信息地址
app.controller('commentpage',function($scope,$http){
    var postCommentdiv=angular.element(".postComment");
    var inputtext=angular.element("input");
    var focu=function(){
        inputtext.focus();
        postCommentdiv.css({"z-index":"9"});
    };
    inputtext.on("focus",function(){
        postCommentdiv.css({"z-index":"9"});
    });

    //input text placeholder内容
    $scope.placeholder="我来说说～";
    var cmyname,cmytype=0,cmyRid=0,cmyCid=0;
    $scope.inputPlace=function(name,type,Rid,Cid){
        focu();
        postCommentdiv.css({"z-index":"9"});
        $scope.placeholder="回复"+name;
        if(type=="type0"){
            type=0;
        }else{
            type=1;
        }
        console.log("name:" + name + ",type:" + type + ",Rid:" + Rid+ ",Cid:" + Cid);
        cmyname=name;
        cmytype=type;
        cmyRid=Rid;
        cmyCid=Cid;
    };
    //post数据  发布按钮
    $scope.sub=function(inputtext,infoid){
        var error=angular.element("#formerror");
        var success=angular.element("#formsuccess");
        if(!inputtext){

            error.fadeIn("slow");
            setTimeout(function(){
                error.fadeOut("slow");
            },3000);
            return false;
        }
        var contentform_url=Heng.options.base_url+"/api/heng/updateComment"+"?Authorization="+Heng.getToken();
        var contentform_add={
            "ThemeId":infoid,
            "CommentId":cmyCid,
            "RelationId":cmyRid,
            "Content":inputtext,
            "Type": cmytype,
            "IsHide": false
        };
        $http({
            method:"POST",
            url:contentform_url,
            data:contentform_add,
            headers:{ 'Content-Type': 'application/json'}
        }).success(function(){
            success.fadeIn("slow");
            setTimeout(function(){
                success.fadeOut("slow");
            },3000);
            console.log("发布评论");
            postCommentdiv.css({"z-index":"2"});
            setTimeout(function(){
                $http.get(comment_page_url).success(function(response){
                    $scope.commentlist=response.List;
                    $scope.count=response.Count;
                    console.log("cmy");
                });
            },10);

            $scope.inputtext="";//文本框text删掉
            $scope.placeholder="我来说说～";

        }).error(function(res){
            setTimeout(console.log("更新失败"+res),500);
            console.log("a");
        });
    };

    //加载更多
    $scope.readMore=function(){
        endcommentpage=endcommentpage+100;

        comment_page_api = "/api/heng/getCommentPage?themeId="+iid+"&pageIndex="+startcommentpage+"&pageSize="+endcommentpage;
        comment_page_url = Heng.options.base_url + comment_page_api + "&Authorization=" + Heng.getToken();
        setTimeout(function(){
            $http.get(comment_page_url).success(function(response){
                $scope.commentlist=response.List;
                $scope.count=response.Count;
                console.log($scope.count);
                console.log(endcommentpage);
                var hided=$scope.count-endcommentpage;
                if(hided<0){
                    angular.element(".seeMore").hide();
                }
            });
        },500);

    };
    //$http.get("http://192.168.9.11:4040/cmyHg/js/comment.json").success(function(response){$scope.commentlist=response.List;});
        $http.get(comment_page_url).success(function(response){

            $scope.commentlist=response.List;
            $scope.count=response.Count;

        });


});
//我的话题信息
var mytheme_list_api = "/api/heng/getMyThemeList";
var mytheme_list_url = Heng.options.base_url + mytheme_list_api + "?Authorization=" + Heng.getToken();// 请求微信用户信息地址
app.controller('mythemelist',function($scope,$http){
    //清零当前话题未读信息条数
    $scope.updateUnread=function(mythemeid,UnreadCount){
        var unread_url=Heng.options.base_url + "/api/heng/updateUnread?themeId="+mythemeid + "&Authorization=" + Heng.getToken();// 请求微信用户信息地址
        $http.get(unread_url).success(function(response){

                $http.get(mytheme_list_url).success(function(response){$scope.mylist=response.List;$scope.count=response.Count;});


        });
    };

    setTimeout(function(){
        $http.get(mytheme_list_url).success(function(response){$scope.mylist=response.List;});
    },10);
});
//获取我的评论
var mycomment_list_api = "/api/heng/getMyCommentList?themeId="+iid;
var mycomment_list_url = Heng.options.base_url + mycomment_list_api + "&Authorization=" + Heng.getToken();// 请求微信用户信息地址
app.controller('mycommentlistCtrl',function($scope,$http){
    var postCommentdiv=angular.element(".postComment");
    var inputtext=angular.element("input");
    var focu=function(){
        inputtext.focus();
        postCommentdiv.css({"z-index":"9"});
    };
    inputtext.on("focus",function(){
        postCommentdiv.css({"z-index":"9"});
    });

    //input text placeholder内容
    $scope.placeholder="我来说说～";
    var cmyname,cmytype=0,cmyRid=0,cmyCid=0;
    $scope.inputPlace=function(name,type,Rid,Cid){
        focu();
        postCommentdiv.css({"z-index":"9"});
        $scope.placeholder="回复"+name;
        var inputtext=angular.element("input");
        inputtext.focus();
        if(type=="type0"){
            type=0;
        }else{
            type=1;
        }
        console.log("name:" + name + ",type:" + type + ",Rid:" + Rid+ ",Cid:" + Cid);
        cmyname=name;
        cmytype=type;
        cmyRid=Rid;
        cmyCid=Cid;
    };
    //post数据  发布按钮
    $scope.sub=function(inputtext,infoid){
        var error=angular.element("#formerror");
        var success=angular.element("#formsuccess");
        if(!inputtext){

            error.fadeIn("slow");
            setTimeout(function(){
                error.fadeOut("slow");
            },3000);
            return false;
        }
        var contentform_url=Heng.options.base_url+"/api/heng/updateComment"+"?Authorization="+Heng.getToken();
        var contentform_add={
            "ThemeId":infoid,
            "CommentId":cmyCid,
            "RelationId":cmyRid,
            "Content":inputtext,
            "Type": cmytype,
            "IsHide": false
        };
        $http({
            method:"POST",
            url:contentform_url,
            data:contentform_add,
            headers:{ 'Content-Type': 'application/json'}
        }).success(function(){
            console.log("发布评论");
            postCommentdiv.css({"z-index":"2"});
            setTimeout(function(){
                $http.get(mycomment_list_url).success(function(response){
                    $scope.mycommentlist=response.List;
                });
            },10);

            $scope.inputtext="";//文本框text删掉
            $scope.placeholder="我来说说～";

        }).error(function(res){
            setTimeout(console.log("更新失败"+res),500);
            console.log("a");
        });
    };
    //$http.get("http://meiyuanchen.github.io/hg/js/comment.json").success(function(response){$scope.commentlist=response.List;});
    $http.get(mycomment_list_url).success(function(response){
        $scope.mycommentlist=response.List;

    });


});

//点赞
app.controller("praise",function($scope,$http){
    var like=angular.element(".like");
    like.on("click",function(){
        var add=$(this).find(".add");
        add.css("-webkit-animation-play-state","running");
    });
    $scope.updatePraise=function(id){


      var url= Heng.options.base_url + "/api/heng/updatePraise?commentId="+id+"&Authorization=" + Heng.getToken();
        $http.get(url).success(function(response){
            $scope.addpraise=1;
            console.log("a"+response);

        });
    };
});

//微信分享
var title = '恒哥有话说';
var description = '恒哥有话说';
var logo = 'http://site.jxt189.com/nledu/images/HGshare.jpg';

var sharedLink = 'http://weixin.jxt189.com/WeiEngine/OAuth2/Authorization.aspx?appcode=5693024816932578630&type=snsapi_base&redirect_uri=http%3a%2f%2fhd.jxt189.com%2fheng2%2fsignin-weixinauth%3fredirectUri%3dhttp%253a%252f%252fhd.jxt189.com%252fheng2%252fAdmin%252fWeixin%252fAuthorize%253fredirectUri%253dhttp%253a%252f%252fhd.jxt189.com%252fheng2%252fHg%252findex.html';


wx.ready(function () {
    var wechatShareUri = {
        title: title,
        desc: description,
        link: sharedLink,
        imgUrl: logo
    };
    var momentsShareUri = {
        title: title,
        desc: description,
        link: sharedLink,
        imgUrl: logo
    };
    wx.onMenuShareAppMessage(wechatShareUri);
    wx.onMenuShareTimeline(momentsShareUri);
    HideMenuItems();
});

$(function () {
    WXConfig('5693024816932578630');
});




