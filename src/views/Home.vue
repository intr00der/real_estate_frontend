<template>
  <div class="home">

    <div class="columns is-multiline" v-for="estatesList in chuckedEstatesList">

      <div class="column is-one-third panel outer-column" v-for="estate in estatesList" v-bind:key="estate.id">
        <div class="image-field">
          <img v-if="estate.preview_image" :src=estate.preview_image >
          <img v-else :src="images.sample">
        </div>


        <router-link :to="{name:'estate-details', params: { estateId: estate.id }}">
          <p class="estate-title">{{estate.title}}</p>
        </router-link>


        <div class="columns">
          <div class="column is-mobile inner-column panel-block">
            <div class="discount-panel">
              <div v-if="estate.default_price !== estate.discounted_price">
                <p>Old:</p>
                <p>Current:</p>
                <p>Discount:</p>
              </div>
              <div class="normal-panel" v-else>
                <p>Price:</p>
              </div>
            </div>
            </div>

          <div class="column is-mobile inner-column panel-block">
            <div class="discount-panel">
              <div v-if="estate.default_price !== estate.discounted_price">
                <s>{{estate.default_price}}$</s>
                <p class="discount">{{estate.discounted_price}}$</p>
                <p class="discount">{{estate.discount}}%!</p>
              </div>
              <div class="normal-panel" v-else>
                <p>{{estate.default_price}}$</p>
              </div>
            </div>
          </div>

          <div class="column is-mobile inner-column">
            <p>
              <router-link :to="{name:'estate-purchase', params: { estateId: estate.id }}">
                <button class="button is-link is-medium" >Purchase</button>
              </router-link>
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
  <Pagination :total="total" :items="estatesList.length" @page-changed="getEstates"/>
</template>

<script>
import Pagination from "./Pagination";
import axios from 'axios'
import chunk from 'chunk'


export default {
  name: 'Home',
  data() {
    return {
      images: {
        sample: require('@/assets/no-image.png')
      },
      estatesList: [],
      page: 1,
      total: 0

    }
  },
  computed: {
    chuckedEstatesList() {
      return chunk(this.estatesList, 2)
    }
  },
  components: {Pagination},
  mounted() {
    this.getEstates(this.page)
  },
  methods: {
    getEstates(pageNumber) {
      axios.get(
          `http://127.0.0.1:8000/api/v1/estate-list/?page=${pageNumber} `
      ).then(
          response => {
            this.total = response.data['count'];
            this.estatesList = response.data['results']

          },
      ).catch(err => console.log(err))
    }
  }
}

</script>
