// app.js
import event from '@codesmiths/event';

App({
  onLaunch() {
    const page = this;
    console.log("LAUNCH PAGE", page)

    wx.login({
      success(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("===LOGIN SUCCESS===", res);
        wx.request({
          url: `${page.getUrl()}login`,
          method: "POST",
          data: { code: res.code },
          success(loginRes) {
            console.log("===LOGIN RES===", loginRes);
            page.globalData.user = loginRes.data.user;
            page.globalData.header = loginRes.header['Authorization']
            console.log("===HEADER===", page.getHeader());
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
    user: null,
    header: null,
    baseUrl: 'http://localhost:3000/api/v1/'
  }
})
