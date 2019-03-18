<template>
    <el-container>
        <el-aside width="200px">
            <HotMenu></HotMenu>
        </el-aside>
        <el-main>
            <div class="hello">
                <div id="myChart" :style="{width: '600px', height: '600px'}"></div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import HotMenu from '@/components/HotMenu'
    import echarts from 'echarts'
    export default {
        name: "Hot",
        data () {
            return {

            }
        },
        components: {
            'HotMenu': HotMenu,
        },
        mounted() {
            this.drawLine()
        },
        methods: {
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
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
                            data:[2.0, 4.9, 7.0, 23.2]
                        },
                        {
                            name:'金额',
                            type:'bar',
                            yAxisIndex: 1,
                            data:[2.6, 5.9, 9.0, 26.4]
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            }
        }
    }
</script>

<style scoped>

</style>