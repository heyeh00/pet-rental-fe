// pages/pets/show.js
const app = getApp()
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
        console.log('Pet show onload options', options)
        const page = this
        const id = options.id
       
        wx.request ({
            url: `http://localhost:3000/api/v1/pets/${id}`,
            success(res) {
                console.log('Response from wx.request for GET pet', res.data)
                page.setData({
                    pet: res.data
                })
            }
        })
    },

    goToReserve() {

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