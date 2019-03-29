<template>
    <el-row>
        <el-col>
            <el-card class="box-card">
                <h1>年度报表及各季度销量统计</h1>
                <div slot="header" class="clearfix">
                    <span>选择年份: </span>
                    <el-select v-model="totalYear" placeholder="请选择">
                        <el-option
                                v-for="item in years"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!--<div>-->
                    <!--<SeasonTotal :year="totalYear"></SeasonTotal>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<CatePie :year="totalYear"></CatePie>-->
                <!--</div>-->
                <el-row :gutter="24">
                    <el-col :span="10">
                        <div><SeasonTotal :year="totalYear"></SeasonTotal></div>
                    </el-col>
                    <el-col :span="10">
                        <div><CatePie :year="totalYear"></CatePie></div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
  import season_total from './season_total'
  import season_pie from './season_pie'
  import force from './force'
  export default {
    name: "Season",
    components: {
      SeasonTotal: season_total,
      CatePie: season_pie,
        ForceTo: force,
    },
    data () {
      return {
        totalYear: "2011",
        years: [
          {
            value: '2000',
            label: '2000'
          }, {
            value: '2001',
            label: '2001'
          }, {
            value: '2002',
            label: '2002'
          }, {
            value: '2003',
            label: '2003'
          }, {
            value: '2004',
            label: '2004'
          }, {
            value: '2005',
            label: '2005'
          }, {
            value: '2006',
            label: '2006'
          }, {
            value: '2007',
            label: '2007'
          }, {
            value: '2008',
            label: '2008'
          }, {
            value: '2009',
            label: '2009'
          }, {
            value: '2010',
            label: '2010'
          }, {
            value: '2011',
            label: '2011'
          }
        ]
      }
    }
  }
</script>

<style scoped>
    .box-card {
        margin: 30px;
    }
</style>
