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
                            <span :row="7">{{ props.row.desc }}</span>
                        </el-form-item>
                        <el-form-item label="活动图片">
                            <!--<span>{{ props.row.img }}</span>-->
                            <span><img :src="props.row.img" style="width: 50%"/></span>
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
                <template slot-scope="scope">
                    {{ scope.row.desc | ellipsis }}
                </template>
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

                    <el-dialog title="修改活动信息" :visible.sync="dialogFormVisible">
                        <el-form :model="form">
                            <el-form-item label="活动名称" :label-width="formLabelWidth">
                                <el-input v-model="form.title" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="活动内容" :label-width="formLabelWidth">
                                <el-input v-model="form.desc" auto-complete="off" rows="7" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="起止时间" :label-width="formLabelWidth">
                                <el-date-picker
                                        v-model="form.time"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions2">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="活动图片" :label-width="formLabelWidth">
                                <el-input v-model="form.img" auto-complete="off"></el-input>
                                <img :src="form.img" style="width: 40%"/>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="changeActiv">确 定</el-button>
                        </div>
                    </el-dialog>

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
                dialogFormVisible: false,
                tableData: [{
                    id: '12987122',
                    title: '好滋好味鸡蛋仔',
                    desc: '江浙小吃、小吃零食',
                    img: '荷兰优质淡奶，奶香浓而不腻',
                    start: '1319068800',
                    end: '1318377600',
                }],
                form: {
                    id: '',
                    title: '',
                    desc: '',
                    img: '',
                    time: [],
                },
                formLabelWidth: '150px',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
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
            },
            handleEdit (index, row) {
                this.dialogFormVisible = true
                this.form.id = row.id;
                this.form.title = row.title;
                this.form.desc = row.desc;
                this.form.img = row.img;
                this.form.time = [row.start, row.end];
            },
            changeActiv () {
                this.dialogFormVisible = false
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
            },
            ellipsis (value) {
                if (!value) return ''
                if (value.length > 8) {
                    return value.slice(0,8) + '...'
                }
                return value
            }
        }
    }
</script>

<style scoped>
    .box-card {
        margin: 30px;
    }
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
