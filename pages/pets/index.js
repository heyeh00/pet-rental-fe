// pages/pets/index.js
const app = getApp();
import event from '@codesmiths/event';
import { getData } from '../../utils/getdata';

Page({

    /**
     * Page initial data
     */
    data: {
    },

    goToPetDetail(e) {  
        console.log('goToPetDetail', e)
        const id =  e.currentTarget.dataset.id
        console.log("PREPARE PUSH", id) 
        wx.navigateTo({ 
          url: '/pages/pets/show',  
          success: function(res) {
            res.eventChannel.emit('acceptDataFromOpenerPage', { id }) 
          }
        }) 
    },
 
    showAnimal(e) {
        const pets = this.data.pets;
        const filteredType = this.data.type
        const type = e.currentTarget.dataset.type;
        //second click will bring back all pets
        if (type === filteredType) return this.setData({ filteredPets: pets, type: "" });
        if (type === "dog" || type === "cat") {
            const filteredPets = pets.filter((pet) => pet.animal.toLowerCase() === type );
            this.setData({ filteredPets: filteredPets, type })
            console.log(filteredPets);
        } else {
            const filteredPets = pets.filter((pet) => pet.animal.toLowerCase() !== "dog" && pet.animal.toLowerCase() !== "cat")
            this.setData({ filteredPets: filteredPets, type })
        }
        // console.log(e.currentTarget.dataset);
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
        getData('/pets').then((res) => {
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
      const page = this;
      const header = {
        'Authorization': app.globalData.header
      }
      wx.request({
        // url: "http://127.0.0.1:3000/api/v1/pets", 
        url: "http://localhost:3000/api/v1/pets",
        method: 'GET', 
        header,
        success(res) {
          console.log("pets", res.data.pets)
          const pets = res.data.pets;

          page.setData ({
            pets: pets,
            filteredPets: pets
          });
        },
        fail(errors) {
            console.log("ERRORS", errors)
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