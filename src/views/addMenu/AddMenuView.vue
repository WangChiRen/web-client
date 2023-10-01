<style scoped>


    .custom-buttons {
        display: flex;
        margin-top: 10px;
    }


    .form-item {
        width: 60%;

    }
    .s1{
        color: white;
    }

</style>


<template slot-scope="scope">
    <div>


        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"
                 class="demo-ruleForm">

            <el-form-item class="form-item" label="餐點名稱" prop="meals">
                <template slot="label">
                    <span class="s1">餐點名稱</span>
                </template>
                <el-input v-model="ruleForm.meals"></el-input>
            </el-form-item>

            <el-form-item class="form-item" label="餐點單價" prop="unitprice">
                <template slot="label">
                    <span class="s1">餐點單價</span>
                </template>
                <el-input v-model="ruleForm.unitprice"></el-input>
            </el-form-item>

            <el-form-item class="form-item" label="推薦指數" prop="recommend">
                <template slot="label">
                    <span class="s1">推薦指數</span>
                </template>
                <el-input v-model="ruleForm.recommend"></el-input>
            </el-form-item>

            <el-form-item class="form-item" label="餐點描述" prop="descride">
                <template slot="label">
                    <span class="s1">餐點描述</span>
                </template>
                <el-input type="textarea" v-model="ruleForm.descride"></el-input>
            </el-form-item>

            <!--  :action 必選參數，上傳的地址-->
            <!--  :on-preview="handlePreview"點擊文件列表中已上傳的文件時的鉤子-->
            <!--  :on-success="handleSuccess"文件上傳成功時的鉤子-->
            <!--  :on-remove="handleRemove"文件列表移除文件時的鉤子-->
            <!--  :on-exceed="handleExceed"檔案超出個數限制時的鉤子-->
            <!--   :before-upload="beforeUpload"上傳前的處理方法-->
            <!--    :auto-upload="false"是否在選取文件後立即進行上傳-->
            <!--   :headers="headers"設置上傳的請求頭部-->
            <!--  :limit="1"最大允許上傳個數-->
            <el-form-item style="display: flex; justify-content: flex-start; height: 300px;"
                          label="上傳圖片" prop="commodity">
                <template slot="label">
                    <span class="s1">上傳圖片</span>
                </template>
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
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>


            <el-form-item class="custom-buttons">
                <el-button type="primary" @click="submitForm('ruleForm')">創建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import imageMixin from "@/mixins/imageMixin";
    import { validationMixin } from '@/mixins/imageMixin';

    export default {

        //上傳圖片超過1個以上時的檔案時提醒
        //上傳圖片前的處理
        //處理表單驗證判斷的規範
        //處理圖片預覽
        mixins: [imageMixin,validationMixin],

        data() {
            return {
                pictureName: '',
                dialogImageUrl: '',
                dialogVisible: false,
                yourBackendUploadURL: "http://localhost:9083/hamburgers/upload",
                fileList: [],
                ruleForm: {
                    // 初始值設置
                    meals: "",
                    unitprice: null,
                    recommend: null,
                    descride: "",
                    url: ""
                },
                formData: new FormData(),
            };
        },
        methods: {

            //圖片上傳成功後調用的方法
            handleSuccess(response, file, fileList) {
                console.log("上傳成功，服務器返回的數據：", response);
                if (response.code === 20000) {
                    // 將生成的文件名設置到 ruleForm.commodity
                    this.ruleForm.commodity = response.data;
                    this.$message.success("上傳資料成功！");
                    // 在圖片上傳成功後發送表單數據
                    this.sendFormData();
                } else {
                    this.$message.error(response.message);
                    const index = fileList.indexOf(file);
                    if (index !== -1) {
                        fileList.splice(index, 1);
                    }
                }

                this.fileList = fileList;
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 上傳圖片
                        this.$refs.upload.submit();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 上傳圖片前的處理
            beforeUpload(file) {
                console.log("File selected:", file);
                const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJPGorPNG) {
                    this.$message.error('只能上傳jpg/png文件');
                    return false;
                }

                const formData = new FormData();
                formData.append('picFile', file);
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .post(this.yourBackendUploadURL, formData).then((response) => {
                    console.log(response);

                    if (response.data.code == 20000) {
                        this.$message({
                            message: '添加圖片成功',
                            type: 'success'
                        });
                      this.sendFormData();

                    } else {
                        this.$message.error(response.data.message);
                    }
                });
                return true;
            },

            // 發送表單數據
            sendFormData() {
                let x = "http://localhost:9083/hamburgers/add-menu";
                console.log(x);
                console.log(this.ruleForm);
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem('jwt')}})
                    .post(x, this.ruleForm).then((response) => {
                    console.log(response);

                    if (response.data.code == 20000) {
                        this.$message({
                            message: '添加訂單成功',
                            type: 'success'
                        });
                        this.$router.push('/hamburger/menu');

                    } else {
                        this.$message.error(response.data.message);
                    }
                });
            },




            //重置按鈕
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm.commodity = ""; // 清空已上传的文件名
                this.fileList = []; // 清空文件列表
            },
        },

        created() {


            // beforeunload 事件用於檢測瀏覽器或標籤頁是否正在關閉
            // window.addEventListener('beforeunload', (event) => {
            //     event.returnValue = "你確定要離開嗎？";
            //
            // });
        },
    }
</script>