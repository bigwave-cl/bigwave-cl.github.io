/*
 * @Author: askMeWhy
 * @Date:   2017-12-07 11:31:36
 * @Last Modified by:   bigWave
 * @Last Modified time: 2017-12-14 11:08:21
 */
console.log(location.href.split('#')[0]);
var jqxhr = $.ajax({
	url: 'http://192.168.1.100:3033/api/getWechat',
	type: "GET"
});
jqxhr.done(function(r) {
	wx.config({
	    debug: false,
	    appId: r.appid,
	    timestamp:  r.timestamp,
	    nonceStr: r.noncestr,
	    signature: r.signature,
	    jsApiList: [
	      'checkJsApi',
	      'onMenuShareTimeline',
	      'onMenuShareAppMessage',
	      'onMenuShareQQ',
	      'onMenuShareWeibo',
	      'onMenuShareQZone',
	      'hideMenuItems',
	      'showMenuItems',
	      'hideAllNonBaseMenuItem',
	      'showAllNonBaseMenuItem',
	      'translateVoice',
	      'startRecord',
	      'stopRecord',
	      'onVoiceRecordEnd',
	      'playVoice',
	      'onVoicePlayEnd',
	      'pauseVoice',
	      'stopVoice',
	      'uploadVoice',
	      'downloadVoice',
	      'chooseImage',
	      'previewImage',
	      'uploadImage',
	      'downloadImage',
	      'getNetworkType',
	      'openLocation',
	      'getLocation',
	      'hideOptionMenu',
	      'showOptionMenu',
	      'closeWindow',
	      'scanQRCode',
	      'chooseWXPay',
	      'openProductSpecificView',
	      'addCard',
	      'chooseCard',
	      'openCard'
	    ]
	});
	wx.ready(function() {
		alert('ready')
		// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
		document.querySelector('#checkJsApi').onclick = function() {
			wx.checkJsApi({
				jsApiList: [
					'startRecord',
					'stopRecord'
				],
				success: function(res) {
					console.log('233')
					alert(JSON.stringify(res));
				}
			});
		};

		// 2. 分享接口
		// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
		document.querySelector('#onMenuShareAppMessage').onclick = function () {
		  wx.onMenuShareAppMessage({
		    title: '互联网之子',
		    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
		    link: 'http://movie.douban.com/subject/25785114/',
		    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
		    trigger: function (res) {
		      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
		      alert('用户点击发送给朋友');
		    },
		    success: function (res) {
		      alert('已分享');
		    },
		    cancel: function (res) {
		      alert('已取消');
		    },
		    fail: function (res) {
		      alert(JSON.stringify(res));
		    }
		  });
		  alert('已注册获取“发送给朋友”状态事件');
		};

		// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
		document.querySelector('#onMenuShareTimeline').onclick = function () {
		  wx.onMenuShareTimeline({
		    title: '互联网之子',
		    link: 'http://movie.douban.com/subject/25785114/',
		    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
		    trigger: function (res) {
		      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
		      alert('用户点击分享到朋友圈');
		    },
		    success: function (res) {
		      alert('已分享');
		    },
		    cancel: function (res) {
		      alert('已取消');
		    },
		    fail: function (res) {
		      alert(JSON.stringify(res));
		    }
		  });
		  alert('已注册获取“分享到朋友圈”状态事件');
		};

		// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
		document.querySelector('#onMenuShareQQ').onclick = function () {
		  wx.onMenuShareQQ({
		    title: '互联网之子',
		    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
		    link: 'http://movie.douban.com/subject/25785114/',
		    imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
		    trigger: function (res) {
		      alert('用户点击分享到QQ');
		    },
		    complete: function (res) {
		      alert(JSON.stringify(res));
		    },
		    success: function (res) {
		      alert('已分享');
		    },
		    cancel: function (res) {
		      alert('已取消');
		    },
		    fail: function (res) {
		      alert(JSON.stringify(res));
		    }
		  });
		  alert('已注册获取“分享到 QQ”状态事件');
		};
		var voice = {
		    localId: '',
		    serverId: ''
		};
		// 4 音频接口
		// 4.2 开始录音
		document.querySelector('#startRecord').onclick = function() {
			wx.startRecord({
				cancel: function() {
					alert('用户拒绝授权录音');
				}
			});
		};

		// 4.3 停止录音
		document.querySelector('#stopRecord').onclick = function() {
			wx.stopRecord({
				success: function(res) {
					voice.localId = res.localId;
				},
				fail: function(res) {
					alert(JSON.stringify(res));
				}
			});
		};

		// 4.4 监听录音自动停止
		wx.onVoiceRecordEnd({
			complete: function(res) {
				voice.localId = res.localId;
				alert('录音时间已超过一分钟');
			}
		});

		// 4.5 播放音频
		document.querySelector('#playVoice').onclick = function() {
			if (voice.localId == '') {
				alert('请先使用 startRecord 接口录制一段声音');
				return;
			}
			wx.playVoice({
				localId: voice.localId
			});
		};

		// 4.6 暂停播放音频
		document.querySelector('#pauseVoice').onclick = function() {
			wx.pauseVoice({
				localId: voice.localId
			});
		};

		// 4.7 停止播放音频
		document.querySelector('#stopVoice').onclick = function() {
			wx.stopVoice({
				localId: voice.localId
			});
		};

		// 4.8 监听录音播放停止
		wx.onVoicePlayEnd({
			complete: function(res) {
				alert('录音（' + res.localId + '）播放结束');
			}
		});

		// 4.8 上传语音
		document.querySelector('#uploadVoice').onclick = function() {
			if (voice.localId == '') {
				alert('请先使用 startRecord 接口录制一段声音');
				return;
			}
			wx.uploadVoice({
				localId: voice.localId,
				success: function(res) {
					alert('上传语音成功，serverId 为' + res.serverId);
					voice.serverId = res.serverId;
				}
			});
		};

		// 4.9 下载语音
		document.querySelector('#downloadVoice').onclick = function() {
			if (voice.serverId == '') {
				alert('请先使用 uploadVoice 上传声音');
				return;
			}
			wx.downloadVoice({
				serverId: voice.serverId,
				success: function(res) {
					alert('下载语音成功，localId 为' + res.localId);
					voice.localId = res.localId;
				}
			});
		};
	});

	wx.error(function(res) {
		alert(JSON.stringify(res.errMsg));
	});
});
jqxhr.fail(function(r) {
	alert(JSON.stringify(r));
});
