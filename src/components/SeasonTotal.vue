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
                let option = {
                    title: { text: this.year + '年季度销量金额数据' },
                    legend: {},
                    tooltip: {},
                    dataset: {
                        source: [
                            ['统计方式', '销量', '金额'],
                            // ['第一季度', 43.3, 85.8],
                            // ['第二季度', 83.1, 73.4],
                            // ['第三季度', 86.4, 65.2],
                            // ['第四季度', 72.4, 53.9]
                        ]
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
                };
                let myChart = echarts.init(document.getElementById('myChart'))

                let param = {
                    year: "2011",
                    statisDimens: "total",
                    subNum: "2",
                };
                this.$axios.post('https://haoxipeng.chinacloudapp.cn/scrm-1.0/rest/report/quarterly', param)
                    .then(response => {
                        console.log(response);
                        for (let i = 0; i < 4; i++) {
                            option.dataset.source.push([
                                '第' + (i + 1) + '季度',
                                response.data.data.totalSalesList[i][0].salesAmount,
                                response.data.data.totalSalesList[i][0].salesCount,
                            ])
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