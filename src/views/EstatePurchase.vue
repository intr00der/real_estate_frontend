<template>
  <div>
    <p class="details-header">Contact us to purchase {{estate.title}}!</p>
    <p class="details-header">Price: {{estate.discounted_price}}</p>
    <p>Please fill in the form so that we could contact you about this order.</p>

    <img v-if="estate.primary_image" :src=estate.preview_image>
    <img v-else :src="images.sample">


    <form class="order-form">
      <div class="columns">
        <div class="column">
              <p class="form-msg await-text" v-show="elementAwaitVisible">Please wait</p>
              <p class="form-msg success-text" v-show="elementStatusVisible" v-if="responseStatus === 200">Your order was registered successfully</p>
              <p class="form-msg fail-text" v-show="elementStatusVisible" v-else>Please check your fields</p>

              <p class="column form-input">First name:  <input class="phone-input" type="text" v-model="firstName"></p>
              <p class="column form-input">Last name:  <input type="text" v-model="lastName"></p>
              <p class="column form-input">Phone number:  <input type="text" v-model="phoneNumber"></p>
              <p class="column form-input">Email:  <input type="text" v-model="email"></p>
<!--      <p class="error-field" v-if="err">Please check your fields</p>-->
        </div>
      </div>
      <button class="button is-success is-medium" type="button" @click="postOrder">Register order</button>
    </form>
    <p v-if="responseStatus === 200" class="purchase-button-p">
      <router-link :to="{name:'Home'}">
        <button class="button is-link is-medium" >Go to home page</button>
      </router-link>
    </p>



  </div>
</template>

<script>

import axios from "axios";
import IMask from 'imask';


export default {
  name: 'estate-purchase',
  props: [
    'estateId', 'firstName', 'lastName', 'phoneNumber', 'email'
  ],
  data() {

    return {
      images: {
        sample: require('@/assets/no-image.png')
      },
      estate: [],
      err: '',
      responseStatus: 0,
      elementStatusVisible: false,
      elementAwaitVisible: false,

    }
  },
  mounted() {
    this.getEstate()

    },
  methods: {
    getEstate() {
      axios.get(
          `http://127.0.0.1:8000/api/v1/estate-list/${this.estateId}`
      ).then(
          response => this.estate = response.data
      ).catch(err => console.log(err))
    },
    async postOrder() {
      this.elementAwaitVisible = true
      await axios.post(
          `http://127.0.0.1:8000/api/v1/estates/orders/create/`,
          {
            first_name: this.firstName,
            last_name: this.lastName,
            estate: this.estateId,
            email: this.email,
            phone_number: this.phoneNumber
          }).then(
          response => {
            this.responseStatus = response.status;
            console.log(response)
          }
      ).catch(err => this.err = err);
      this.elementAwaitVisible = false
      this.elementStatusVisible = true
      setTimeout(() => this.elementStatusVisible = false, 3000)
    }
  }
}

</script>
<!--`127.0.0.1:8000/api/v1/estates/orders/create/?first_name=${this.firstName}&last_name=${this.lastName}&phone_number=${this.phoneNumber}&estate=${this.estateId}&email=${this.email}`-->
<style scoped>

</style>