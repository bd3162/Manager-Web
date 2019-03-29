<template>
    <div class="hello">
        <div id="myChart" :style="{width: '600px', height: '600px'}"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "season_total",
    components: {

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
    watch: {//用于监测子组件暴露的属性值变化所触发的动作
      year: {
        handler(newValue){
          this.year = newValue;
          this.drawBar();
        }
      }
    },
    mounted () {
      this.drawBar()
    },
    methods: {
      drawBar () {
        let colors = ['#d14a61', '#5793f3'];
        let option = {
          color: colors,

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data:['销量','金额']
          },
          xAxis: [
            {
              type: '',
              axisTick: {
                alignWithLabel: true
              },
              data: ['第一季度', '第二季度', '第三季度', '第四季度']
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '销量',
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value} 万'
              }
            },
            {
              type: 'value',
              name: '金额',
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value} 万元'
              }
            }
          ],
          series: [
            {
              name:'销量',
              type:'bar',
              data:[]
            },
            {
              name:'金额',
              type:'bar',
              yAxisIndex: 1,
              data:[]
            }
          ]
        };
        let myChart = echarts.init(document.getElementById('myChart'), 'light')
        // myChart.setOption(option);
        myChart.showLoading();
        let param = {
          year: this.year,
          statisDimens: "total",
          subNum: "2",
        };
        this.$axios.post('https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/rest/report/quarterly', param)
          .then(response => {
            console.log(response);
            if (response.data.msgCode == 0) {
              for (let i = 0; i < 4; i++) {
                option.series[0].data.push(response.data.data.totalSalesList[i][0].salesAmount / 10000);
                option.series[1].data.push(response.data.data.totalSalesList[i][0].salesCount / 10000)
              }
              console.log(option)
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
            this.$message.error('Request Error, please check the console to find out what goes wrong.');
          });
      },
    },
  }
</script>

<style scoped>

</style>
