// pages/pets/show.js
import { getData } from '../../utils/getdata';
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
        const page = this
        console.log(options)
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromOpenerPage', function(data) {
          console.log("RECEIVED", data)
          page.setData({id: data.id})
          console.log("SET TO PAGE", page.data.id)
        }) 
        const id = page.data.id
        getData(`/pets/${id}`).then((res) => {
            this.setData({ pet: res.data.pet})
            console.log("===ALL PET DATA HERE===", this.data.pet);
            console.log("ALL PAGE DATA", this.data)
            console.log("PETS USER ID", this.data.pet.user_id)
            const userId = app.getUserId()
            this.setData({user_id: userId})
            console.log("CURRENT USER ID", this.data.user_id)
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
        if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          //uniqueness
          selected: 0
        })
      }
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
    goToIndex() {
        wx.switchTab({
          url: '/pages/pets/index',
        })
    },
    showModal() {
        const page = this
        wx.showModal({
          title: 'Please kindly confirm.',
          content: 'Are you sure to book this cutie?',
          complete: (res) => {
            if (res.cancel) {
              console.log('The user has not made the reservation.');
            }
        
            if (res.confirm) {
              console.log("CONFIRM PET ID", page.data.pet.id)
              const pet_id = page.data.pet.id
              console.log("CONFIRM USER ID", app.globalData.user.id)
              const user_id = app.globalData.user.id
              const booking = { pet_id: pet_id, user_id: user_id }
              getData(`/users/:user_id/bookings`, { booking }, "POST").then((res) => {
                console.log("===SUCCESS===", res);
            })
            }
          }
        })
    }
})