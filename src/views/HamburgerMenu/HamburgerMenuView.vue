<style>
    * {
        margin: 0 auto;

    }

    .layout-body {

        background-color: #162D3D;
        /*background-color: #32536A;*/

        height: 2500px;
        width: 100%;
        overflow-x: hidden;
    }

    .hr {
        color: white;
        width: 110%;
        margin-top: 20px;


    }

    .h2 {

        font-size: 38px;
        color: white;
        width: 800px;
        text-align: left;

    }

    .h4 {

        color: white;
        font-size: 20px;
        line-height: 1.38;
        padding-top: 20px;

    }

    .left-img {


        padding-top: 80px;
        width: 35%;
        font-size: 16px;

    }

    .s1 {
        position: absolute;
        padding-left: 40px;
        padding-top: 80px;
        font-size: 16px;

    }

    .s2 {
        position: absolute;

        padding-left: 40px;
        padding-top: 135px;
        font-size: 16px;

    }

    #d2 {
        position: fixed;
        right: 20px;
        top: 75%;

    }

    .el-rate {
        margin-top: -25px;

        margin-left: 200px;

    }


    .s3 {
        color: chocolate;
        position: absolute;
        margin-left: 25px;
        margin-top: 16px;
    }

    .inx {
        margin-top: 20px;
    }


</style>


<template>
    <div>

        <el-container id="con">

            <el-header class="layout-header">

                <h1>Ordering System</h1>
            </el-header>


            <el-main class="layout-body">

                <h2 class="h2">BURGERS
                    <hr class="hr">
                    <h4 class="h4">This is a section on your menu. Give your section a brief description
                        <hr class="hr">
                        <img class="left-img" :src="commodity[0]">
                        <span class="s1">Classic Burger.....................................................................................-NT{{unitPrice[0]}}</span>
                        <span class="s2">This is an item on your menu. Give your item a brief description
                        <p>
                            <el-button id="shop1" style="border-radius: 30px;margin-top: 32px" type="primary"
                                       name="shoppingCart"
                                       icon="el-icon-shopping-cart-2" @click="shoppingCart(0)">加入訂單</el-button>

                              <span class="s3">QYT

                                   <template>
                                       <el-input-number class="inx" ref="inputNumberRef0" size="small" v-model="num[0]"
                                                        @change="handleChange()" :min="0" :max="99"></el-input-number>
                                   </template>
                                       <el-rate class="el-rate" v-model="score[0]" disabled show-score
                                                text-color="#ff9900" score-template="{value}"></el-rate>
                              </span>
                        </p>
                        </span>


                    </h4>

                    <img class="left-img" :src="commodity[1]">
                    <span class="s1">Bacon Cheese Burger.........................................................................-NT{{unitPrice[1]}} </span>
                    <span class="s2">This is an item on your menu. Give your item a brief description

                    <p>
                        <el-button id="shop2" style="border-radius: 30px;margin-top: 32px" type="primary"
                                   icon="el-icon-shopping-cart-2" @click="shoppingCart(1)">加入訂單</el-button>
                                       <span class="s3">QYT
                                            <template>
                                                <el-input-number class="inx" ref="inputNumberRef1" size="small"
                                                                 v-model="num[1]" @change="handleChange()" :min="0"
                                                                 :max="99"></el-input-number>
                                            </template>
                          <el-rate class="el-rate" v-model="score[1]" disabled show-score
                                   text-color="#ff9900" score-template="{value}"></el-rate>
                        </span>
                    </p>

                    </span>

                    <h4>
                        <img class="left-img" :src="commodity[2]">
                        <span class="s1">Onion Burger........................................................................................-NT{{unitPrice[2]}}</span>
                        <span class="s2">This is an item on your menu. Give your item a brief description
                        <p>
                            <el-button id="shop3" style="border-radius: 30px;margin-top: 32px" type="primary"
                                       icon="el-icon-shopping-cart-2" @click="shoppingCart(2)">加入訂單
                            </el-button>
                                    <span class="s3">QYT

                                         <template>
                                             <el-input-number class="inx" ref="inputNumberRef2" size="small"
                                                              v-model="num[2]" @change="handleChange()" :min="0"
                                                              :max="99"></el-input-number>
                                         </template>
                                       <el-rate class="el-rate" v-model="score[2]" disabled show-score
                                                text-color="#ff9900" score-template="{value}"></el-rate>
                                    </span>
                        </p>
                        </span>
                    </h4>
                    <h4>
                        <img class="left-img" :src="commodity[3]">
                        <span class="s1">Chicken n Cheese Burger...................................................................-NT{{unitPrice[3]}}</span>
                        <span class="s2">This is an item on your menu. Give your item a brief description

                        <p>
                       <el-button id="shop4" style="border-radius: 30px;margin-top: 32px" type="primary"
                                  icon="el-icon-shopping-cart-2" @click="shoppingCart(3)">加入訂單
                       </el-button>
                            <span class="s3">QYT
                                 <template>
                                        <el-input-number class="inx" ref="inputNumberRef3" size="small" v-model="num[3]"
                                                         @change="handleChange()" :min="0" :max="99"></el-input-number>
                                 </template>
                                <el-rate class="el-rate" v-model="score[3]" disabled show-score
                                         text-color="#ff9900" score-template="{value}"></el-rate>
                                    </span>
                                 </p>

                         </span>


                    </h4>

                    <hr class="hr" style="margin-bottom: 20px">
                    <h2 class="h2">SIDE DISHES</h2>
                    <hr class="hr">
                    <h4 class="h4">This is a section on your menu. Give your section a brief description
                        <img class="left-img" :src="commodity[4]">
                        <span class="s1">French Fries.........................................................................................-NT{{unitPrice[4]}}</span>
                        <span class="s2">This is an item on your menu. Give your item a brief description
                             <p>
                    <el-button id="shop5" style="border-radius: 30px;margin-top: 32px" type="primary"
                               icon="el-icon-shopping-cart-2" @click="shoppingCart(4)">加入訂單
                    </el-button>
                              <span class="s3">QYT


                                   <template>
                                      <el-input-number class="inx" ref="inputNumberRef4" size="small" v-model="num[4]"
                                                       @change="handleChange()" :min="0" :max="99"></el-input-number>
                                   </template>
                                       <el-rate class="el-rate" v-model="score[4]" disabled show-score
                                                text-color="#ff9900" score-template="{value}"></el-rate>
                              </span>
                                     </p>
                            </span>
                    </h4>
                    <h4>
                        <img class="left-img" :src="commodity[5]">
                        <span class="s1">Potato Wedges.....................................................................................-NT{{unitPrice[5]}}</span>
                        <span class="s2">This is an item on your menu. Give your item a brief description
                            <p>
                                <el-button id="shop6" style="border-radius: 30px;margin-top: 32px" type="primary"
                                           icon="el-icon-shopping-cart-2" @click="shoppingCart(5)">加入訂單</el-button>
                               <span class="s3">QYT
                                    <template>
                                      <el-input-number class="inx" ref="inputNumberRef5" size="small" v-model="num[5]"
                                                       @change="handleChange()" :min="0" :max="99"></el-input-number>
                                    </template>
                               <el-rate class="el-rate" v-model="score[5]" disabled show-score
                                        text-color="#ff9900" score-template="{value}"></el-rate>
                               </span>
                            </p>
                        </span>
                    </h4>
                    <h4>
                        <img class="left-img" :src="commodity[6]" alt="">
                        <span class="s1">Onion Rings..........................................................................................-NT{{unitPrice[6]}}</span>
                        <span class="s2">This is an item on your menu. Give your item a brief description
                        <p>
                        <el-button id="shop7" style="border-radius: 30px;margin-top: 32px" type="primary"
                                   icon="el-icon-shopping-cart-2" @click="shoppingCart(6)">加入訂單
                        </el-button>
                            <span class="s3">QYT
                       <template>
                            <el-input-number class="inx" ref="inputNumberRef6" size="small" v-model="num[6]"
                                             @change="handleChange()" :min="0" :max="99"></el-input-number>
                               </template>

                                <el-rate class="el-rate" v-model="score[6]" disabled show-score
                                         text-color="#ff9900" score-template="{value}"></el-rate>
                            </span>
                        </p>
                        </span>
                    </h4>
                    <h4>
                        <img class="left-img" :src="commodity[7]">
                        <span class="s1">Mashed Potatoes.................................................................................-NT{{unitPrice[7]}}</span>
                        <span class="s2">This is an item on your menu. Give your item a brief description
                        <p>
                             <el-button id="shop8" style="border-radius: 30px;margin-top: 32px" type="primary"
                                        icon="el-icon-shopping-cart-2" @click="shoppingCart(7)">加入訂單
                             </el-button>
                            <span class="s3">QYT
                                <template>
                                    <el-input-number class="inx" ref="inputNumberRef7" size="small" v-model="num[7]"
                                                     @change="handleChange()" :min="0" :max="99"></el-input-number>

                                         <el-rate class="el-rate" v-model="score[7]" disabled show-score
                                                  text-color="#ff9900" score-template="{value}"></el-rate>

                                        </template>



                            </span>
                        </p>
                        </span>
                    </h4>
                    <!--查看詳情表單-->
                    <el-button id="shoppingCar" style="border-radius: 30px; margin-left: 700px;margin-top: 60px"
                               type="danger"
                               icon="el-icon-shopping-cart-full" @click="checkShoppingCar()">查看訂單詳情
                    </el-button>


                </h2>
                <!--提交意見表單-->
                <el-button id="d2" type="danger" icon="el-icon-chat-dot-round"
                           circle @click="opinion"></el-button>

                <router-view/>

            </el-main>
            <el-footer class="layout-footer">

                <p>CONTACT Cliff ©版權所有</p>
                <p>服務專線 0930-099-850 免費體驗</p>
                <p>週一至週五 09:30-12:30 / 13:30-18:00</p>
                <p>非服務時段請填表單留言</p>

            </el-footer>


        </el-container>
    </div>
</template>


<script>


    export default {
        data() {
            let date = new Date();
            let time = new Date();
            return {
                //初始化 el-input-number的值
                num: [0, 0, 0, 0, 0, 0, 0, 0],
                //當前時間
                schedule: time.toLocaleTimeString(),
                //當前日期
                today: date.getFullYear() + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0'),
                //商品總價
                total: '',
                //星級評分
                score: [4.5, 4.8, 4.7, 4.1, 4.3, 3.8, 3.5, 4.2],
                //商品單價
                unitPrice: [300, 300, 280, 250, 100, 120, 120, 120],
                //圖片數據
                commodity: ["https://static.wixstatic.com/media/587218504902455a9f4d574097a2e078.png/v1/fill/w_280,h_157,usm_1.20_1.00_0.01/file.webp",
                    "https://static.wixstatic.com/media/84770f_0b15783879f9488cafd401a2306cbad8~mv2_d_3181_2416_s_4_2.jpg/v1/fill/w_280,h_157,usm_1.20_1.00_0.01/file.webp",
                    "https://static.wixstatic.com/media/84770f_32e9f0da623c415da14f6d91d0d5e6cb~mv2_d_3192_2915_s_4_2.jpg/v1/fill/w_280,h_157,usm_1.20_1.00_0.01/file.webp",
                    "https://static.wixstatic.com/media/11062b_8ab8b7dca9d247a289443b87be7de0b5~mv2.jpe/v1/fill/w_280,h_157,usm_1.20_1.00_0.01/file.webp",
                    "https://static.wixstatic.com/media/84770f_e245702982884702bec277015e7d6429~mv2_d_3030_3031_s_4_2.jpg/v1/fill/w_280,h_157,usm_1.20_1.00_0.01/file.webp",
                    "https://static.wixstatic.com/media/84770f_cadcdaed8575438b984a90e6e11ffbef~mv2.jpg/v1/fill/w_280,h_157,usm_1.20_1.00_0.01/file.webp",
                    "https://static.wixstatic.com/media/23e772f1e4904e868c628a76adab0373.jpg/v1/fill/w_280,h_157,usm_1.20_1.00_0.01/file.webp",
                    "https://static.wixstatic.com/media/84770f_421e128b8675474ea7c30424ee4e4a68~mv2_d_5472_3648_s_4_2.jpg/v1/fill/w_280,h_157,usm_1.20_1.00_0.01/file.webp",
                ],


            }
        },
        methods: {

            handleChange(value) {
                console.log(value);
            },

            //加入訂單(發請求給後端)
            shoppingCart(x) {
                //獲取當前el-input-number中的值
                let inputValue = this.$refs['inputNumberRef' + x].value;
                console.log("in" + x + ":" + inputValue);

                let url = "http://localhost:9083/hamburgers/add-new";
                if ((inputValue <= 0) || (inputValue >= 100) || isNaN(inputValue)) {
                    this.$message({
                        message: '添加商品失敗，請檢查商品數量',
                        type: 'error'
                    });
                } else {

                    let allData = {
                        commodity: this.commodity[x],
                        unitprice: this.unitPrice[x],
                        quantity: inputValue,
                        total: (this.unitPrice[x]) * (inputValue),
                        schedule: this.schedule,
                        today: this.today

                    }
                    console.log("schedule:" + this.schedule);
                    console.log("today:" + this.today);
                    console.log("allData的數據是:" + allData)
                    console.log("商品" + x + "的總金額是:" + (this.unitPrice[x]) * (inputValue));


                    //將數據發給後端
                    this.axios.post(url, allData).then((response) => {
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

                }

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

        }
    }


</script>
