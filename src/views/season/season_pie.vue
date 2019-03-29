<template>
    <div>
        <div id="myChart2" @updateAxisPointer="" :style="{width: '600px', height: '600px'}"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'season_pie',
    component: {

    },
    props: {
      year: String,
    },
    data () {
      return {

      }
    },
    computed: {

    },
    watch:{//用于监测子组件暴露的属性值变化所触发的动作
      year: {
        handler(newValue) {
          this.year = newValue;
          this.drawPie();
        }
      }
    },
    mounted() {
      this.drawPie()
    },
    methods: {
      drawPie () {
        let myChart = echarts.init(document.getElementById('myChart2'), 'light')
        let option = {
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['season', '第一季度', '第二季度', '第三季度', '第四季度'],
              ['Electronics'],
              ['Home & Kitchen'],
              ['Sports & Outdoors'],
              ['Health & Personal Care'],
              ['Beauty'],
              ['Grocery & Gourmet Food'],
              ['Baby']
            ]
          },
          series: [{
            type: 'pie',
            radius: 60,
            center: ['25%', '30%'],
            // No encode specified, by default, it is '2012'.
            encode: {
              itemName: 'season',
              value: '第一季度'
            }
          }, {
            type: 'pie',
            radius: 60,
            center: ['75%', '30%'],
            encode: {
              itemName: 'season',
              value: '第二季度'
            }
          }, {
            type: 'pie',
            radius: 60,
            center: ['25%', '75%'],
            encode: {
              itemName: 'season',
              value: '第三季度'
            }
          }, {
            type: 'pie',
            radius: 60,
            center: ['75%', '75%'],
            encode: {
              itemName: 'season',
              value: '第四季度'
            }
          }]
        };
        myChart.showLoading();

        let param = {
          year: this.year,
          statisDimens: "total",
          subType: "category",
          subNum: "7",
        };
        this.$axios.post('https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/rest/report/quarterly', param)
          .then(response => {
            console.log(response);
            if (response.data.msgCode == 0) {
              for (let i = 0; i < 4; i++) {
                // option.series[0].data.push(response.data.data.totalSalesList[i][0].salesAmount / 10000);
                // option.series[1].data.push(response.data.data.totalSalesList[i][0].salesCount / 10000)
                option.dataset.source[1].push(response.data.data.categorySalesList[i][0].salesCount);
                option.dataset.source[2].push(response.data.data.categorySalesList[i][1].salesCount);
                option.dataset.source[3].push(response.data.data.categorySalesList[i][2].salesCount);
                option.dataset.source[4].push(response.data.data.categorySalesList[i][3].salesCount);
                option.dataset.source[5].push(response.data.data.categorySalesList[i][4].salesCount);
                option.dataset.source[6].push(response.data.data.categorySalesList[i][5].salesCount);
                option.dataset.source[7].push(response.data.data.categorySalesList[i][6].salesCount);
              }
              console.log(option);
              myChart.hideLoading();
              // 绘制图表
              myChart.clear()
              myChart.setOption(option)
            }
            else {
              myChart.hideLoading();
              this.$message.error('Request succeed, but return error.Go check console.');
              console.log(response.data.msgDesc);
            }
          })
          .catch(error => {
            console.log(error);
            myChart.hideLoading();
            this.$message.error('Request Error, please check the console to find out what goes wrong.');
          });
      }
    }
  }
</script>

<style scoped>

</style>
