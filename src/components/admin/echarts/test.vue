<template>
  <div class="viewport" v-model="myFunction">
    <div class="column">
      <div class="overview pannel">
        <div class="inner">
          <div class="item" v-for="(item,index) of overviewPannel.overviewPannelData">
            <h4>{{item.value}}</h4>
            <span><i class="icon_dot" :style="{color:item.color}"></i>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="monitor pannel">
        <div class="inner">
          <div class="tab">
            <a data-index="0" href="javascript:;">故障设备监控</a>
            <a data-index="1" href="javascript:;">异常设备监控</a>
          </div>
          <div class="content">
            <div class="head">
              <span class="col">故障时间</span>
              <span class="col">设备地址</span>
              <span class="col">异常代码</span>
            </div>
            <div class="marquee-view">
              <div class="marquee">
                <div class="row" v-for="(item,index) of monitorPannel.monitorPannelData">
                  <span class="col">{{item.date}}</span>
                  <span class="col">{{item.name}}</span>
                  <span class="col">{{item.value}}</span>
                  <span class="icon_dot"></span>
                </div>
              </div>
            </div>

          </div>
          <div class="content" style="display:none"></div>
        </div>
      </div>
      <div class="pointer pannel">
        <div class="inner">
          <h3>点位分布统计</h3>
          <div class="chart">
            <div class="pie" id="pie" ref="pie"></div>
            <div class="data">
              <div class="item" v-for="(item,index) of pointerPannel">
                <h4>{{item.value}}</h4>
                <span><i class="icon_dot" :style="{color:item.color}"></i>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="map">
        <h3>
        <span class="icon-cube"></span>
        设备数据统计
        </h3>
        <div class="chart">
          <div class="geo" ref="china"></div>
        </div>
      </div>
      <div class="user pannel">
        <div class="inner">
          <h3>全国用户总量统计</h3>
          <div class="chart">
            <div class="bar" id="bar" ref="bar"></div>
            <div class="data">
              <div class="item" v-for="(item,index) of userPannel">
                <h4>{{item.value}}</h4>
                <span><i class="icon_dot" :style="{color:item.color}"></i>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="order pannel">
        <div class="inner">
          <div class="filter" >
            <a data-key="day365" href="javascript:;" class="active">365天</a>
            <a data-key="day30" href="javascript:;">365天</a>
            <a data-key="7" href="javascript:;">365天</a>
            <a data-key="24" href="javascript:;">365天</a>
          </div>
          <div class="data">
            <div class="item" v-for="(item,index) of orderPannel">
              <h4>{{item.value}}</h4>
              <span><i class="icon_dot" :style="{color:item.color}">{{item.name}}</i></span>
            </div>
           </div>
        </div>
      </div>
      <div class="sales pannel">
        <div class="inner">
            <div class="caption">
              <h3>销售额统计</h3>
              <a href="javascript:;" class="active" data-type="year">年</a>
              <a href="javascript:;" data-type="quarter" class="">季</a>
              <a href="javascript:;" data-type="month" class="">月</a>
              <a href="javascript:;" data-type="week" class="">周</a>
            </div>
            <div class="chart">
              <div class="label">单位：万</div>
              <div class="line" ref="line">

              </div>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // 引入 ECharts 主模块
 import * as Option from './myEcharts.js'
  var echarts = require('echarts/lib/echarts');
   var Mock = require('mockjs');

  // 引入柱状图
   require('echarts/lib/chart/bar');
   require('echarts/map/js/china.js');
  // // 引入提示框和标题组件
   require('echarts/lib/component/tooltip');
   require('echarts/lib/component/title');

  export default {
    data(){
      return {
          pointerPannel:[
            {"name":'点位总数',"value":2190,"type":0,"color":"#ed3f35"},
            {"name":'运营新增',"value":190,"type":1,"color":"#6acca3"},

          ],
          userPannel:[
            {"name":'点位总数',"value":2190,"type":0,"color":"#ed3f35"},
            {"name":'运营新增',"value":190,"type":1,"color":"#6acca3"},

          ],
          orderPannel:[
            {"name":'订单量',"value":2190,"type":0,"color":"#6acca3"},
            {"name":'销售额',"value":2190,"type":1,"color":"#006cff"},
          ],
          overviewPannel:Mock.mock({
            "overviewPannelData|4":[{
              "name|1":["设备总数","季度新增","运营设备","异常设备"],
              "value|10-10000":190,
              "type|+1":0,
              "color|1":["#006cff","#6acca3","#6acca3","#ed3f35"]
            }]
          }),
          monitorPannel:Mock.mock({
            "monitorPannelData|20":[{
              "name|1":"11北京市昌平西路金燕龙写字楼",
              "date|1":'@date("yyyymmdd")',
              "value|+1":10000
            }]
          }),
          aa:Mock.mock('https://www.test.com',{
          "userInfo|4":[{    //生成|num个如下格式名字的数据
          "id|+1":1,  //数字从当前数开始后续依次加一
          "name":"@cname",    //名字为随机中文名字
          "ago|18-28":25,    //年龄为18-28之间的随机数字
          "sex|1":["男","女"],    //性别是数组中的一个，随机的
          "job|1":["web","UI","python","php"]    //工作是数组中的一个
            }]
        }),
// 调用
// $.get('https://www.test.com',function(data){
//         console.log(JSON.parse(data));
//     })
      chianData:[],
      chartGeo:null,
      myChartPie:null,
      myChartBar:null,
      myChartLine:null,
      watchWith:0,
      //myFunction:null,
      }
    },
    methods:{

    },
    computed:{
        myFunction(){
          var viewport= document.getElementsByClassName("viewport");
          console.log(viewport);

          //console.log( document.getElementsByClassName("viewport")[0].offsetWidth);
            // if(document.getElementsByClassName("viewport")[0].offsetWidth !== this.watchWith){
            //   echarts.init(this.$refs.china);
            // }
          console.log(window);
        }
    },
    mounted() {
     /*ECharts图表*/
    var myChartPie = echarts.init(this.$refs.pie);
    var myChartBar = echarts.init(this.$refs.bar);
    var myChartLine = echarts.init(this.$refs.line);
    var chartGeo = echarts.init(this.$refs.china);

     chartGeo.setOption(Option.optionMap);
     myChartPie.setOption(Option.optionPie);
     myChartBar.setOption(Option.optionBar);
     myChartLine.setOption(Option.optionLine);

     //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
           window.addEventListener('resize',function() {
             console.log("动了" );
             myChartPie.resize()});
           window.addEventListener('resize',function() {myChartBar.resize()});
           window.addEventListener('resize',function() {chartGeo.resize()});
           window.addEventListener('resize',function() {myChartLine.resize()});
  },
   updated() {

  // 	window.addEventListener('resize',function() {myChartPie.resize()});
  // 	window.addEventListener('resize',function() {myChartBar.resize()});
  // 	window.addEventListener('resize',function() {chartGeo.resize()});
  // 	window.addEventListener('resize',function() {myChartLine.resize()});
   }


 }
</script>


  <style>
    html{
      font-size: 23.7875px;
    }

  .viewport{
    display:flex;
    min-width: 1024px;
    max-width: 1920px;
    min-height:880px;
    padding: 20px;

    background-color: #101129 !important;

  }
  .column{
    flex:3
  }
  .column:nth-child(2){
    flex:4;
    margin: 1.333rem .833rem 0;
  }
  .overview{
    height:4.6875rem;
    margin-bottom:0.833rem;
  }
  .pannel{
    box-sizing: border-box;
    border:2px solid red;
    border-image: url(../../../assets/img/border.png) 51 38 21 132;
    border-width: 2.125rem 1.583rem .875rem 5.5rem;
    position:relative;

  }
  .pannel .inner{
    position: absolute;
    right: -1.583rem;
    bottom: -.875rem;
    left: -5.5rem;
    padding: 1rem 1.5rem;
  }
  .pannel h3 {
      font-size: .833rem;
      color: #fff;
  }
  [class^=icon-], [class*=" icon-"]{
        font-family: icomoon!important;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
  }
  .icon_dot:before {
      content: "\e900";
  }
  .overview .inner{
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .overview .inner h4 {
      font-size: 1.167rem;
      padding-left: .2rem;
      color: #fff;
      margin-bottom: .333rem;
  }
  .overview .inner span {
      font-size: .667rem;
      color: #4c9bfd;
  }
  .monitor{
    height:25rem;
     margin-bottom:0.833rem;
  }
  .monitor .content {
      flex: 1;

      position: relative;
  }
  .monitor .tab {
      padding: 0 1.5rem;
      margin-bottom: .75rem;
  }
  .monitor .inner{
    display: flex;
    padding: 1rem 0;
    flex-direction: column;
    height: 100%;
  }
  .monitor .tab a:first-child {
      border-right: .083rem solid #00f2f1;
      padding-left: 0;
  }
  .monitor .tab a {
      color: #1950c4;
      font-size: .75rem;
      padding: 0 1.125rem;
  }
  .monitor .head {
      background: rgba(255,255,255,.1);
      font-size: .583rem;
      padding: .5rem 1.5rem;
      color: #68d8fe;
      display: flex;
      justify-content: space-between;
      line-height: 1.05;
  }
  .monitor .col:nth-child(1) {
      width: 3.2rem;
  }
  .monitor .col:nth-child(2) {
      width: 8.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .monitor .col:nth-child(3) {
      width: 3.2rem;
  }
  .monitor .marquee-view {
      position: absolute;
      top: 1.6rem;
      bottom: 0;
      width: 100%;
      overflow: hidden;
  }
  .monitor .marquee {
      animation: row 7s linear infinite;
  }
  .monitor.marquee: hover {
      animation - play - state: paused;
  }
  @keyframes row
  {
    0% {
    }
  	100% {transform: translateY(-40%);}
  }

  @-webkit-keyframes row /*Safari and Chrome*/
  {
  	0% {
  	}
  	100% {transform: translateY(-50%);}
  }
   .monitor.marquee: hover {
        animation - play - state: paused;
    }
  .monitor .row {
      line-height: 1.05;
      padding: .5rem 1.5rem;
      color: #61a8ff;
      font-size: .5rem;
      position: relative;
      display: flex;
      justify-content: space-between;
  }
  .pointer{
    height:16.167rem
  }
  .pointer  .chart {
      display: flex;
      margin-top: 1rem;
      justify-content: space-between;
  }
  .pointer .pie{
      width: 13rem;
      height: 10rem;
      margin-left: -.4rem;
  }
  .pointer .data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 7rem;
      padding: 1.5rem 1.25rem;
      box-sizing: border-box;
      background-color: #101144 ;
      background-size: cover;
  }
  .pointer .data h4 {
      margin-bottom: .5rem;
      font-size: 1.167rem;
      color: #fff;
  }
  .pointer .data span {
      display: block;
      color: #4c9bfd;
      font-size: .667rem;
  }
  .map {
      height: 29.1rem;
      margin-bottom: .833rem;
      display: flex;
      flex-direction: column;
  }
  .map h3 {
      line-height: 1;
      padding: .667rem 0;
      margin: 0;
      font-size: .833rem;
      color: #fff;
  }
  .map .icon-cube {
      color: #68d8fe;
  }
  .map .chart {
      flex: 1;
      background-color: rgba(255,255,255,.05);
  }
  .map .geo {
      width: 100%;
      height: 100%;
  }
  .user{
    height:16.167rem;
    display:flex;
  }
  .user .chart {
      display: flex;
      margin-top: 1rem;
  }
  .user .bar {
      width: 20.5rem;
      height: 10rem;
  }
  .user .data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 7rem;
      padding: 1.5rem 1.25rem;
      box-sizing: border-box;
      background-color: #101144 ;
      background-size: cover;
  }
  .user .data h4 {
      margin-bottom: .5rem;
      font-size: 1.167rem;
      color: #fff;
  }
  .user .data span {
      display: block;
      color: #4c9bfd;
      font-size: .667rem;
  }
  .order{
    height:6.167rem;
  }
  .order .filter {
      display: flex;
  }
  .order .filter a:first-child {
      padding-left: 0;
  }
  .order .filter a.active {
      color:#fff;
      font-size:0.833rem;
  }
  .order .filter a {
      display: block;
      height: .75rem;
      line-height: 1;
      padding: 0 .75rem;
      color: #1950c4;
      font-size: .75rem;
      border-right: .083rem solid #00f2f1;
  }
  .order .data {
      display: flex;
      margin-top: .833rem;
  }
  .order .item {
      width: 50%;
  }
  .order h4 {
      font-size: 1.167rem;
      color: #fff;
      margin-bottom: .417rem;
      margin-top: 0;
  }
  .order span {
      display: block;
      color: #4c9bfd;
      font-size: .667rem;
  }

.sales {
    height: 10.333rem;
}
.sales .inner {
    display: flex;
    flex-direction: column;
}
.sales .caption {
    display: flex;
    line-height: 1;
}
.sales .caption {
    display: flex;
    line-height: 1;
}
.sales h3 {
    height: .75rem;
    padding-right: .75rem;
    border-right: .083rem solid #00f2f1;
    margin-top:0;
}
.sales a {
    padding: .167rem;
    font-size: .667rem;
    margin: -.125rem 0 0 .875rem;
    border-radius: .125rem;
    color: #0bace6;
}
.sales a.active{
    color:#fff;
    background-color: #4c9bfd;
}
.sales .chart {
    flex: 1;
    padding-top: .6rem;
    position: relative;
}
.sales .label {
    position: absolute;
    left: 1.75rem;
    top: .75rem;
    color: #4996f5;
    font-size: .583rem;
}
.sales .line {
    width: 100%;
    height: 6rem;
}
</style>
