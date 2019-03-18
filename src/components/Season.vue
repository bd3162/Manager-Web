<template>
    <el-row>
        <el-col>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>总体销量统计</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div>
                    <SeasonTotal :year="totalYear"></SeasonTotal>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import SeasonTotal from '@/components/SeasonTotal'
    export default {
        name: "Season",
        components: {
            SeasonTotal: SeasonTotal,
        },
        data () {
            return {
                totalYear: "2011"
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 50%;
    }
</style>