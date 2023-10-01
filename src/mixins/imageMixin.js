//父類

export default {
    methods: {

        //設置圖片顯示
        getImageUrl(filename) {
            const baseUrl = require("@/assets/" + filename);
            return baseUrl;
        },


        //設置編號
        serialNumber(index) {
            return index + this.serialCounter;
        },


        //返回點餐頁面
        returnToMenu() {
            this.$router.push('/hamburger/menu')
        },


        //處理圖片預覽
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },


        // 上傳圖片超過1個以上時的檔案時提醒
        handleExceed() {
            this.$message({type: 'error', message: '最多支援1個附件上傳'})
        },


    }
};


export const validationMixin = {
    data() {
        return {

            serialCounter: 1, // 新增這一行以初始化編號計數器
            rules: {
                unitprice: [
                    {pattern: /^[0-9]+$/, required: true, message: '餐點單價只可以輸入數字', trigger: 'blur', max: 255},
                ],
                meals: [
                    {
                        required: true,
                        message: '請輸入餐點名稱',
                        trigger: 'blur',
                        max: 255,
                    },
                    {max: 255, message: '最多不可超過255個字符', trigger: 'blur'},
                ],
                recommend: [
                    {
                        pattern: /^(?:[0-4](?:\.\d)?|5(?:\.0)?)$/,
                        required: true,
                        message: '請檢查數值是否有誤，不可有特殊字元，數值必須是0~5.0範圍之間',
                        trigger: 'blur',
                    },
                ],
                descride: [
                    {
                        required: true,
                        message: '請填寫餐點描述',
                        trigger: 'blur',
                        max: 255,
                    },
                    {max: 255, message: '最多不可超過255個字符', trigger: 'blur'},
                ],
            },
        };
    },
};


export const admin = {
    data() {

        // 判斷是否為英文，最少2個字符，最多10個字符
        const englishPattern = /^[a-zA-Z]{2,10}$/;

        // 判斷是否為中文，最少1個中文字符，最多6個中文字符
        const chinesePattern = /^[\u4e00-\u9fa5]{1,6}$/;

        return {


            rules: {
                username: [
                    { pattern: /^[a-zA-Z]{2,10}$|^[\u4e00-\u9fa5]{1,6}$/, message: '請輸入2到10個英文字母,或是輸入1到6個中文字', trigger: 'blur' },
                    { required: true, message: '姓名不能為空', trigger: 'blur' }
                ],

                account: [
                    {required: true, message: '請輸入用戶名稱', trigger: 'blur'},
                    {min: 4, max: 16, message: '長度在 4 到 16 個字符', trigger: 'blur'}
                ],

                password: [
                    {required: true, message: '請輸入密碼', trigger: 'blur'},
                    {min: 5, max: 16, message: '長度在 5 到 16 個字符', trigger: 'blur'}
                ],

                mail: [
                    {
                        pattern: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za -z]{2,}$/,
                        required: true,
                        message: '信箱輸入有誤',
                        trigger: 'blur'
                    }
                ],

                phone: [{pattern: /^09\d{8}$/, required: true, message: '手機輸入有誤', trigger: 'blur'}],

                birthday: [{required: true, message: '請輸入生日', trigger: 'blur'}],

                description: [{required: true, message: '請選擇權限', trigger: 'blur'}],
            },
        };
    },
};