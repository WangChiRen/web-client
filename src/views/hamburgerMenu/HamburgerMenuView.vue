<style scoped>


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


    .h1 {
        color: white;
        font-size: 30px;
        text-align: left;
    }

    .h2 {
        margin-top: 40px;
        color: white;
        font-size: 24px;
        text-align: left;
    }

    .h4 {

        color: white;
        font-size: 18px;
        line-height: 1.38;
        padding-top: 20px;
        text-align: left;

    }

    .hr {
        color: white;
        margin-top: 20px;
    }

    #shoppingCar {

        border-radius: 30px;
        margin-top: 40px;

    }

    #d2 {
        position: fixed;

        right: 50px;
        top: 75%;

    }

</style>


<template>
    <div>
        <el-container>


            <el-main class="body">
                <h1 class="h1">Ordering System</h1>
                <h2 class="h2">BURGERS</h2>
                <hr class="hr">
                <h4 class="h4">This is a section on your menu. Give your section a brief description</h4>
                <hr class="hr">

                <el-table
                        empty-text="暫無資料"
                        class="el-table"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column prop="id" label="編號" width="60" show-overflow-tooltip>
                        <template slot-scope="scope">{{serialNumber(scope.$index)}}</template>

                    </el-table-column>
                    <el-table-column
                            prop="commodity"
                            label="餐點圖片"
                            width="350px">
                        <template slot-scope="scope">
                            <img :src="getImageUrl(scope.row.commodity)" alt="餐點圖片">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="meals"
                            label="餐點名稱"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="descride"
                            label="餐點描述"
                            width="319">
                    </el-table-column>
                    <el-table-column
                            prop="unitprice"
                            label="單價"
                            width="80">
                    </el-table-column>

                    <el-table-column
                            prop="quantity"
                            label="數量"
                            align="center"
                            width="140">
                        <template slot-scope="scope">

                            <el-input-number :ref="'inputNumberRef' + scope.row.id" size="small"
                                             v-model="num[scope.row.id]"
                                             @change="handleChange(scope.row)" :min="0" :max="99"></el-input-number>

                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="recommend"
                            label="推薦指數"
                            width="180"
                            align="center">
                        <template slot-scope="scope">
                            <el-rate
                                    v-model="scope.row.recommend"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}"
                            ></el-rate>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                            width="200">
                        <template slot-scope="scope">
                            <el-button style="border-radius: 30px" type="primary"
                                       name="shoppingCart"
                                       icon="el-icon-shopping-cart-2" @click="shoppingCart(scope.row)">加入訂單
                            </el-button>
                        </template>
                    </el-table-column>


                </el-table>
                <!--查看詳情表單-->
                <div>
                    <el-button
                            id="shoppingCar"
                            type="danger"
                            icon="el-icon-shopping-cart-full"
                            @click="checkShoppingCar()">查看訂單詳情
                    </el-button>
                </div>
                <div>
                    <!--提交意見表單-->
                    <el-button id="d2" type="danger" icon="el-icon-chat-dot-round"
                               circle @click="opinion"></el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>


<script>

    import imageMixin from "@/mixins/imageMixin.js";

    export default {

        //設置編號
        //設置圖片顯示
        mixins: [imageMixin], //設置購物車的圖片顯示
        data() {
            let date = new Date();
            let time = new Date();
            return {
                serialCounter: 1,
                tableData: [],
                //初始化 el-input-number的值
                num: [],
                //當前時間
                schedule: time.toLocaleTimeString(),
                //當前日期
                today: date.getFullYear() + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0'),
            }
        },
        methods: {

            handleChange() {
                console.log("數量:", this.num);
            },

            //發請求呈現目錄數據
            loadMenu: function () {
                // 請求的路徑
                let url = "http://localhost:9083/hamburgers/list-menu";
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


            //加入訂單(發請求給後端)
            shoppingCart(row) {
                //獲取當前el-input-number中的值
                let inputValue = this.num[row.id];  // 使用行数据的 id 作为索引
                console.log("inputValue:", inputValue);

                let url = "http://localhost:9083/hamburgers/add-new";


                let allData = {
                    commodity: row.commodity,
                    unitprice: row.unitprice,
                    quantity: inputValue,
                    total: row.unitprice * (inputValue),
                    schedule: this.schedule,
                    today: this.today

                }
                console.log("commodity:", allData);

                //將數據發給後端
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .post(url, allData).then((response) => {
                    console.log("response是: " + response);
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '添加商品成功',
                            type: 'success'
                        });

                    } else if (response.data.code == 40900) {
                        this.$message.error(response.data.message);
                    }

                })

            },

            //跳轉至訂單詳情頁,(發請求給後端)查詢添加的項目
            checkShoppingCar() {
                this.$router.push('/hamburger/menu/shopping-car');
            },

            //意見表
            opinion() {
                this.$prompt('', '提交意見', {
                    confirmButtonText: '發送',
                    cancelButtonText: '取消',


                }).then(() => {
                    this.$message({
                        message: '已提交，感謝您的意見',
                        type: 'success'

                    });
                }).catch(() => {
                    this.$message({
                        message: '已取消提交',
                        type: 'error'
                    });
                });
            },


        },
        created() {
            //已創建>>>已創建，將在掛載並顯示頁面之前執行
            console.log('vue創建');
        },

        mounted() {
            // Mounted >>> 已掛載，創建後顯示頁面前執行
            console.log('vue掛載');
            this.loadMenu();

        }
    }


</script>
