<template>
    <div class="hello">
        <div id="myChart" :style="{width: '500px', height: '500px'}"></div>
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
                this.$axios({
                    methods: 'POST',
                    url: '/rest/report/quarterly',
                    data: this.qs.stringify({
                        year: this.year,
                        statisDimens: "total",
                        subNum: "2",
                    }),
                })
                    .then(response => {
                        for (let i = 0; i < 4; i++) {
                            option.dataset.source.push(['第' + (i + 1) + '季度', response.data.totalSalesList[i].salesAmount, response.data.totalSalesList[i].salesCount])
                        }
                    })
                    .catch(error => {
                        this.$message.error('Request Error, please check the console to find out what goes wrong.');
                    })
                // 绘制图表
                myChart.setOption(option)
            },
        },
        mounted() {
            this.drawBar()
        },
    }
</script>

<style scoped>

</style>