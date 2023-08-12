<style>
    * {
        margin: auto;

    }

    #con {
        position: relative;
    }

    .layout-header {
        position: relative;
        text-align: center;
        font-size: 20px;
        top: 0;
        bottom: 95%;
        left: 0;
        right: 0;
        width: 100%;


    }

    .layout-body {

        background-color: #162D3D;
        /*background-color: #32536A;*/
        bottom: 0;
        top: 20%;
        height: 1780px;
        width: 100%;
        left: 0;
        right: 0;
        text-align: center;


    }

    .layout-footer {

        text-align: center;
        background-color: white;


        font-size: 12px;
        line-height: 18px;

        margin-top: 20px;


    }




</style>

<template>

    <el-container id="con">

        <el-header class="layout-header">

            <h1>Ordering System</h1>
        </el-header>


        <el-main class="layout-body">




            <router-view/>
        </el-main>
        <el-footer class="layout-footer">

            <p>CONTACT Cliff ©版權所有</p>
            <p>服務專線 0930-099-850 免費體驗</p>
            <p>週一至週五 09:30-12:30 / 13:30-18:00</p>
            <p>非服務時段請填<a href="https://element.eleme.cn/#/zh-CN/component/container">
                表單留言
            </a>
            </p>

        </el-footer>






    </el-container>

</template>




