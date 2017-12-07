/*
* @Author: askMeWhy
* @Date:   2017-12-07 11:31:36
* @Last Modified by:   bigWave
* @Last Modified time: 2017-12-07 11:56:22
*/

var jqxhr = $.ajax({
    url: 'http://192.168.1.102:3033/api/getWechat',
    type: "GET"
});
jqxhr.done(function(r){
    console.log(r);
    wx.config({
        debug: false,
        appId: r.appid,
        timestamp: r.timestamp,
        nonceStr: r.noncestr,
        signature: r.signature,
        jsApiList: [
            'checkJsApi',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice'
        ]
    });
    wx.ready(function () {
      // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
      document.querySelector('#checkJsApi').onclick = function () {
        wx.checkJsApi({
          jsApiList: [
            'getNetworkType',
            'previewImage'
          ],
          success: function (res) {
            alert(JSON.stringify(res));
          }
        });
      };
      // 4 音频接口
      // 4.2 开始录音
      document.querySelector('#startRecord').onclick = function () {
        wx.startRecord({
          cancel: function () {
            alert('用户拒绝授权录音');
          }
        });
      };

      // 4.3 停止录音
      document.querySelector('#stopRecord').onclick = function () {
        wx.stopRecord({
          success: function (res) {
            voice.localId = res.localId;
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      };

      // 4.4 监听录音自动停止
      wx.onVoiceRecordEnd({
        complete: function (res) {
          voice.localId = res.localId;
          alert('录音时间已超过一分钟');
        }
      });

      // 4.5 播放音频
      document.querySelector('#playVoice').onclick = function () {
        if (voice.localId == '') {
          alert('请先使用 startRecord 接口录制一段声音');
          return;
        }
        wx.playVoice({
          localId: voice.localId
        });
      };

      // 4.6 暂停播放音频
      document.querySelector('#pauseVoice').onclick = function () {
        wx.pauseVoice({
          localId: voice.localId
        });
      };

      // 4.7 停止播放音频
      document.querySelector('#stopVoice').onclick = function () {
        wx.stopVoice({
          localId: voice.localId
        });
      };

      // 4.8 监听录音播放停止
      wx.onVoicePlayEnd({
        complete: function (res) {
          alert('录音（' + res.localId + '）播放结束');
        }
      });

      // 4.8 上传语音
      document.querySelector('#uploadVoice').onclick = function () {
        if (voice.localId == '') {
          alert('请先使用 startRecord 接口录制一段声音');
          return;
        }
        wx.uploadVoice({
          localId: voice.localId,
          success: function (res) {
            alert('上传语音成功，serverId 为' + res.serverId);
            voice.serverId = res.serverId;
          }
        });
      };

      // 4.9 下载语音
      document.querySelector('#downloadVoice').onclick = function () {
        if (voice.serverId == '') {
          alert('请先使用 uploadVoice 上传声音');
          return;
        }
        wx.downloadVoice({
          serverId: voice.serverId,
          success: function (res) {
            alert('下载语音成功，localId 为' + res.localId);
            voice.localId = res.localId;
          }
        });
      };
    });

    wx.error(function (res) {
      alert(res.errMsg);
    });
});
jqxhr.fail(function(r){
    alert(r);
});