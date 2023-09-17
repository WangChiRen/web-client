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
                <el-form-item style="width: 85%" label="用戶名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item style="width: 85%"  label="密碼" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',

                },
                rules: {
                    username: [
                        {required: true, message: '請輸入用戶名稱', trigger: 'blur'},
                        {min: 2, max: 16, message: '長度在 2 到 16 個字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '請輸入密碼', trigger: 'blur'},
                        {min: 2, max: 16, message: '長度在 2 到 16 個字符', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {



            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {


                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>