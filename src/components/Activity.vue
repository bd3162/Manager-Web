<template>
    <el-card class="box-card">
        <el-table
                :data="tableData"
                style="width: 100%"
        >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="活动名称">
                            <span>{{ props.row.title }}</span>
                        </el-form-item>
                        <el-form-item label="活动描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                        <el-form-item label="活动图片">
                            <span>{{ props.row.img }}</span>
                        </el-form-item>
                        <el-form-item label="开始时间">
                            <span>{{ props.row.start | unixTimeFilter }}</span>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <span>{{ props.row.end | unixTimeFilter }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="活动名称"
                    prop="title">
            </el-table-column>
            <el-table-column
                    label="活动内容"
                    prop="desc">
            </el-table-column>
            <el-table-column
                    label="活动状态"
                    prop="start">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    export default {
        name: "Activity",
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            handleEdit (index, row) {
                console.log(index, row);
            },
            handleDelete (index, row) {
                console.log(index, row);
            },
        },
        data () {
            return {
                tableData: [{
                    id: '12987122',
                    title: '好滋好味鸡蛋仔',
                    desc: '江浙小吃、小吃零食',
                    img: '荷兰优质淡奶，奶香浓而不腻',
                    start: '1319068800',
                    end: '1318377600',
                }]
            }
        },
        computed: {
            stat () {

            }
        },
        mounted() {
            this.getActivities()
        },
        methods: {
            getActivities () {
                this.$axios({
                    methods: 'GET',
                    url: 'https://haoxipeng.chinacloudapp.cn/scrm-1.0/activity/selectList',
                    data: this.qs.stringify({

                    }),
                })
                    .then(response => {
                        console.log(response)
                        for (let activity of response.data.list) {
                            this.tableData.push({
                                id: activity.id,
                                title: activity.activ_title,
                                desc: activity.activ_desc,
                                img: activity.activ_img,
                                start: activity.start_date,
                                end: activity.end_date,
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message.error('Request Error, please check the console to find out what goes wrong.');
                    })
            }
        },
        filters: {
            unixTimeFilter (value) {
                let date = new Date(value * 1000);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d;
            }
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>