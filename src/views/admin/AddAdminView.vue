<style scoped>
    .s1 {
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
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

            <el-form-item class="form-item" label="姓名" prop="username">
                <template slot="label">
                    <span class="s1">姓名</span>
                </template>
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>

            <el-form-item class="form-item" label="帳號" prop="account">
                <template slot="label">
                    <span class="s1">帳號</span>
                </template>
                <el-input v-model="ruleForm.account"></el-input>
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

            <el-form-item class="form-item" label="電子郵箱" prop="mail">
                <template slot="label">
                    <span class="s1">電子郵箱</span>
                </template>
                <el-input v-model="ruleForm.mail"></el-input>
            </el-form-item>

            <el-form-item label="生日" prop="birthday">
                <template slot="label">
                    <span class="s1">生日</span>
                </template>
                <el-col :span="6">
                    <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.birthday"
                                    style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item class="form-item" label="權限" prop="description">
                <template slot="label">
                    <span class="s1">權限</span>
                </template>
                <el-select  v-model="ruleForm.description" placeholder="請選擇權限" >
                    <el-option
                            v-for="option in options"
                            :key="option.id"
                            :label="option.name"
                            :value="option.name">
                    </el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="是否啟用" prop="enable">
                <template slot="label">
                    <span class="s1">是否啟用</span>
                </template>
                <el-switch
                        class="el-switch"
                        style="margin-right: 1000px"
                        v-model="ruleForm.enable"
                        :active-value="1"
                        :inactive-value="0"
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

    import { admin } from '@/mixins/imageMixin';

    export default {

        //設置帳號密碼表單的驗證正則
        mixins: [admin],

        data() {

            return {
                options: [],

                ruleForm: {
                    username: '',
                    account: '',
                    password: '',
                    phone: '',
                    mail: '',
                    birthday: '',
                    enable: 1,
                    description:''
                },

            };
        },
        methods: {

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = "http://localhost:9083/hamburgers/add-ams";

                        const postData = {
                            username: this.ruleForm.username,
                            account: this.ruleForm.account,
                            password: this.ruleForm.password,
                            phone: this.ruleForm.phone,
                            mail: this.ruleForm.mail,
                            birthday: this.ruleForm.birthday,
                            enable: this.ruleForm.enable,
                            description:this.ruleForm.description,
                        };
                        this.axios
                            .create({headers: {'Authorization': localStorage.getItem('jwt')}})
                            .post(url, postData ).then((response) => {
                            console.log(response);
                            // 判断
                            if (response.data.code == 20000) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                })
                                this.$router.push('/hamburger/admin-list')
                            } else {
                                this.$message.error(response.data.message);
                            }

                        })
                    } else {
                        this.$message({
                            message: '添加失敗',
                            type: 'error'
                        })
                        return false;
                    }
                });
            },

            //從數據庫獲得數據並顯示
            loadAddAdminView: function () {
                let url = "http://localhost:9083/hamburgers/list-addAdmin";
                this.axios
                    .create({headers: {'Authorization': localStorage.getItem('jwt')}})
                    .get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000) {
                        this.options = json.data;
                        console.log("this.options:",this.options);
                    } else {
                        this.$message.error(json.message);
                    }
                });
            },

            //重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            // 在组件创建时调用获取数据的方法
            this.loadAddAdminView();
        },
    }
</script>



