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
                    prop="name"
                    width="100">
            </el-table-column>

            <el-table-column
                    align="center"
                    label="帳號"
                    prop="username"
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
                    prop="email"
                    width="280">
            </el-table-column>

            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                            size="medium"
                            type="info"
                            icon="el-icon-edit"
                            circle
                            @click="handleEdit()"></el-button>
                    <el-button
                            @click="openDeleteConfirm()"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            size="medium"></el-button>

                    <el-dialog :append-to-body="true" title="員工詳情" :visible.sync="dialogTableVisible"
                               width="750px" align="center">


                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">

                            <el-form-item style="width: 85%;" label="姓名" prop="username">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%;" label="帳號" prop="username">
                                <el-input v-model="ruleForm.username"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%;" label="密碼" prop="password">
                                <el-input v-model="ruleForm.password"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%;" label="手機號碼" prop="phone">
                                <el-input v-model="ruleForm.phone"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%; " label="電子郵箱" prop="email">
                                <el-input v-model="ruleForm.email"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%; " label="生日" prop="email">
                                <el-col :span="6">
                                    <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>

                            <el-form-item style="width: 85%" label="是否啟用" prop="enable">
                                <el-switch
                                        class="el-switch"
                                        style="margin-right: 400px"
                                        v-model="ruleForm.enable"
                                        active-value="1"
                                        inactive-value="0"
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

    export default {

        //設定編號
        mixins: [imageMixin, validationMixin],

        data() {

            return {
                currentPage: 1, // el-pagination 初始頁
                pagesize: 8, // el-pagination 每頁的數據
                tableData: [{
                    name:'王曉明',
                    username: 'A1111',
                    phone:'0930099850',
                    email:'a877331@gmail.com',
                },],


                dialogTableVisible: false,
                ruleForm: {
                    name:'',
                    username: '',
                    phone:'',
                    email:'',
                    enable:1,
                },

            }
        },


        methods: {

            // 處理每頁顯示數量的變化
            handleSizeChange: function (size) {
                this.pagesize = size
            },
            // 處理頁碼的變化
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage
            },

            handleEdit() {
                this.dialogTableVisible = true;

            },
        },
        created() {

        },
        mounted() {


        },
    };
</script>
