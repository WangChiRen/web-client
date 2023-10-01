<style scoped>
    body {

        background-size: cover;
        text-align: center;
    }
    .form-signin{
        background-color: #32536A;
    }
    #h1{
        color: white;
    }


</style>

<template>
        <div class="form-signin" style="width: 600px;  margin: 300px auto; padding: 30px 40px; ">
            <h1 id="h1" style="text-align: center; margin: 20px 0;">管理員登錄</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item style="width: 85%" label="帳號" prop="account">
                    <template slot="label">
                        <span class="s1">帳號</span>
                    </template>
                    <el-input v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item style="width: 85%"  label="密碼" prop="password">
                    <template slot="label">
                        <span class="s1">密碼</span>
                    </template>
                    <el-input type="password" v-model="ruleForm.password" show-password></el-input>
                    <el-link style="margin-left: 330px "
                             type="primary"
                             :underline="false"
                             href="/hamburger/forget-password">忘記密碼?</el-link>
                </el-form-item>



                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
</template>

<script>

    import { admin } from '@/mixins/imageMixin';


    export default {

        //設置帳號密碼正則
        mixins: [admin],

        data() {
            return {
                ruleForm: {
                    account: '',
                    password: '',

                },
            };
        },
        methods: {



            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');

                        let url = "http://localhost:9083/hamburgers/login";
                        let data = {
                            account:this.ruleForm.account,
                            password:this.ruleForm.password
                        }
                        // 同源 - 跨域
                        this.axios.post(url,data).then( (response) => {
                            if(response.data.code == 20000){
                                this.$message({
                                    message:'登入成功',
                                    type:'success'
                                })
                                //獲取服務端響應的jwt並存入localStorage中
                                let jwt = response.data.data;
                                localStorage.setItem('jwt',jwt);
                                //跳轉到主頁
                                this.$router.push('/hamburger/order-management');
                            }else{
                                this.$message.error('登入失敗，帳號或密碼錯誤！')
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>