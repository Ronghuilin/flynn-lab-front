<template>
  <div class="home">
    <h3>this is a statistic page</h3>
    <div id="day-req-cnt" style="margin: 20px auto; width: 360px; height: 240px"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {Line} from '@antv/g2plot';

var dayReqCnt = null

export default {
  name: 'Statistic',
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      currentDay: this.$moment().format('YYYY-MM-DD'),
      requestCountList: [],
      dayRequestId: null
    }
  },
  created() {
    console.log("进入created")
    let dayRequestCountStr = sessionStorage.getItem('day-request-count-list')
    if (dayRequestCountStr && dayRequestCountStr.length > 0) {
      this.requestCountList = JSON.parse(dayRequestCountStr)
    }
    this.getDayRequestCount()
  },
  mounted() {
    console.log("进入mounted")
    if (!dayReqCnt) {
      dayReqCnt = new Line('day-req-cnt', {
        data: this.requestCountList,
        xField: 'second',
        yField: 'count'
      })
    }
  },
  methods: {
    // 停止实时请求
    stopRealTimeRequest() {
      sessionStorage.setItem('day-request-count-list', JSON.stringify(this.requestCountList))
      clearTimeout(this.dayRequestId)
    },
    renderDayRequestCount() {
      dayReqCnt.render()
    },
    getDayRequestCount() {
      let _requestCountList = this.requestCountList
      let _this = this
      this.axios.get('http://localhost:8128/statistic/website/dayRequest').then(resp => {
        let result = resp.data
        if (result.code === 1) {
          let max = 5
          if (_requestCountList.length >= max) {
            // 移除第一个
            _requestCountList.splice(0, 1)
          }
          _requestCountList.push({second: this.$moment().format('mm:ss'), count: result.data})
          console.log('result', JSON.stringify(_requestCountList))
          _this.renderDayRequestCount()
          _this.dayRequestId = setTimeout(function () {
            _this.getDayRequestCount()
          }, 2000)
        }
      })
    }
  },
  destroyed() {
    console.log('进入destroyed')
    //
    this.stopRealTimeRequest()
  }
}

</script>
