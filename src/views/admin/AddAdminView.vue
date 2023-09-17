<style scoped>
    .s1{
        color: white;
    }

    .form-item {
        width: 45%;
    }

    .custom-buttons {
        display: flex;

        margin-top: 159px;
    }



</style>

<template slot-scope="scope">
    <div >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

            <el-form-item class="form-item" label="姓名" prop="name">
                <template slot="label">
                    <span class="s1">姓名</span>
                </template>
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item class="form-item" label="帳號" prop="username">
                <template slot="label">
                    <span class="s1">帳號</span>
                </template>
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>

            <el-form-item class="form-item" label="密碼" prop="password">
                <template slot="label">
                    <span class="s1">密碼</span>
                </template>
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item class="form-item" label="手機號碼" prop="phone">
                <template slot="label">
                    <span class="s1">手機號碼</span>
                </template>
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>

            <el-form-item class="form-item" label="電子郵箱" prop="email">
                <template slot="label">
                    <span class="s1">電子郵箱</span>
                </template>
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>

            <el-form-item label="生日">
                <template slot="label">
                    <span class="s1">生日</span>
                </template>
                <el-col :span="6">
                    <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
                </el-col>

            </el-form-item>

            <el-form-item label="是否啟用" prop="enable">
                <template slot="label">
                    <span class="s1">是否啟用</span>
                </template>
                <el-switch
                        class="el-switch"
                        style="margin-right: 1000px"
                        v-model="ruleForm.enable"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#999">
                </el-switch>
            </el-form-item>

            <el-form-item class="custom-buttons">
                <el-button type="primary" @click="submitForm('ruleForm')">創建</el-button>
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
                    phone: '',
                    email: '',
                    birthday:'',
                    enable: 1
                },
                rules: {
                    username: [
                        {required: true, message: '請輸入用戶名', trigger: 'blur'},
                        {min: 4, max: 15, message: '長度在 4 到 15 個字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '請輸入密碼', trigger: 'blur'},
                        {min: 4, max: 15, message: '長度在 4 到 15 個字符', trigger: 'blur'}
                    ],
                    email:[
                        { pattern:  /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za -z]{2,}$/,required: true, message: '信箱輸入有誤', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {

            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>



