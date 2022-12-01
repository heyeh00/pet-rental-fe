// pages/profile/profile.js
import event from '@codesmiths/event';
import { getData } from '../../utils/getdata';

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

                const user = {
                    name: that.data.name,
                    image_url: that.data.image_url,
                }

                const header = {
                    'Authorization': app.globalData.header
                }
                getData(`/users/${app.globalData.user.id}`, { user }, "PUT").then((res) => {
                    console.log(123123, res);
                    that.setData({ user: res.data.user })
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