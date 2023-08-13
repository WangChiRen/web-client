<style>

    * {
        margin: 0;

    }

    .layout-header {
        font-size: 36px;

        height: auto;

        color: #2c3e50;
    }

    .layout-body {


        top: 60px;
        right: 0;
        bottom: 0;
        left: 0;
        background-size: cover;


    }

    .table1 {
        font-size: 14px;
    }

    .table {
        font-size: 18px;
        width: 100%;
    }


</style>


<template slot-scope="scope">
    <div>

        <el-container>
            <el-header class="layout-header">後台訂單系統</el-header>
            <el-container>
                <el-main class="layout-body">


                    <el-table
                            :data="tableData"
                            border
                            class="table">

                        <el-table-column
                                fixed
                                align="center"
                                prop="id"
                                label="編號"
                                width="180">
                            <template slot-scope="scope">{{serialNumber(scope.$index)}}</template>
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="today"
                                label="訂單日期"
                                width="180">{{date}}
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="schedule"
                                label="時間"
                                width="180">{{time}}
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="total"
                                label="訂單總金額"
                                width="280">
<!--                            {{getTotalAmount()}}-->
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="city"
                                label="操作"
                                width="180">
                            <template slot-scope="scope">
                                <el-button type="text" @click="showOrderDetails(scope.row.ordernumber)" size="small">查看</el-button>


                                <el-dialog :append-to-body="true" title="訂單詳情" :visible.sync="dialogTableVisible" width="900px" align="center" :key="dialogTableVisible">
                                    <el-table class="table1" :data="selectedOrderData" slot-scope="scope">
                                        <el-table-column prop="today" label="訂單日期" width="125" align="center">{{date}}
                                        </el-table-column>
                                        <el-table-column prop="schedule" label="訂單時間" width="125" align="center">{{time}}
                                        </el-table-column>
                                        <el-table-column prop="id" label="訂單編號" width="100"
                                                         align="center"></el-table-column>
                                        <el-table-column prop="commodity" label="商品圖片" width="180" align="center">
                                            <template slot-scope="scope">
                                                <img align="center" :src="scope.row.commodity">
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="unitprice" label="單價" width="110"
                                                         align="center"></el-table-column>
                                        <el-table-column prop="quantity" label="數量" width="90"
                                                         align="center"></el-table-column>
                                        <el-table-column prop="total" label="總價" width="110"
                                                         align="center"></el-table-column>
                                    </el-table>

                                </el-dialog>

                            </template>

                        </el-table-column>

                    </el-table>

                    <el-button style="margin-top: 20px" type="info" round icon="el-icon-shopping-cart-full" @click="returnToShoppingCar()">返回訂單頁面</el-button>
                    <el-button style="margin-top: 20px" type="info" round icon="el-icon-money" @click="returnToHamburgerMenu()">返回點餐頁面</el-button>

                </el-main>
            </el-container>
        </el-container>


    </div>
</template>

<script>
    export default {


        data() {

            return {
                tableData: [],
                gridData: [],
                serialCounter: 1, // 新增這一行以初始化編號計數器
                dialogTableVisible: false,
                selectedOrderData: [],// 新增這個數據屬性
            }
        },
        methods: {

            //返回訂單頁面
            returnToShoppingCar(){
                this.$router.push('/hamburger/menu/shopping-car')
            },

            //返回點餐頁面
            returnToHamburgerMenu(){
                this.$router.push('/hamburger/menu')
            },

            //將相同的訂單添加到gridData中
            showOrderDetails(ordernumber) {
                this.selectedOrderData = this.gridData.filter(order => order.ordernumber === ordernumber);
                this.dialogTableVisible = true;
            },

            //設定編號
            serialNumber(index) {
                return index + this.serialCounter;
            },

            //從數據庫獲得數據並顯示
            loadOrderManagement: function () {
                let url = "http://localhost:9083/hamburgers/list-order";
                this.axios.get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000) {
                        this.tableData = json.data;
                        this.gridData = json.data;
                        this.processData(); // 處理數據
                    } else {
                        this.$message.error(json.message);
                    }
                });
            },

            //儲相同訂單號的訂單數據
            processData() {
                const orderMap = {}; // 用於存儲相同訂單號的訂單數據
                this.tableData.forEach(order => {
                    const ordernumber = order.ordernumber;
                    if (!orderMap[ordernumber]) {
                        orderMap[ordernumber] = {
                            ...order,
                            total: 0 // 初始化總金額
                        };
                    }
                    orderMap[ordernumber].total += order.total; // 將總金額相加
                });

                // 將合併後的訂單數據重新賦值給 tableData
                this.tableData = Object.values(orderMap);
            },
        },
        created() {

        },
        mounted() {
            this.loadOrderManagement();

        },
    };
</script>
