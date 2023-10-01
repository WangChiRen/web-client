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


    .table {
        font-size: 18px;
        height: 587px;

    }

    .block {
        background-color: #32536A;
        margin-top: 20px;
        top: 0;
        bottom: 0;
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
                    width="130">
                <template slot-scope="scope">{{serialNumber(scope.$index)}}</template>
            </el-table-column>

            <el-table-column
                    align="center"
                    label="姓名"
                    prop="username"
                    width="100">
            </el-table-column>

            <el-table-column
                    align="center"
                    label="帳號"
                    prop="account"
                    width="180">
            </el-table-column>

            <el-table-column
                    align="center"
                    label="手機號碼"
                    prop="phone"
                    width="200">
            </el-table-column>

            <el-table-column
                    align="center"
                    label="電子郵箱"
                    prop="mail"
                    width="280">
            </el-table-column>

            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                            size="medium"
                            type="info"
                            icon="el-icon-edit"
                            circle
                            @click="handleEdit(scope.row.id,scope.row.username,scope.row.account,
                            scope.row.phone,scope.row.mail,scope.row.birthday,scope.row.enable,scope.row.description)"></el-button>
                    <el-button
                            v-if="scope.$index > 0"
                            @click="openDeleteConfirm(scope.row.id)"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            size="medium"></el-button>

                    <el-dialog :append-to-body="true" title="員工詳情" :visible.sync="dialogTableVisible"
                               width="750px" align="center">


                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">

                            <el-form-item style="width: 85%;" label="姓名" prop="username">
                                <el-input v-model="ruleForm.username"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%;" label="帳號" prop="account">
                                <el-input v-model="ruleForm.account"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%;" label="手機號碼" prop="phone">
                                <el-input v-model="ruleForm.phone"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%; " label="電子郵箱" prop="mail">
                                <el-input v-model="ruleForm.mail"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%; " label="生日" prop="birthday">
                                <el-col :span="8">
                                    <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.birthday"
                                                    style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>

                            <el-form-item style="width: 85%; " label="權限" prop="description" >
                                <el-select  v-model="ruleForm.description" placeholder="請選擇權限"   style="margin-right: 300px">
                                    <el-option

                                            v-for="option in options"
                                            :key="option.id"
                                            :label="option.name"
                                            :value="option.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item style="width: 85%" label="是否啟用" prop="enable">

                                <el-switch

                                        class="el-switch"
                                        style="margin-right: 400px"
                                        v-model="ruleForm.enable"
                                        :active-value="1"
                                        :inactive-value="0"
                                        active-color="#13ce66"
                                        inactive-color="#999">
                                </el-switch>

                            </el-form-item>

                        </el-form>

                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogTableVisible = false">取 消</el-button>
                                            <el-button type="primary"
                                                       @click="submitForm(ruleForm.id)">確 定</el-button>
                                        </span>
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
    </div>
</template>

<script>

    import imageMixin from "@/mixins/imageMixin";
    import {validationMixin} from "@/mixins/imageMixin";
    import {admin} from "@/mixins/imageMixin";

    export default {

        //設置帳號密碼表單的驗證正則
        //設定編號
        mixins: [imageMixin, validationMixin,admin],

        data() {

            return {
                currentPage: 1, // el-pagination 初始頁
                pagesize: 8, // el-pagination 每頁的數據
                tableData: [],

                dialogTableVisible: false,
                ruleForm: {
                    username: '',
                    account: '',
                    phone: '',
                    mail: '',
                    birthday: '',
                    enable: 1,
                    description:'',
                },

            }
        },


        methods: {

            submitForm(id) {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        // 發送表單內容
                        this.editSent(id);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //編輯訂單數據
            editSent(id) {
                console.log("將根據id=" + id + "修改訂單...");
                let url = "http://localhost:9083/hamburgers/" + id + "/update-admin";

                let allDate = {
                    username: this.ruleForm.username,
                    account: this.ruleForm.account,
                    phone: this.ruleForm.phone,
                    mail: this.ruleForm.mail,
                    birthday: this.ruleForm.birthday,
                    enable: this.ruleForm.enable,
                    description: this.ruleForm.description,
                }
                this.axios
                    .create({headers: {'Authorization': localStorage.getItem('jwt')}})
                    .post(url, allDate).then((response) => {
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '編輯員工列表成功！',
                            type: 'success'
                        });
                    }  else {
                        this.$message.error(response.data.message);
                    }
                    // 重新加載訂單列表
                    this.dialogTableVisible = false;
                    this.loadAdminListView();
                })
            },

            //確認是否刪除訂單數據
            openDeleteConfirm(id) {
                this.$confirm('確定刪除此員工?', '提示', {
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
                let url = "http://localhost:9083/hamburgers/" + id + "/delete-admin";
                this.axios
                    .create({headers: {'Authorization': localStorage.getItem('jwt')}})
                    .post(url).then((response) => {
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '刪除訂單成功',
                            type: 'success'
                        });
                        this.loadAdminListView();
                    } else {
                        this.$message.error(response.data.message);
                    }

                })
            },

            //從數據庫獲得數據並顯示
            loadAdminListView: function () {
                let url = "http://localhost:9083/hamburgers/list-ams";
                this.axios
                    .create({headers: {'Authorization': localStorage.getItem('jwt')}})
                    .get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000) {
                        this.tableData = json.data;

                    } else {
                        this.$message.error(json.message);
                    }
                });
            },

            //從數據庫獲得數據並顯示
            loadAdminListOptionView: function () {
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

            // 處理每頁顯示數量的變化
            handleSizeChange: function (size) {
                this.pagesize = size
            },
            // 處理頁碼的變化
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage
            },

            handleEdit(id, username, account, phone, mail, birthday, enable, description) {
                this.dialogTableVisible = true;
                this.ruleForm.id = id;
                this.ruleForm.username = username;
                this.ruleForm.account = account;
                this.ruleForm.phone = phone;
                this.ruleForm.mail = mail;
                this.ruleForm.birthday = birthday;
                this.ruleForm.enable = enable;
                this.ruleForm.description = description;

                console.log('enable:', this.ruleForm.enable);
            },
        },
        created() {
            this.loadAdminListOptionView();
        },
        mounted() {
            this.loadAdminListView();

        },
    };
</script>
