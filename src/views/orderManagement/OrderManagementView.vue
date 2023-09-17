<style>
    /*!* 調整不同螢幕寬度下的按鈕外邊距 *!*/
    /*@media (max-width: 768px) {*/
    /*    !*.layout-body {*!*/
    /*    !*    !*padding: 50px;*!*!*/
    /*    !*}*!*/
    /*    !*.layout-header {*!*/
    /*    !*    font-size: 20px;*!*/
    /*    !*}*!*/
    /*    !*.layout-aside {*!*/
    /*    !*    width: 30%;*!*/
    /*    !*}*!*/
    /*    !*.table1 {*!*/
    /*    !*    font-size: 10px;*!*/
    /*    !*}*!*/

    /*    !*.table {*!*/
    /*    !*    font-size: 14px;*!*/
    /*    !*    width: 50%;*!*/
    /*    !*}*!*/
    /*}*/

    /*@media (min-width: 769px) and (max-width: 1200px) {*/
    /*    !*.layout-body {*!*/
    /*    !*    !*padding: 80px;*!*!*/
    /*    !*}*!*/
    /*    !*.layout-header {*!*/
    /*    !*    font-size: 24px;*!*/

    /*    !*}*!*/
    /*    !*.layout-aside {*!*/
    /*    !*    width: 20%;*!*/
    /*    !*}*!*/
    /*    !*.table1 {*!*/
    /*    !*    font-size: 14px;*!*/
    /*    !*}*!*/

    /*    !*.table {*!*/
    /*    !*    font-size: 16px;*!*/
    /*    !*    width: 75%;*!*/
    /*    !*}*!*/
    /*}*/

    /*@media (min-width: 1201px) {*/
    /*    !*.layout-body {*!*/
    /*    !*    !*padding: 120px;*!*!*/
    /*    !*}*!*/
    /*    !*.layout-header {*!*/
    /*    !*    font-size: 36px;*!*/

    /*    !*}*!*/
    /*    !*.layout-aside {*!*/
    /*    !*    width: 15%;*!*/
    /*    !*}*!*/
    /*    !*.table1 {*!*/
    /*    !*    font-size: 16px;*!*/
    /*    !*}*!*/

    /*    !*.table {*!*/
    /*    !*    font-size: 18px;*!*/
    /*    !*    width: 100%;*!*/
    /*    !*}*!*/
    /*}*/

    .table1 {
        font-size: 14px;

    }

    .table {
        font-size: 18px;
        width: 100%;
height: 600px;
    }

    #icon-view {
        font-size: 25px;
    }

    .block {
        background-color: #32536A;
        margin-top: 20px;
    }


</style>


<template slot-scope="scope">
    <div>
        <el-table
                :data="tableData. slice ((currentPage-1)*pagesize,currentPage*pagesize)"
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
                    width="180">
            </el-table-column>

            <el-table-column
                    align="center"
                    prop="total"
                    label="訂單總金額"
                    width="280">
            </el-table-column>

            <el-table-column
                    align="center"
                    prop="city"
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button id="icon-view" icon="el-icon-view" type="text"
                               @click="showOrderDetails(scope.row.ordernumber)" size="small">
                    </el-button>


                    <el-dialog :append-to-body="true" title="訂單詳情" :visible.sync="dialogTableVisible"
                               width="900px" align="center" :key="dialogTableVisible">
                        <el-table class="table1" :data="selectedOrderData" slot-scope="scope">
                            <el-table-column prop="today" label="訂單日期" width="125" align="center">{{date}}
                            </el-table-column>
                            <el-table-column prop="schedule" label="訂單時間" width="125" align="center">
                            </el-table-column>
                            <el-table-column prop="id" label="訂單編號" width="100"
                                             align="center"></el-table-column>
                            <el-table-column prop="commodity" label="商品圖片" width="180" align="center">
                                <template slot-scope="scope">
                                    <img :src="getImageUrl(scope.row.commodity)" alt="餐點圖片">
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

        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[5, 10, 20, 40,100]"
                    layout="sizes, prev, pager, next, jumper"
                    :total="496">
            </el-pagination>
        </div>

        <el-button class="responsive-button" style="margin-top: 20px" type="info" round
                   icon="el-icon-shopping-cart-full"
                   @click="returnToShoppingCar()">返回訂單頁面
        </el-button>
        <el-button class="responsive-button" style="margin-top: 20px" type="info" round icon="el-icon-money"
                   @click="returnToMenu()">返回點餐頁面
        </el-button>
    </div>
</template>

<script>

    import imageMixin from "@/mixins/imageMixin";

    export default {

        //設定編號
        //返回點餐頁面
        //設置圖片顯示
        mixins: [imageMixin],

        data() {

            return {
                currentPage: 1, // el-pagination 初始頁
                pagesize: 8, // el-pagination 每頁的數據
                tableData: [],
                gridData: [],
                serialCounter: 1, // 新增這一行以初始化編號計數器
                dialogTableVisible: false,
                selectedOrderData: [], // 將相同的訂單添加到gridData中
                date: "", // 添加 date 属性
                time: "", // 添加 time 属性
            }
        },


        methods: {

            // 處理每頁顯示數量的變化
            handleSizeChange: function (size) {
                this.pagesize = size
            },
            // 處理頁碼的變化
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage
            },


            //返回訂單頁面
            returnToShoppingCar() {
                this.$router.push('/hamburger/menu/shopping-car')
            },

            //將相同的訂單添加到gridData中
            showOrderDetails(ordernumber) {
                this.selectedOrderData = this.gridData.filter(order => order.ordernumber === ordernumber);
                this.dialogTableVisible = true;
            },

            //從數據庫獲得數據並顯示
            loadOrderManagement: function () {
                let url = "http://localhost:9083/hamburgers/list-order";
                this.axios.get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000) {
                        this.tableData = json.data;
                        this.gridData = json.data;
                        this.processData(); // 處理數據，合併相同訂單號的訂單並計算總金額
                    } else {
                        this.$message.error(json.message);
                    }
                });
            },

            // 用於合併相同訂單號的訂單數據，計算其總金額並重新賦值給 tableData
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


            // adjustLayout() {
            //
            //     //window.innerWidth獲取視窗的寬度
            //     const windowWidth = window.innerWidth;
            //
            //
            //     // xs（小於768px）
            //     // sm（大於等於768px）
            //     // md（大於等於992px）
            //     // lg（大於等於1200）
            //
            //     //xs（小於768px）
            //     if (windowWidth <= 768) {
            //         document.querySelector('.layout-body').style.padding = '10px';
            //         document.querySelector('.layout-aside').style.padding = '10px';
            //     //sm尺寸大於等於768px,小於等於992px
            //     } else if (windowWidth > 768 && windowWidth <= 992) {
            //         document.querySelector('.layout-body').style.padding = '20px';
            //         document.querySelector('.layout-aside').style.padding = '20px';
            //     //md尺寸大於等於992px,小於等於1200px
            //     } else if(windowWidth > 992 && windowWidth <= 1200){
            //         document.querySelector('.layout-body').style.padding = '30px';
            //         document.querySelector('.layout-aside').style.padding = '30px';
            //         //lg大於等於1200px
            //     }else {
            //         document.querySelector('.layout-body').style.padding = '40px';
            //         document.querySelector('.layout-aside').style.padding = '40px';
            //     }
            // }


        },
        created() {

            // window.addEventListener('resize', this.adjustLayout);
            // // 頁面載入時初始化一次
            // window.addEventListener('load', this.adjustLayout);
        },
        mounted() {
            this.loadOrderManagement();

        },
    };
</script>
