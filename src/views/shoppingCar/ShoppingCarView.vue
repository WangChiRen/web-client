<style scoped>

    .header {
        background-color: #32536A;
        color: white;
        width: 1536px;
    }

    .body {
        position: absolute;
        /*background-color: #162D3D;*/
        background-color: #32536A;
    }


    /*更改表頭背景顏色*/
    /deep/ .el-table thead tr > th {
        background-color: #32536A;
        color: white;
        font-size: 10px;
    }

    /*更改表格每行背景颜色*/
    /deep/ .el-table tbody tr > td {
        background-color: #32536A;
        font-size: 8px;
    }

    /*更改表格每行背景顏色*/
    /deep/ .el-table tbody tr > td {
        background-color: #32536A !important;
        color: white;

    }
    .el-table{
        height: 2560px;
        width: 100%;
        background-color: #32536A;
        color: white;
    }

    .shoppingCar {

        border-radius: 30px;
        margin-top: 40px;

    }
    .hr {
        color: white;
        margin-top: 20px;
    }

</style>


<template slot-scope="scope">
    <div id=app>

        <div class="header">
            <h1>Ordering System</h1>
            <hr class="hr">
        </div>

        <div class="body">
            <el-table
                    class="el-table"
                    empty-text="暫無資料"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"

                    :summary-method="getSummaries"
                    show-summary
                    @selection-change="handleSelectionChange"
                    @row-click="getDetails">


                <el-table-column prop="id" label="編號" width="180" show-overflow-tooltip>
                    <template slot-scope="scope">{{serialNumber(scope.$index)}}</template>

                </el-table-column>

                <el-table-column prop="commodity" label="商品圖片" align="center" width="300">
                    <template slot-scope="scope">
                        <img :src="getImageUrl(scope.row.commodity)" alt="餐點圖片">
                    </template>
                </el-table-column>


                <el-table-column prop="unitprice" align="center" label="單價" width="400"></el-table-column>

                <el-table-column prop="quantity" label="數量" align="center" width="200" show-overflow-tooltip>
                    <template slot-scope="scope">

                        <el-input-number size="small" v-model="scope.row.quantity"
                                         @change="handleChange(scope.row.quantity,scope.row.id,scope.row.total,scope.row.unitprice)"
                                         :min="1"
                                         :max="99"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="total" align="center" label="總價" width="350"></el-table-column>


                <el-table-column  label="操作" align="center" width="106">
                    <template slot-scope="scope">
                        <el-button
                                @click="openDeleteConfirm(scope.row.id)"
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                size="medium">
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>

            <div style="margin-top: 20px;margin-bottom: 20px">
                <el-button class="shoppingCar" type="info" round icon="el-icon-money" @click="returnToMenu()">返回點餐頁面</el-button>
                <el-button class="shoppingCar" type="info" round icon="el-icon-user-solid" @click="returnToOrderManagement()">進入後台管理系統
                </el-button>
                <el-button class="shoppingCar" type="danger" round icon="el-icon-bank-card" @click="orderAndCheckout()">點餐</el-button>

            </div>

        </div>
    </div>
</template>

<script>

    import imageMixin from "@/mixins/imageMixin.js";

    export default {

        //設置圖片顯示
        //設置編號
        mixins: [imageMixin],

        data() {
            return {
                tableData: [],
                multipleSelection: [],
                serialCounter: 1,
                isConfirmedToLeave: false,
            }
        },


        computed: {
            // 從本地存儲中獲取 ordernumber，如果沒有則默認為 0
            ordernumber() {

                return parseInt(localStorage.getItem('ordernumber')) || 0;
            },

        },

        methods: {

            //顯示當前訂單資訊
            getDetails(row) {
                console.log(row)//拿到整行的信息
            },

            //訂單操作數量並修改總價
            handleChange(quantity, id, total, unitprice) {
                // 根據新的數量和單價計算新的總計
                total = quantity * unitprice;
                // 在tableData數組中查找具有匹配id的項目
                const itemToUpdate = this.tableData.find(item => item.id === id);
                // 使用新的總計更新找到的項目的總計屬性
                if (itemToUpdate) {
                    itemToUpdate.quantity = quantity; // 更新數量
                    itemToUpdate.total = total;// 更新總數
                }

                console.log("編號是:" + id + " ,數量是:" + quantity + " ,總價是:" + total + ",單價是:" + unitprice);
                this.handleEdit(quantity, id, total);
            },

            //修改訂單操作
            handleEdit(quantity, id, total) {
                console.log("將根據id=" + id + "修改訂單...");
                let url = "http://localhost:9083/hamburgers/" + id + "/update";
                let allDate = {
                    quantity: quantity,
                    total: total,
                }
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .post(url, allDate).then((response) => {
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '修改訂單成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(response.data.message);
                    }

                })
            },

            //計算表格的列匯總信息
            getSummaries(param) {
                // columns 表示表格的列信息，data 表示表格的數據
                const {columns, data} = param;
                const sums = [];
                // 遍歷每一列
                columns.forEach((column, index) => {
                    // 對於某些特定的列，不需要進行匯總
                    if (index === 0 || index === 1 || index === 5) {
                        sums[index] = '';
                        return;

                        // 為第三列設置標題
                    } else if (index === 2) {
                        sums[index] = '總數/價格';
                        return;
                    }

                    // 計算當前列的數值總和
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        // 將第五列的總和轉化為元單位
                        sums[5] = sums[5] + ' 元';
                    }
                });
                return sums; // 返回計算得到的匯總數據
            },


            //發請求呈現數據
            loadShoppingCar: function () {
                // 請求的路徑
                let url = "http://localhost:9083/hamburgers/list-shopping-car";
                // 用get請求查詢數據並呈現
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .get(url).then((response) => {
                    //response代表服務器響應對象
                    //response.data代表服務器響應的數據
                    let json = response.data;
                    //json.code == 20000代表請求成功
                    if (json.code == 20000) {
                        //將數據添加到 tableData 中
                        this.tableData = json.data;
                    } else {
                        //如果失敗返回失敗訊息
                        this.$message.error(json.message);
                    }
                })
            },

            //確認是否刪除訂單數據
            openDeleteConfirm(id) {
                this.$confirm('確定刪除此訂單?', '提示', {
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //刪除訂單數據
            handleDelete(id) {
                console.log("將根據id=" + id + "刪除訂單...");
                let url = "http://localhost:9083/hamburgers/" + id + "/delete";
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .post(url).then((response) => {
                    //response代表服務器響應對象
                    //response.data代表服務器響應的數據
                    //response.data.code == 20000代表請求成功
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '刪除訂單成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(response.data.message);
                    }
                    // 重新加載訂單列表
                    this.loadShoppingCar();
                })
            },


            //確認是否點餐
            orderAndCheckout() {
                this.$confirm("確定要送出訂單", "提示", {
                    confirmButtonText: "確認",
                    cancelButtonText: "取消",
                    type: "warning",
                })

                    .then(() => {
                        //將訂單送出給後台系統
                        //修改OrderNumber數據
                        //刪除購物車內全部訂單
                        this.setOrderNumber();
                    })
                    .catch(() => {
                        this.$message({
                            type: "error",
                            message: "已取消",
                        });
                    });
            },

            // 遞增訂單號 ordernumber 的值
            setOrderNumber() {
                // 遞增 ordernumber 的值
                const newOrderNumber = this.ordernumber + 1;
                localStorage.setItem('ordernumber', newOrderNumber.toString());


                console.log("ordernumber:..." + newOrderNumber);

                // 構建後端請求的 URL
                let url = "http://localhost:9083/hamburgers/update-order";

                // 將數據封裝為json對象
                const requestData = {ordernumber: newOrderNumber};

                // 發送 POST 請求給後端
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .post(url, requestData).then((response) => {
                    console.log("response是: " + response);
                    if (response.data.code == 20000) {
                        this.backendSystem();
                    } else if (this.tableData.length == 0) {
                        this.$message({
                            message: '當前無任何訂單',
                            type: 'error'
                        });
                    } else {
                        this.$message.error(response.data.message);
                    }
                });
            },


            //將訂單送出給後台系統
            backendSystem() {
                let url = "http://localhost:9083/hamburgers/add-order";

                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .post(url).then((response) => {
                    console.log("response是: " + response);
                    if (response.data.code == 20000) {
                        this.foodDelivery();
                    } else if (this.tableData.length == 0) {
                        this.$message({
                            message: '當前無任何訂單',
                            type: 'error'
                        });
                    } else {
                        this.$message.error(response.data.message);
                    }
                });
            },

            //點餐(刪除全部的訂單數據)
            foodDelivery() {
                let url = "http://localhost:9083/hamburgers/deleteByData";
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .post(url).then((response) => {
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '送出訂單成功',
                            type: 'success'
                        });
                    } else if (this.tableData.length == 0) {
                        this.$message({
                            message: '當前無任何訂單',
                            type: 'error'
                        });
                    } else {
                        this.$message.error(response.data.message);
                    }
                    // 重新加載訂單列表
                    this.loadShoppingCar();
                })
            },

            //進入後台管理系統
            returnToOrderManagement() {
                this.$router.push('/hamburger/order-management')
            },


            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            deleteAllOrderData() {
                let url = "http://localhost:9083/hamburgers/deleteShoppingCartData";
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .post(url).then((response) => {
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '離開成功',
                            type: 'success'
                        });

                    } else {
                        this.$message.error(response.data.message);
                    }
                })

            },


        },

        created() {

            // 添加一个标志变量来跟踪是否刷新页面
            let isRefreshing = false;

           // 添加一个事件监听器来处理 beforeunload 事件
            window.addEventListener('beforeunload', (event) => {
                if (!isRefreshing) {
                    event.returnValue = "你確定要離開嗎？";
                    this.deleteAllOrderData();
                }
            });
        },

        mounted() {
            this.loadShoppingCar();
        }
    }

</script>

