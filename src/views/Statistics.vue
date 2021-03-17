<template>
  <div class="home">
    <h3>this is a statistic page</h3>
    <div>
      <div id="latest-req-cnt" style="width: 360px; height: 240px;display: inline-block "></div>
      <div id="day-cnt" style="width: 360px; height: 240px; display: inline-block"></div>
      <div id="hour-cnt" style="width: 360px; height: 240px; display: inline-block"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {TimeCondition} from '../api/enum.js'
import * as echarts from 'echarts/core';
import {LineChart} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
  CanvasRenderer
} from 'echarts/renderers';
echarts.use([LineChart, TitleComponent, TooltipComponent, GridComponent, CanvasRenderer])

var dayRequestDataList = []
var latestReqCnt
var hourCnt
var dayCnt

export default {
  name: 'Statistic',
  components: {
  },
  data() {
    return {
      currentDay: this.moment().format('YYYY-MM-DD'),
      serverInfo: null,
      dayRequestId: null,
      dayCntList: [],
      hourCntList: []
    }
  },
  created() {
    console.log("进入created")
    this.latestRequestCount()
  },
  mounted() {
    console.log("进入mounted")
    latestReqCnt = echarts.init(document.getElementById("latest-req-cnt"))

    // day count
    this.dayRequestCount()
    this.hourRequestCount()
  },
  methods: {
    // 停止实时请求
    stopRealTimeRequest() {
      clearTimeout(this.dayRequestId)
    },
    renderDayRequestCount(num) {
      let max = 20
      if (dayRequestDataList.length >= max) {
        // 移除第一个
        dayRequestDataList.splice(0, 1)
      }
      dayRequestDataList.push({time: this.moment().format('mm:ss'), count: num})
      latestReqCnt.setOption({
        xAxis: {
          data: dayRequestDataList.map(a => a.time)
        },
        yAxis: {},
        series: [{
          name: '请求量',
          type: 'line',
          data: dayRequestDataList.map(a => a.count)
        }]
      })
    },
    latestRequestCount() {
      let _this = this
      this.axios.get('http://localhost:8128/statistic/website/latestSecondRequest?second=3').then(resp => {
        let result = resp.data
        if (result.code === 1) {
          _this.renderDayRequestCount(result.data)
          _this.dayRequestId = setTimeout(function () {
            _this.latestRequestCount()
          }, 3000)
        }
      })
    },
    getServerInfo() {
    },
    hourRequestCount() {
      let param = {
        startTime: this.moment().subtract(30, "day").format('YYYY-MM-DD'),
        endTime: this.moment().format('YYYY-MM-DD'),
        format: TimeCondition.format_hour
      }
      this.axios.post('http://localhost:8128/statistic/website/requestCountInTime', param).then(resp => {
        let result = resp.data
        if (result.code === 1) {
          console.log(JSON.stringify(result.data))
          let resultList = result.data
          hourCnt = echarts.init(document.getElementById("hour-cnt"))
          hourCnt.setOption({
            xAxis: {
              name: '时间',
              data: resultList.map(a => a.name)
            },
            yAxis: {},
            series: [{
              name: '请求量',
              type: 'line',
              data: resultList.map(a => a.value)
            }]
          })
        }
      })
    },
    dayRequestCount() {
      let param = {
        startTime: this.moment().subtract(7, "day").format('YYYY-MM-DD'),
        endTime: this.moment().format('YYYY-MM-DD'),
        format: TimeCondition.format_day
      }
      this.axios.post('http://localhost:8128/statistic/website/requestCountInTime', param).then(resp => {
        let result = resp.data
        if (result.code === 1) {
          console.log(JSON.stringify(result.data))
          let resultList = result.data
          dayCnt = echarts.init(document.getElementById("day-cnt"))
          dayCnt.setOption({
            xAxis: {
              name: '时间',
              data: resultList.map(a => a.name)
            },
            yAxis: {},
            series: [{
              name: '请求量',
              type: 'line',
              data: resultList.map(a => a.value)
            }]
          })
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
