<template slot-scope="scope">
    <div id=app>
        <el-table
                id="tab"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100% "
                :summary-method="getSummaries"
                show-summary
                @selection-change="handleSelectionChange"
                @row-click="getDetails">

            <template slot-scope="scope">

                <el-table-column type="selection" width="55"></el-table-column>

                <el-table-column prop="id" label="編號" width="180" show-overflow-tooltip>
                    <template slot-scope="scope">{{serialNumber(scope.$index)}}</template>
                    
                </el-table-column>

                <el-table-column prop="commodity" label="商品圖片" align="center" width="180">
                    <template slot-scope="scope">
                        <img :src="scope.row.commodity">
                    </template>
                </el-table-column>


                <el-table-column prop="unitprice" align="center" label="單價" width="150"></el-table-column>

                <el-table-column prop="quantity" label="數量" align="center" width="350" show-overflow-tooltip>
                    <template slot-scope="scope">

                        <el-input-number size="small" v-model="scope.row.quantity"
                                         @change="handleChange(scope.row.quantity,scope.row.id,scope.row.total,scope.row.unitprice)"
                                         :min="1"
                                         :max="99"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="total" align="center" label="總價" width="120"></el-table-column>


                <el-table-column fixed="right" label="操作" align="center" width="300">
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
            </template>
        </el-table>

        <div style="margin-top: 20px">
            <el-button type="info" round icon="el-icon-money" @click="returnToMenu()">返回點餐頁面</el-button>
            <el-button type="info" round icon="el-icon-user-solid" @click="returnToOrderManagement()">進入後台管理系統</el-button>
            <el-button type="danger" round icon="el-icon-bank-card" @click="orderAndCheckout()">點餐</el-button>

        </div>

    </div>

</template>

<script>


    export default {

        data() {
            return {
                tableData: [],
                multipleSelection: [],
                serialCounter: 1,
            }
        },
        computed: {
            ordernumber() {
                // 從本地存儲中獲取 ordernumber，如果沒有則默認為 0
                return parseInt(localStorage.getItem('ordernumber')) || 0;
            }
        },

        methods: {

            //設置編號
            serialNumber(index) {
                return index + this.serialCounter;
            },


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
                this.axios.post(url, allDate).then((response) => {
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '修改訂單成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(response.data.message);
                    }
                    // // 重新加載訂單列表
                    // this.loadShoppingCar();
                })
            },


            //計算當前數量總金額
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 2 || index === 1 || index === 0 || index === 6) {
                        sums[index] = '';
                        return;
                    } else if (index === 3) {
                        sums[index] = '總數/價格';
                        return;
                    }
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
                        sums[5] = sums[5] + ' 元';
                    }
                });
                return sums;
            },


            //發異步請求呈現數據
            loadShoppingCar: function () {
                let url = "http://localhost:9083/hamburgers";
                this.axios.get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000) {
                        this.tableData = json.data;

                    } else {
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
                this.axios.post(url).then((response) => {
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


            //確認是否點餐(發請求給後端)
            orderAndCheckout() {
                this.$confirm("確定要送出訂單", "提示", {
                    confirmButtonText: "確認",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    //發請求給後端
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


            setOrderNumber() {
                // 遞增 ordernumber 的值
                const newOrderNumber = this.ordernumber + 1;
                localStorage.setItem('ordernumber', newOrderNumber.toString());

                console.log("ordernumber:..." + newOrderNumber);

                let url = "http://localhost:9083/hamburgers/update-order";
                const requestData = { ordernumber: newOrderNumber }; // 將數據封裝為對象
                this.axios.post(url, requestData).then((response) => {
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
                this.axios.post(url).then((response) => {
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
                this.axios.post(url).then((response) => {
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
            returnToOrderManagement(){
                this.$router.push('/hamburger/order-management')
            },

            //回首頁
            returnToMenu() {
                this.$router.push('/hamburger/menu')
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },


        },

        created() {
            //
        },

        mounted() {
            this.loadShoppingCar();
        }
    }

</script>

