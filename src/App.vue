<template>
    <div id="app">
        <HeaderNav/>
        <router-view/>
    </div>
</template>

<script>
    import Sider from './components/Nav/Sider'
    import Header from './components/Nav/Header'
    export default {
        name: 'App',
        components: {
            SiderNav: Sider,
            HeaderNav: Header,
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
    /*.el-header, .el-footer {*/
        /*text-align: center;*/
        /*line-height: 60px;*/
    /*}*/

    /*.el-aside {*/
        /*text-align: center;*/
        /*line-height: 200px;*/
    /*}*/

    /*.el-main {*/
        /*text-align: center;*/
        /*line-height: 160px;*/
    /*}*/

    /*body > .el-container {*/
        /*margin-bottom: 40px;*/
    /*}*/

    /*.el-container:nth-child(5) .el-aside,*/
    /*.el-container:nth-child(6) .el-aside {*/
        /*line-height: 260px;*/
    /*}*/

    /*.el-container:nth-child(7) .el-aside {*/
        /*line-height: 320px;*/
    /*}*/
</style>
