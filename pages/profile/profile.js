// pages/profile/profile.js
import event from '@codesmiths/event';

const app = getApp();

Page({
    /**
     * Page initial data
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        if (getApp().globalData.header) {
            this.getUser();
        } else {
            event.on('tokenReady', this, this.getUser);
        }

        if (wx.getUserProfile) {
            this.setData({
              canIUseGetUserProfile: true
            })
          }
    },

    getUserBookings(userId) {
        wx.request({
          url: `http://localhost:3000/api/v1/users/${userId}/bookings`,
          success(res) {
              console.log("BOOKING", res)
          },
          failure(errors) {
              console.log("ERROR", errors)
          }
        })
    },

    getUser() {
        this.setData({ user: app.globalData.user })
        this.setData({ user: this.data.user })
        console.log('==USER DATA==', this.data.user);
        const userId = this.data.user.id;
        
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