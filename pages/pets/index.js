// pages/pets/index.js
import event from '@codesmiths/event';
import { getData } from '../../utils/getdata';

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
          console.log("===ONLOAD===", getApp().globalData.header);
          this.getPets();
      } else {
          event.on('tokenReady', this, this.getPets);
      }
    },
    getPets() {
        getData('/pets', this).then((res) => {
          console.log(123123, res);
          this.setData({ user: res.data.pets })
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