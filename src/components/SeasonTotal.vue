<template>
    <div class="hello">
        <div id="myChart" :style="{width: '600px', height: '600px'}"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "SeasonTotal",
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
        methods: {
            drawBar () {
                let colors = ['#42602D', '#113285', '#675bba'];
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
                let myChart = echarts.init(document.getElementById('myChart'))

                let param = {
                    year: this.year,
                    statisDimens: "total",
                    subNum: "2",
                };
                this.$axios.post('https://haoxipeng.chinacloudapp.cn/scrm-1.0/rest/report/quarterly', param)
                    .then(response => {
                        console.log(response);
                        for (let i = 0; i < 4; i++) {
                            // option.dataset.source.push([
                            //     '第' + (i + 1) + '季度',
                            //     response.data.data.totalSalesList[i][0].salesAmount,
                            //     response.data.data.totalSalesList[i][0].salesCount,
                            // ])
                            option.series[0].data.push(response.data.data.totalSalesList[i][0].salesAmount / 10000);
                            option.series[1].data.push(response.data.data.totalSalesList[i][0].salesCount / 10000)
                        }
                        console.log(option)
                        // 绘制图表
                        myChart.setOption(option)
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message.error('Request Error, please check the console to find out what goes wrong.');
                    });
            },
        },
        mounted() {
            this.drawBar()
        },
    }
</script>

<style scoped>

</style>