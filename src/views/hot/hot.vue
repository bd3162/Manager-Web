<template>
    <div>
        <div id="hotChart" :style="{width: '1200px', height: '600px'}"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "hot",
        props: {
            period: Number, // 3.7.30.90.180
            statisDimens: String, // category.brand.product
            subNum: Number, // 1-7
            way: Number, // 1.2 销量.金额
        },
        data () { return{} },
        computed: {
            chart_width: function () {
                return 200 + 200 * this.subNum
            }
        },
        watch: {
            period: { handler (newValue) { this.period = newValue; this.drawBar(); } },
            statisDimens: { handler (newValue) { this.statisDimens = newValue; this.drawBar(); } },
            subNum: { handler (newValue) { this.subNum = newValue; this.drawBar(); } },
            way: { handler (newValue) { this.way = newValue; this.drawBar(); } },
        },
        mounted () { this.drawBar() },
        methods: {
            drawBar () {
                if (this.statisDimens == "category") { this.drawCate() }
                else if (this.statisDimens == "brand") { this.drawBrand() }
                else if (this.statisDimens == "product") { this.drawProd() }
                else {
                    this.$message.error('Wrong way to show, Check vue console!');
                }
            },
            drawCate () {
                console.log("By category.")
                let param = {
                    period: this.period,
                    statisDimens: this.statisDimens,
                    subNum: this.subNum,
                }
                this.$axios.post('https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/rest/report/hot', param)
                    .then(response => {
                        let dataAxis = [];
                        let data = [];
                        for (let category_object of response.data.data.categorySalesList[0]) {
                            dataAxis.push(category_object.category);
                            if (this.way == 1) {
                                data.push(category_object.salesCount);
                            }
                            else if (this.way == 2) {
                                data.push(category_object.salesAmount)
                            }
                        }
                        console.log(dataAxis);
                        console.log(data);
                        if (this.way == 1) {
                            this.drawCharts("类别", "销量", dataAxis, data)
                        }
                        else if (this.way == 2) {
                            this.drawCharts("类别", "金额", dataAxis, data)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message.error('Request Error, please check the console to find out what goes wrong.');
                    })
            },
            drawBrand () {
                console.log("By brand.")
                let param = {
                    period: this.period,
                    statisDimens: this.statisDimens,
                    subNum: this.subNum + 1,
                }
                this.$axios.post('https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/rest/report/hot', param)
                    .then(response => {
                        let dataAxis = [];
                        let data = [];
                        for (let brand_object of response.data.data.brandSalesList[0]) {
                            if (brand_object.brand != "null"){
                                dataAxis.push(brand_object.brand);
                                if (this.way == 1) {
                                    data.push(brand_object.salesCount);
                                }
                                else if (this.way == 2) {
                                    data.push(brand_object.salesAmount)
                                }
                            }
                        }
                        console.log(dataAxis);
                        console.log(data);
                        if (this.way == 1) {
                            this.drawCharts("品牌", "销量", dataAxis, data)
                        }
                        else if (this.way == 2) {
                            this.drawCharts("品牌", "金额", dataAxis, data)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message.error('Request Error, please check the console to find out what goes wrong.');
                    })
            },
            drawProd () {
                console.log("By product.")
                let param = {
                    period: this.period,
                    statisDimens: this.statisDimens,
                    subNum: this.subNum + 1,
                }
                this.$axios.post('https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/rest/report/hot', param)
                    .then(response => {
                        let dataAxis = [];
                        let data = [];
                        for (let brand_object of response.data.data.productSalesList[0]) {
                            if (brand_object.product != "null"){
                                dataAxis.push(this.ellipsis(brand_object.product));
                                if (this.way == 1) {
                                    data.push(brand_object.salesCount);
                                }
                                else if (this.way == 2) {
                                    data.push(brand_object.salesAmount)
                                }
                            }
                        }
                        console.log(dataAxis);
                        console.log(data);
                        if (this.way == 1) {
                            this.drawCharts("商品", "销量", dataAxis, data)
                        }
                        else if (this.way == 2) {
                            this.drawCharts("商品", "金额", dataAxis, data)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message.error('Request Error, please check the console to find out what goes wrong.');
                    })
            },
            drawCharts (statisDimens, way, dataAxis, data) {
                let subtext = way == 1 ? '单位: 个' : '单位: 元';
                let option = {
                    title: {
                        text: statisDimens + way + "报表",
                        subtext: way == '销量' ? '单位: 个' : '单位: 元'
                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : dataAxis,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:way,
                            type:'bar',
                            barWidth: '60%',
                            data:data,
                        }
                    ]
                };

                let myChart = echarts.init(document.getElementById('hotChart'), 'light')
                myChart.title = statisDimens + way + "报表"
                myChart.clear();
                myChart.setOption(option);
            },
            ellipsis (value) {
                if (!value) return ''
                if (value.length > 23) {
                    return value.slice(0,23) + '...'
                }
                return value
            },
        }
    }
</script>

<style scoped>

</style>
