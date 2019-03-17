<template>
    <el-row>
        <el-col>
            <SeasonTotal :year="totalYear"></SeasonTotal>
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
                totalYear: "2012"
            }
        }
    }
</script>

<style scoped>

</style>