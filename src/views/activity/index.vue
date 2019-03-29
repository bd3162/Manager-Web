<template>
    <el-card class="box-card">
        <h1>商店活动</h1>
        <el-popover
                placement="right"
                width="600"
                v-model="popoverFormVisible">
            <el-form :model="form" label-width="100px" ref="form">
                <el-form-item label="活动名称">
                    <el-input v-model="addForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动内容">
                    <el-input v-model="addForm.desc" auto-complete="off" rows="7" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="起止时间">
                    <el-date-picker
                            v-model="addForm.time"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="timestamp"
                            format="yyyy-MM-dd"
                            :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="活动图片">
                    <el-input v-model="addForm.img" auto-complete="off"></el-input>
                    <img :src="addForm.img" style="width: 60%; margin-top: 5%"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addActivity" round>立即创建</el-button>
                    <el-button type="warning" @click="popoverFormVisible = false" round>取消</el-button>
                </el-form-item>
            </el-form>
            <el-button slot="reference" type="primary" round>添加活动</el-button>
        </el-popover>
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
                <template slot-scope="scope">
                    {{ scope.row.start | stat(scope.row.end) }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)" round>编辑</el-button>

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
                                        value-format="timestamp"
                                        format="yyyy-MM-dd"
                                        :picker-options="pickerOptions2">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="活动图片" :label-width="formLabelWidth">
                                <el-input v-model="form.img" auto-complete="off"></el-input>
                                <img :src="form.img" style="width: 40%; margin-top: 5%"/>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="warning" @click="undoChange" round>取 消</el-button>
                            <el-button type="primary" @click="changeActiv" round>确 定</el-button>
                        </div>
                    </el-dialog>

                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)" round>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    export default {
        name: "Activity",
        methods: {
            handleEdit (index, row) {
                console.log(index, row);
            },
            handleDelete (index, row) {
                console.log(index, row);
            },
        },
        data () {
            return {
                addForm: {
                    title: '',
                    desc: '',
                    img: '',
                    time: [],
                },
                dialogFormVisible: false,
                popoverFormVisible: false,
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
                formLabelWidth: '180px',

                //
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

        },
        mounted() {
            this.getActivities()
        },
        methods: {
            getSTime (val) {
                this.addForm.time = val;
            },
            onSubmit () {
                console.log('submit!');
            },
            // 添加活动
            addActivity () {
                console.log("type:" + typeof this.addForm.time[0])
                console.log("time: "+this.addForm.time)
                this.$axios({
                    method: 'POST',
                    url: 'https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/activity/add',
                    data: this.qs.stringify({
                        activ_title: this.addForm.title,
                        activ_img: this.addForm.img,
                        activ_desc: this.addForm.desc,
                        start_date: parseInt(this.addForm.time[0]/1000),
                        end_date: parseInt(this.addForm.time[1]/1000)
                    })
                })
                    .then(response => {
                        if (response.data.success) {
                            this.$message({
                                message: 'Success to add activity. Congrats!',
                                type: 'success',
                            });
                            this.popoverFormVisible = false;
                            this.addForm.title = '';
                            this.addForm.desc = '';
                            this.addForm.time = [];
                            this.addForm.img = '';
                            this.getActivities()
                        }
                        else {
                            this.$message({
                                message: 'Fail to add activity. Shame!',
                                type: 'warning',
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message.error('Request Error, please check the console to find out what goes wrong.');
                    })
            },
            getActivities () {
                this.tableData = [];
                this.$axios({
                    method: 'GET',
                    url: 'https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/activity/selectList',
                    data: this.qs.stringify({

                    }),
                })
                    .then(response => {
                        console.log(response);
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
            handleDelete (index, row) {
                this.$axios.get(`https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/activity/delete?activity_id=${row.id}`)
                    .then(response => {
                        if(response.data.success){
                            this.$message({
                                message: 'Success to delete activity. Congrats!',
                                type: 'success',
                            });
                            this.getActivities()
                        }
                        else {
                            this.$message({
                                message: 'Failed to delete activity. Shame!',
                                type: 'warning'
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message.error('Request Error, please check the console to find out what goes wrong.');
                    })
            },
            handleEdit (index, row) {
                this.dialogFormVisible = true;
                console.log(typeof row.id);
                this.$axios({
                    method: 'GET',
                    url: `https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/activity/selectById?id=${row.id}`,
                    // data: {
                    //     id: 4
                    // }
                })
                    .then(response => {
                        this.form.id = response.data.id;
                        this.form.title = response.data.activ_title;
                        this.form.desc = response.data.activ_desc;
                        this.form.img = response.data.activ_img;
                        this.form.time = [response.data.start_date*1000, response.data.end_date*1000];
                    })
                    .catch(error => {
                        console.log(error)
                    })

            },
            undoChange () {
                this.dialogFormVisible = false;
                this.form.id = '';
                this.form.title = '';
                this.form.desc = '';
                this.form.img = '';
                this.form.time = [];
            },
            changeActiv () {
                this.dialogFormVisible = false;
                this.$axios({
                    method: 'POST',
                    url: 'https://wsw.chinanorth.cloudapp.chinacloudapi.cn/scrm-1.0/activity/Modify',
                    data: this.qs.stringify({
                        id: this.form.id,
                        activ_title: this.form.title,
                        activ_img: this.form.img,
                        activ_desc: this.form.desc,
                        start_date: parseInt(this.form.time[0]/1000),
                        end_date: parseInt(this.form.time[1]/1000)
                    })
                })
                    .then(response => {
                        if(response.data.success){
                            this.$message({
                                message: 'Success to update activity. Congrats!',
                                type: 'success',
                            });
                            this.getActivities()
                        }
                        else {
                            this.$message({
                                message: 'Failed to update activity. Shame!',
                                type: 'warning'
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
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
            },
            ellipsis (value) {
                if (!value) return ''
                if (value.length > 8) {
                    return value.slice(0,8) + '...'
                }
                return value
            },
            stat(start, end) {
                let now = Date.parse(new Date()) / 1000;
                if (now < start && start < end) {
                    return "未开始"
                }
                else if (now < end && start < now) {
                    return "进行中"
                }
                else if (now > end && end > start) {
                    return "已结束"
                }
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
