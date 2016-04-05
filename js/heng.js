
var Heng = {
	options: {
		// 接口域名基地址
		base_url: "http://weixin.jxt189.com/WeiEngine/OAuth2/Authorization.aspx?appcode=5693024816932578630&type=snsapi_base&redirect_uri=http%3a%2f%2fhd.jxt189.com%2fheng2%2fsignin-weixinauth%3fredirectUri%3dhttp%253a%252f%252fhd.jxt189.com%252fheng2%252fAdmin%252fWeixin%252fAuthorize%253fredirectUri%253dhttp%253a%252f%252fmeiyuanchen.github.io%252fHG2%252f"
	},
	// 提取#后面的token
	getParam: function(strParame) {
		var args = new Object();
		var query = location.hash.substring(1);

		var pairs = query.split("&"); // Break at ampersand
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var argname = pairs[i].substring(0, pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[argname] = value;
		}
		return args[strParame];
	},
	// 从本地浏览器提取token
	getToken: function() {
		return window.localStorage.getItem("token");
	},
	getTokents: function() {
		return window.localStorage.getItem("tokents");
	},
	getIid:function(){
		return this.getParam("iid");
	},
	// 写入token到浏览器
	setToken: function() {
		window.localStorage.setItem("token", this.getParam("token"));
		window.localStorage.setItem("tokents",Date.parse(new Date()));
	}
}

Heng.setToken();

//响应式 改变html字体大小
(function (doc, win) {
	var like=angular.element(".like");
	var add=like.find(".add");
	add.css("-webkit-animation-play-state","paused");


	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) {
				return;
			}
			else if(clientWidth>720)
			{
				docEl.style.fontSize = 45 + 'px';
			}
			else if(clientWidth<320 )
			{
				docEl.style.fontSize = 20 + 'px';
			}
			else if(clientWidth<720 || clientWidth>320)
			{
				docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
			}
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})
(document, window);