<template>
  <div class="home">
    <h3>this is a statistic page</h3>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Statistic',
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      currentDay: this.$moment().format('YYYY-MM-DD'),
      reqNumList: [0]
    }
  },
  created() {
    console.log(this.currentDay)
    this.getDayRequestCount()
  },
  mounted() {
  },
  methods: {
    getDayRequestCount() {
      this.axios.get('http://localhost:8128/statistic/website/dayRequest').then(resp => {
        console.log(resp.data)
      })
    }
  }
}

</script>
