// pages/pets/index.js
import event from '@codesmiths/event';
Page({

    /**
     * Page initial data
     */
    data: {

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
      if (getApp().globalData.header) {
          console.log(getApp().globalData.header);
          this.getEvents();
      } else {
          event.on('tokenReady', this, this.getEvents);
      }
    },
    getEvents() {
      const app = getApp();
      console.log("APP", app)
      const header = { Authorization: app.getHeader() }
      console.log("HEADER", header)
      const page = this;
      console.log("PAGE", page)

      console.log('header', header);
      wx.request({
        url: `${app.getUrl()}pets`,
        header,
        success(res) {
          page.setData({ events: res.data.events })
        }
      })
    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow() {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    }
})