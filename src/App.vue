<template>
  <div id="app">
    <a-menu v-model="current" mode="horizontal" style="font-size: 14px" @click="didSelectMenuItem">
      <a-menu-item key="title" disabled style="margin-right:120px">
        <a-avatar shape="square"
                  src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2464689086,3627478003&fm=26&gp=0.jpg"/>
        <span style="font-weight: bold; margin-left: 5px">Flynn-Lab</span>
        <span v-show="onlineUserCount > 0">在线：{{onlineUserCount}}</span>
      </a-menu-item>
      <a-menu-item :key="pages.blog.key">
        <a-icon type="appstore"/>
        博客
      </a-menu-item>
      <a-menu-item :key="pages.lab.key">
        <a-icon type="experiment"/>
        实验室
      </a-menu-item>
      <a-menu-item :key="pages.archive.key">
        <a-icon type="file-zip"/>
        归档
      </a-menu-item>
      <a-menu-item :key="pages.statistics.key">
        <a-icon type="bar-chart"/>
        统计
      </a-menu-item>
      <a-menu-item :key="pages.about.key">
        <a-icon type="info-circle"/>
        关于
      </a-menu-item>
      <a-menu-item key="ant-design-icon">
        <a href="https://antdv.com/components/icon-cn/" target="_blank" rel="noopener noreferrer">ant-design-icon</a>
      </a-menu-item>
    </a-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    this.getOnlineCount()
  },
  data() {
    return {
      pages: {
        blog: {
          key: "blog",
          path: "/blog"
        },
        lab: {
          key: "lab",
          path: "/lab"
        },
        archive: {
          key: "archive",
          path: "/archive"
        },
        statistics: {
          key: "statistics",
          path: "/"
        },
        about: {
          key: "about",
          path: "/about"
        },
      },
      current: ['statistics'],
      onlineUserCount: 0,
    }
  },
  methods: {
    didSelectMenuItem(menuItem) {
      let key = menuItem.key
      if (key === this.current[0]) {
        return
      }
      let page = this.pages[key]
      console.log(page)
      this.$router.replace(page.path)
    },
    getOnlineCount() {
      this.getReq('/statistic/server/getOnlineUserCount').then(resp => {
        this.onlineUserCount = resp.data
      })
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
