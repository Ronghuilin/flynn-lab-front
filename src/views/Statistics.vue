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

var dayRequestDataList = []
var dayReqCnt

export default {
  name: 'Statistic',
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      currentDay: this.$moment().format('YYYY-MM-DD'),
      serverInfo: null,
      dayRequestId: null
    }
  },
  created() {
    console.log("进入created")
    this.getDayRequestCount()
  },
  mounted() {
    console.log("进入mounted")
    dayReqCnt = new Line('day-req-cnt', {
      dayRequestDataList,
      xField: 'time',
      yField: 'count'
    })
    dayReqCnt.render()

  },
  methods: {
    // 停止实时请求
    stopRealTimeRequest() {
      clearTimeout(this.dayRequestId)
    },
    renderDayRequestCount(num) {
      let max = 100
      if (dayRequestDataList.length >= max) {
        // 移除第一个
        dayRequestDataList.splice(0, 1)
      }
      dayRequestDataList.push({time: this.$moment().format('mm:ss'), count: num})
      dayReqCnt.changeData(dayRequestDataList)
    },
    getDayRequestCount() {
      let _this = this
      this.axios.get('http://localhost:8128/statistic/website/dayRequest').then(resp => {
        let result = resp.data
        if (result.code === 1) {
          _this.renderDayRequestCount(result.data)
          _this.dayRequestId = setTimeout(function () {
            _this.getDayRequestCount()
          }, 2000)
        }
      })
    },
    getServerInfo() {
      this.axios.get('')
    }
  },
  destroyed() {
    console.log('进入destroyed')
    //
    this.stopRealTimeRequest()
  }
}

</script>
