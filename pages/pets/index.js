// pages/pets/index.js
const app = getApp();
import event from '@codesmiths/event';
Page({

    /**
     * Page initial data
     */
    data: {

    },

    goToPetDetail(e) {
        console.log('goToPetDetail', e)
        const id =  e.currentTarget.dataset.id
        wx.navigateTo({
          url: '/pages/pets/show',
        })
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
      const page = this;
      wx.request({
        url: "http://127.0.0.1:3000/api/v1/pets",
        method: 'GET',
        success(res) {
            console.log("pets", res.data.pets)
          const pets = res.data.pets;

          page.setData ({
            pets: pets
          });
        }
      })
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