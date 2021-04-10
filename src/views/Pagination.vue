<template>
  <div class="pagination-buttons">
    <button
        v-for="p in totalPages" :key="p"
        class="pagination-button button is-large"
        :class="{active: currentPage === p}"
        @click="changePage(p)">
      {{p}}
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['total', 'items'],
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / 10)
    }
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.$emit('page-changed', pageNumber)
    }
  }
}
</script>

<style scoped>


</style>