<template>
  <div id="content-wrap">
    <SideBar></SideBar>

    <div class="main">
      <EchartTest></EchartTest>
    </div>
  </div>
</template>

<script>
  import SideBar from './sideBar.vue'
  import EchartTest from './echarts/test.vue'

  export default {

    components:{SideBar,EchartTest},
    data (){
      return {

      }
    },

  }
</script>

<style scoped>
  #content-wrap{
    height:100%;
    width:100%;
  }
  .main{
   height:100%;
   width:100%;
  }
</style>
