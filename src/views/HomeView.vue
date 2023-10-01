<style>

    * {
        margin: 0;
    }

    .layout-header {
        font-size: 32px;
        height: auto;
        background-color: #32536a;
        color: #ffffff;
    }

    .layout-aside {
        background-color: #32536a;

    }

    .layout-main {
        background-color: #32536A;

    }

    .layout-body {

        top: 60px;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .s1 {
        font-size: 16px;
    }
</style>


<template>
    <div>
        <el-container>

            <el-header class="layout-header">
                <h3>後台訂單系統</h3>
            </el-header>
            <el-container class="layout-body">
                <el-aside class="layout-aside">

                    <!-- el-menu表示整個菜單 -->
                    <!-- router屬性(不給值即表示true)：可將各菜單項的index作為URL進行跳轉-->
                    <el-menu router :default-active="this.$router.currentRoute.path" class="el-menu-vertical-demo">
                        <!-- el-submenu表示含子級的菜單，但本身並不是菜單項-->
                        <el-submenu index="1">
                            <!-- template用於配置包含子菜單的父級項-->
                            <template slot="title">
                                <i class="el-icon-goods"></i>
                                <span class="s1">訂單查詢</span>
                            </template>
                            <!-- el-menu-item 表示菜單項-->
                            <el-menu-item class="s1" index="/hamburger/order-management">訂單列表</el-menu-item>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-document-copy"></i>
                                <span class="s1">菜單管理</span>
                            </template>
                            <el-menu-item class="s1" index="/hamburger/add-menu">添加菜單</el-menu-item>
                            <el-menu-item class="s1" index="/hamburger/menu-list">菜單列表</el-menu-item>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span class="s1">員工管理</span>
                            </template>
                            <el-menu-item class="s1" index="/hamburger/admin">添加員工</el-menu-item>
                            <el-menu-item class="s1" index="/hamburger/admin-list">員工列表</el-menu-item>
                        </el-submenu>

                    </el-menu>
                </el-aside>
                <el-main class="layout-main">
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        methods: {

        },

    }
</script>




