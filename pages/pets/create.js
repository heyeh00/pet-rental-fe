const { getData } = require("../../utils/getdata")
const app = getApp()
// pages/pets/create.js
Page({

    /**
     * Page initial data
     */
    data: {

    },

    submitRestaurant(e) {
      console.log(e.detail.value)
      const {name, breed, animal, age, personality, address, gender} = e.detail.value
      const user_id = app.getUserId()
      this.setData({pet: {name, breed, animal, age, personality, address, gender, user_id}})
      const pet = this.data.pet
      console.log("DATA TO POST", pet)
      getData(`/users/${user_id}/pets`, { pet } , "POST").then((res) => {
        const id = res.data.pet.id
        wx.navigateTo({
          url: '/pages/pets/show',
          success: function(res) {
            res.eventChannel.emit('acceptDataFromOpenerPage', { id }) 
          }
        })
      })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {

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