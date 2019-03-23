<template>
    <el-row>
        <el-col>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    <el-select v-model="totalYear" placeholder="请选择">
                        <el-option
                                v-for="item in years"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <SeasonTotal :year="totalYear"></SeasonTotal>
                </div>
                <div>
                    <CatePie :year="totalYear"></CatePie>
                </div>
            </el-card>
        </el-col>
        <el-col>
            <el-card class="box-card">
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
  import season_total from './season_total'
  import season_pie from './season_pie'
  export default {
    name: "Season",
    components: {
      SeasonTotal: season_total,
      CatePie: season_pie,
    },
    data () {
      return {
        totalYear: "2007",
        years: [
          {
            value: '1998',
            label: '1998'
          }, {
            value: '1999',
            label: '1999'
          }, {
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
        width: 50%;
    }
</style>
