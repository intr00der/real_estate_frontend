<template>
  <div>
    <p class="details-header">About {{estate.title}}</p>

    <div class="panel">

      <div v-if="estate.discount !== 0">
        <s class="panel-block details-header">Old price: {{estate.default_price}}</s>
        <p class="panel-block details-header">Current price: {{estate.discounted_price}}</p>
        <p class="panel-block details-header">Discount: {{estate.discount}}</p>
      </div>

      <div v-else>
        <p class="panel-block details-header">Current price: {{estate.default_price}}</p>
      </div>

      <p class="panel-block details-header">Description:</p>
      <p v-if="estate.description">{{estate.description}}</p>
      <p v-else>No description was given.</p>
    </div>
    <p class="purchase-button-p">
      <router-link :to="{name:'estate-purchase', params: { estateId: estate.id }}">
        <button class="button is-link is-medium" >Purchase</button>
      </router-link>
    </p>

    <p>You can find pictures of this real estate below.</p>
    <img v-if="estate.primary_image" :src=estate.primary_image>
    <img v-else :src="images.sample">
    <div v-for="image in additionalImages">
      <img :src="image.image">
    </div>



  </div>
</template>

<script>

import axios from "axios";


export default {
  name: 'estate-details',
  props: [
    'estateId',
  ],
  data() {
    return {
      images: {
        sample: require('@/assets/no-image.png')
      },
      estate: [],
      additionalImages: [],
    }
  },
  mounted() {
    this.getEstates()
    this.getAdditionalImages()
  },
  methods: {
    getEstates() {
      axios.get(
          `http://127.0.0.1:8000/api/v1/estate-list/${this.estateId}`
      ).then(
          response => this.estate = response.data
      ).catch(err => console.log(err))
    },
    getAdditionalImages() {
      axios.get(
          `http://127.0.0.1:8000/api/v1/additional-images?estate=${this.estateId}`
      ).then(
          response => this.additionalImages = response.data['results']
      ).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>