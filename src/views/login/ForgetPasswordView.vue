<style scoped>
    body {

        background-size: cover;
        text-align: center;
    }

    .form-signin {
        background-color: #32536A;
    }

    #h1 {
        color: white;
    }

    .s1 {
        color: white;
    }


</style>

<template>
    <div class="form-signin" style="width: 600px;  margin: 300px auto; padding: 30px 40px; ">
        <h1 id="h1" style="text-align: center; margin: 20px 0;">密碼服務中心</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item style="width: 85% " label="帳號" prop="account">
                <template slot="label">
                    <span class="s1">帳號</span>
                </template>
                <el-input placeholder="請輸入帳號" v-model="ruleForm.account"></el-input>
            </el-form-item>

            <el-form-item style="width: 85%" label="新密碼" prop="password">
                <template slot="label">
                    <span class="s1">新密碼</span>
                </template>
                <el-input placeholder="請輸入新密碼" v-model="password1" show-password></el-input>
            </el-form-item>

            <el-form-item style="width: 85%" label="確認密碼" prop="password">
                <template slot="label">
                    <span class="s1">確認密碼</span>
                </template>
                <el-input placeholder="確認新密碼" v-model="password2" show-password></el-input>
            </el-form-item>

            <el-button type="primary" @click="openUpdateConfirm()">送出</el-button>

        </el-form>
    </div>
</template>

<script>

    import {admin} from '@/mixins/imageMixin';


    export default {

        //設置帳號密碼正則
        mixins: [admin],

        data() {
            return {
                ruleForm: {
                    account: '',
                    password: '',
                },
                password1: '',
                password2: '',
            };
        },
        methods: {

            //確認是否送出新密碼數據
            openUpdateConfirm() {
                this.$confirm('確定送出嗎?', '提示', {
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.submitForm();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },


            submitForm() {

                if (this.password1 === this.password2) {
                    console.log("password1:", this.password1);
                    console.log("password2:", this.password2);

                    let url = "http://localhost:9083/hamburgers/update-password";

                    let data = {
                        account: this.ruleForm.account,
                        password: this.password2
                    }
                    // 同源 - 跨域
                    this.axios
                        .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                        .post(url, data).then((response) => {
                        if (response.data.code == 20000) {
                            this.$message({
                                message: '修改密碼成功,請用新密碼登入',
                                type: 'success'
                            })
                            // //獲取服務端響應的jwt並存入localStorage中
                            // let jwt = response.data.data;
                            // localStorage.setItem('jwt', jwt);
                            //跳轉到主頁
                            this.$router.push('/hamburger/login');
                        } else {
                            this.$message.error('修改密碼失敗，請重新嘗試！')
                        }
                    })
                } else {
                    this.$message.error('修改密碼失敗，帳號或密碼有誤！')
                }
            },
        }
    }
</script>