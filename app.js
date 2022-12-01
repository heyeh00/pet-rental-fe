// app.js
import event from '@codesmiths/event';

App({
  onLaunch() {
    const that = this;

    wx.login({
      success(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.globalData.code = res.code;
        wx.request({
          url: `${that.getUrl()}/login`,
          method: "POST",
          data: { code: res.code },
          success(loginRes) {
            that.globalData.user = loginRes.data.user;
            that.globalData.header = loginRes.header['Authorization']
            event.emit('tokenReady')
          },
          failure(errors) {
            console.log("===ERROR===", errors);
          }
        })
      }
    })
  },

  getUrl() {
    return this.globalData.baseUrl;
  },
 
  getHeader() {
    return this.globalData.header;
  },

  globalData: {
    baseUrl: 'http://localhost:3000/api/v1'
    
  }
})
