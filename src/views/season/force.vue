<template>
    <div>
        <div id="myChart3" :style="{width: '600px', height: '600px'}"></div>
    </div>
</template>

<script>
    export default {
        name: "force",
        data () {
            return {

            }
        },
        methods: {
            drawForce () {
                let webkitDep = {
                    categories:[{name: "测试行政区位"},       //关系网类别
                        {name: "省人民政府关于同意从江县部分乡镇行政区划调整的批复"},
                        {name: "水城县４个乡撤乡设镇获省政府批复"}],
                    nodes:[{category: 0, name: "测试行政区位", value: 5, id: 0},  //展示的节点 //category与关系网类别索引对应 //我的源数据中没有id属性，这里放出来的是目标数据，id是自动生成的
                        {category: 1, name: "省人民政府关于同意从江县部分乡镇行政区划调整的批复", value: 3, id: 1},
                        {category: 1, name: "丙妹镇", value: 1, id: 2},
                        {category: 1, name: "行政区域", value: 1, id: 3},
                        {category: 2, name: "水城县４个乡撤乡设镇获省政府批复", value: 3, id: 4},
                        {category: 2, name: "水城县", value: 1, id: 5},
                        {category: 2, name: "行政区划调整", value: 1, id: 6}],
                    links:[{source: 0, target: 1, value: 5},    //节点之间连接 //source起始节点，0表示第一个节点  //target目标节点，1表示与索引(id)为1的节点进行连接
                        {source: 1, target: 2, value: 3},
                        {source: 1, target: 3, value: 3},
                        {source: 0, target: 4, value: 5},
                        {source: 4, target: 5, value: 3},
                        {source: 4, target: 6, value: 3}
                    ]
                }
                let option = {
                    legend: {
                        x: 'left',//图例位置
                        //图例的名称
                        //此处的数据必须和关系网类别中name相对应
                        data: webkitDep.categories.map(function (a) {
                            return a.name;
                        })
                    },
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        // animation: false,
                        label: {
                            normal: {
                                show:true,
                                position: 'right'
                            }
                        },
                        draggable: true,
                        force: {
                            layoutAnimation:true,
                            // xAxisIndex : 0, //x轴坐标 有多种坐标系轴坐标选项
                            // yAxisIndex : 0, //y轴坐标
                            gravity:0.03,  //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                            edgeLength: 55,  //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                            repulsion: 150  //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                        },
                        data: webkitDep.nodes.map(function (node, idx) {  //node数据
                            node.id = idx;
                            return node;
                        }),
                        categories: webkitDep.categories,  //关系网类别，可以写多组
                        edges: webkitDep.links  //link数据
                    }]
                };
                let myChart4 = echarts.init(document.getElementById('myChart3'))
                // myChart4.clear()
                myChart4.setOption(option)
            }
        },
        mounted () {

        }
    }
</script>

<style scoped>

</style>
