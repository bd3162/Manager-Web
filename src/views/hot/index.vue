<template>
    <el-row>
        <el-col>
            <el-card class="box-card">
                <h1>热销商品统计</h1>
                <div slot="header" class="clearfix">
                    <span>选择查询时间范围: </span>
                    <el-select v-model="period" placeholder="请选择">
                        <el-option
                                v-for="item in period_list"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <span>选择统计维度: </span>
                    <el-select v-model="statisDimens" placeholder="请选择">
                        <el-option
                                v-for="item in statisDimens_list"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <span>选择统计量: </span>
                    <el-select v-model="way" placeholder="请选择">
                        <el-option
                                v-for="item in way_list"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <span>选择个数: </span>
                    <el-input-number v-model="subNum" :min="1" :max="10" label="描述文字"></el-input-number>
                </div>
                <el-row :gutter="24">
                    <el-col :span="10">
                        <Hotchart :period="period" :statisDimens="statisDimens" :subNum="subNum" :way="way"></Hotchart>
                    </el-col>
                    <el-col :span="10">

                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import hot from './hot'
    export default {
        name: "index",
        components: {
            Hotchart: hot,
        },
        data () {
            return {
                period: 3,
                statisDimens: 'category',
                subNum: 5,
                way: 1,
                way_list: [
                    {
                        value: 1,
                        label: '销量',
                    }, {
                        value: 2,
                        label: '金额',
                    }
                ],
                period_list: [
                    {
                        value: 3,
                        label: "近三天"
                    }, {
                        value: 7,
                        label: "近一周"
                    }, {
                        value: 30,
                        label: "近一月"
                    }, {
                        value: 90,
                        label: "近三月"
                    }, {
                        value: 180,
                        label: "近半年"
                    },
                ],
                statisDimens_list: [
                    {
                        value: "category",
                        label: "按类别"
                    }, {
                        value: "brand",
                        label: "按品牌"
                    }, {
                        value: "product",
                        label: "按单个商品"
                    },
                ],
            }
        }
    }
</script>

<style scoped>
    .box-card {
        margin: 30px;
    }
</style>
