// pages/profile/profile.js
import event from '@codesmiths/event';

const app = getApp();

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

    login(e) {
        const that = this
        wx.getUserProfile({
            desc: 'desc the user to himself',
            success(res) {
                console.log("GET USER NAME", res.userInfo.nickName)
                that.setData({name: res.userInfo.nickName})
                app.globalData.user.name = that.data.name

                console.log("GET USER IMAGE", res.userInfo.avatarUrl)
                that.setData({image_url: res.userInfo.avatarUrl})
                app.globalData.user.image_url = that.data.image_url

                const checkData = {
                    name: that.data.name,
                    image_url: that.data.image_url,
                }
                console.log("===CHECK DATA===", checkData)

                wx.request({
                  header: app.globalData.header,
                  url: `http://localhost:3000/api/v1/users/${app.globalData.user.id}`,
                  method: "POST",
                  data: {
                      name: that.data.name,
                      image_url: that.data.image_url
                  },
                  success(res) {
                      console.log("PLEASE WORK", res)
                  }
                })
            },
            fail(errors) {
                console.log("ERRORS", errors)
            }
          })
    },

    getUser() {
        this.setData({ user: app.globalData.user })
        this.setData({ user: this.data.user })
        const userId = this.data.user.id;
        console.log('==USER ID==', userId);
        console.log('==CODE==', app.globalData.code)
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