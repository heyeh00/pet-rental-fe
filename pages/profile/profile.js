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
            this.getData();
        } else {
            event.on('tokenReady', this, this.getData);
        }
    },

    login(e) {
        const that = this
        wx.getUserProfile({
            desc: 'desc the user to himself',
            success(res) {
                const user = {
                    name: res.userInfo.nickName,
                    image_url: res.userInfo.avatarUrl,
                }

                getData(`/users/${app.globalData.user.id}`, { user }, "PUT").then((res) => {
                    console.log("===GET USER DATA===", res.data.user);
                    that.setData({ user: res.data.user })
                  })
            },
            fail(errors) {
                console.log("ERRORS", errors)
            }
          })
    },

    getPets() {
        getData(`/users/${app.globalData.user.id}/pets`).then((res) => {
            console.log("===GET USERS PETS===", res.data.pets);
            this.setData({ pets: res.data.pets})
        })
    },

    getBookings() {
        getData(`/users/${app.globalData.user.id}/bookings`).then((res) => {
            console.log("===GET USER RENTED PETS===", res.data.pets);
            this.setData({ bookings: res.data.pets})
            console.log("===GET USERS BOOKINGS===", res.data);
        })
    },

    deletePet(e) {
        console.log("DLT e", e.currentTarget.dataset)
        const pet_id = e.currentTarget.dataset.pet_id
        const user_id = app.globalData.user.id
        const header = { Authorization: app.getHeader() }
        const page = this
        wx.showModal({
          cancelText: 'Cancel',
          confirmText: 'Delete',
          content: 'Pet will be lost forever!',
          title: 'Delete pet?😿',
          complete: (res) => {
            if (res.cancel) {

            } else if (res.confirm) {
                console.log("CONFIRM", res) 
                getData(`/users/${user_id}/pets/${pet_id}`, {}, "DELETE").then((res) => {
                    console.log("DELETED", page, res.data.pets);
                    page.setData({ pets: res.data.pets })
                })
            }  
          },
        })
    },

    destroyBooking(e) {
        const pet_id = e.currentTarget.dataset.booking_id
        console.log("DEL BOOK PET ID", pet_id)
        console.log("DEL BOOK ALL BOOK", this.bookings)
        const user_id = app.globalData.user.id
        console.log("DEL BOOK USERID", user_id)
        wx.showModal({
          cancelText: 'Cancel',
          confirmText: 'Delete',
          content: "You don't want to book anymore?",
          title: 'Delete booking?📓',
          complete: (res) => {
            if (res.cancel) {

            } else if (res.confirm) {
                console.log("CONFIRM", res) 
                // getData(`/users/${user_id}/bookings/${booking_id}`, {}, "DELETE").then((res) => {
                //     console.log("DELETED", page, res.data.pets);
                //     page.setData({ pets: res.data.pets })
                // })
            }  
          },
        })
    },

    getData() {
        this.setData({ user: app.globalData.user })
        this.getPets()
        this.getBookings()
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