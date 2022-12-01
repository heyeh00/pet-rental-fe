// pages/pets/show.js
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

    },

    showModal() {
        wx.showModal({
          title: 'Please kindly confirm.',
          content: 'Are you sure to book this cutie?',
          complete: (res) => {
            if (res.cancel) {
              console.log('The user has not made the reservation.');
            }
        
            if (res.confirm) {
              console.log('The user made the reservation.');
            }
          }
        })
    }
})