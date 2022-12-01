// app.js
import event from '@codesmiths/event';

App({
  onLaunch() {
    const that = this;

    wx.login({
      success(res) {
        //   console.log('test',res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(that.baseUrl)
        // wx.request({
        //   url: `${that.getUrl()}/login`,
        //   method: "POST",
        //   data: { code: res.code },
        //   success(loginRes) {
        //     // console.log("===LOGIN REQUEST===", loginRes);
        //     that.globalData.user = loginRes.data.user;
        //     that.globalData.header = loginRes.header['Authorization']
        //     // console.log("===HEADER===", that.getHeader());
        //     event.emit('tokenReady')
        //   },
        //   failure(errors) {
        //     console.log("===ERROR===", errors);
        //   }
        // })
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
    userInfo: null,
    baseUrl: 'http://localhost:3000/api/v1'
  }
})
