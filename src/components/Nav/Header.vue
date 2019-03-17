<template>
    <div>
        <el-menu
                :default-active="this.$router.path"
                router
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
        >
            <el-menu-item v-for="(item, index) in navList" :key="index" :index="item.name">
                {{ item.navItem }}
            </el-menu-item>
        </el-menu>
        <div class="line"></div>

    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                navList: [
                    {name: '/activity', navItem: '商店活动'},
                    {name: '/hot', navItem: '热销商品'},
                    {name: '/season', navItem: '季度报表'}
                ],
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>