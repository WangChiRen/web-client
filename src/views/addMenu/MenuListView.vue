<style scoped>

    /*更改表頭背景顏色*/
    /deep/ .el-table thead tr > th {
        background-color: #32536A;
        color: white;
        font-size: 16px;
    }

    /*更改表格每行背景颜色*/
    /deep/ .el-table tbody tr > td {
        background-color: #32536A;

    }

    /*更改表格每行背景顏色*/
    /deep/ .el-table tbody tr > td {
        background-color: #32536A !important;
        color: white;
        font-size: 16px;
    }


</style>


<template slot-scope="scope">
    <div>
        <el-table
                empty-text="暫無資料"
                class="el-table"
                :data="tableData"
                style="width: 100%">

            <el-table-column
                    align="center"
                    prop="id"
                    label="編號"
                    width="180">
                <template slot-scope="scope">{{serialNumber(scope.$index)}}</template>
            </el-table-column>

            <el-table-column
                    prop="commodity"
                    label="餐點圖片"
                    width="400">
                <template slot-scope="scope">
                    <img :src="getImageUrl(scope.row.commodity)" alt="餐點圖片">
                </template>
            </el-table-column>

            <el-table-column
                    prop="meals"
                    label="餐點名稱"
                    width="200">
            </el-table-column>

            <el-table-column
                    prop="descride"
                    label="餐點描述"
                    width="600">
            </el-table-column>

            <el-table-column
                    prop="unitprice"
                    label="單價"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="recommend"
                    label="推薦指數"
                    width="200"
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

            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                            size="medium"
                            type="info"
                            icon="el-icon-edit"
                            circle
                            @click="handleEdit(scope.row.id,scope.row.commodity,scope.row.meals,scope.row.unitprice,scope.row.recommend,scope.row.descride)"></el-button>
                    <el-button
                            @click="openDeleteConfirm(scope.row.id)"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            size="medium"></el-button>

                    <el-dialog :append-to-body="true" title="餐點詳情" :visible.sync="dialogTableVisible"
                               width="750px" align="center">


                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                            <el-form-item style="width: 85%;" label="餐點名稱" prop="meals">
                                <el-input v-model="ruleForm.meals"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%;" label="餐點單價" prop="unitprice">
                                <el-input v-model="ruleForm.unitprice"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%;" label="推薦指數" prop="recommend">
                                <el-input v-model="ruleForm.recommend"></el-input>
                            </el-form-item>

                            <el-form-item style="width: 85%; " label="餐點描述" prop="descride">
                                <el-input v-model="ruleForm.descride" type="textarea"></el-input>
                            </el-form-item>

                            <el-form-item
                                    style="display: flex; justify-content: flex-start; height: 200px;"
                                    label="原始圖片" prop="commodity">
                                <template slot-scope="scope">
                                    <img v-if="ruleForm.commodity" :src="getImageUrl(ruleForm.commodity)"
                                         alt="rule原始圖片">
                                </template>
                            </el-form-item>

                            <el-form-item
                                    style="display: flex; justify-content: flex-start; height: 200px;"
                                    label="替換圖片" prop="commodity">

                                <el-upload

                                        ref="upload"
                                        :action="yourBackendUploadURL"
                                        name="picFile"
                                        :limit="1"
                                        list-type="picture-card"
                                        :on-preview="handlePictureCardPreview"
                                        :on-success="handleSuccess"
                                        :on-exceed="handleExceed"
                                        :before-upload="beforeUpload"
                                        :auto-upload="false">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
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
    </div>
</template>


<script>

    import imageMixin from "@/mixins/imageMixin";
    import {validationMixin} from "@/mixins/imageMixin";

    export default {

        //上傳圖片超過1個以上時的檔案時提醒
        //上傳圖片前的處理
        //處理表單驗證判斷的規範
        //處理圖片預覽
        //設定編號
        //設置圖片顯示
        mixins: [imageMixin,validationMixin],

        data() {
            return {
                yourBackendUploadURL: "http://localhost:9083/hamburgers/edit-upload",
                dialogVisible: false,
                dialogImageUrl: '',
                tableData: [],
                serialCounter: 1, // 新增這一行以初始化編號計數器
                dialogTableVisible: false,
                ruleForm: {
                    meals: '',
                    unitprice: '',
                    recommend: '',
                    descride: '',
                    commodity: '',
                },
            }
        },
        methods: {

            //從數據庫獲得數據並顯示
            loadMenuListView: function () {
                let url = "http://localhost:9083/hamburgers/list-edit-menu";
                this.axios.get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000) {
                        this.tableData = json.data;
                    } else {
                        this.$message.error(json.message);
                    }
                });
            },


            handleEdit(id, commodity, meals, unitprice, recommend, descride) {
                this.dialogTableVisible = true;
                this.ruleForm.id = id;
                this.ruleForm.commodity = commodity;
                this.ruleForm.meals = meals;
                this.ruleForm.unitprice = unitprice;
                this.ruleForm.recommend = recommend;
                this.ruleForm.descride = descride;
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
                let url = "http://localhost:9083/hamburgers/" + id + "/delete-menu";
                this.axios.post(url).then((response) => {
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '刪除訂單成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(response.data.message);
                    }

                })
            },

            //圖片上傳成功後調用的方法
            handleSuccess(response, file, fileList) {
                console.log("修改成功，服務器返回的數據：", response);
                if (response.code === 20000) {
                    // 將生成的文件名設置到 ruleForm.commodity
                    this.ruleForm.commodity = response.data;
                    this.$message.success("修改圖片成功！");
                    // 重新加載訂單列表
                    this.loadMenuListView();

                } else {
                    this.$message.error(response.message);
                    // 上傳失敗時，從上傳列表中移除失敗的文件
                    const index = fileList.indexOf(file);
                    if (index !== -1) {
                        fileList.splice(index, 1);
                    }

                }

                this.fileList = fileList;
            },

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
                let url = "http://localhost:9083/hamburgers/" + id + "/edit-sent";
                let allDate = {
                    meals: this.ruleForm.meals,
                    unitprice: this.ruleForm.unitprice,
                    recommend: this.ruleForm.recommend,
                    descride: this.ruleForm.descride,
                    commodity: this.ruleForm.commodity,

                }
                this.axios.post(url, allDate).then((response) => {
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '修改表單成功',
                            type: 'success'
                        });
                        this.$refs.upload.submit();
                    } else {
                        this.$message.error(response.data.message);
                    }
                    // 重新加載訂單列表
                    this.dialogTableVisible = false;
                    this.loadMenuListView();
                })
            },
        },

        mounted() {
            this.loadMenuListView();

        },
    }
</script>


