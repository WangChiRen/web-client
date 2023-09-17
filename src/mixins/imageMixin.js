

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


    // 上傳圖片前的處理
    beforeUpload(file) {
      console.log("File selected:", file);
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPGorPNG) {
        this.$message.error('只能上傳jpg/png文件');
        return false;
      }
      return true;
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
          { pattern: /^[0-9]+$/, required: true, message: '餐點單價只可以輸入數字', trigger: 'blur', max: 255 },
        ],
        meals: [
          {
            required: true,
            message: '請輸入餐點名稱',
            trigger: 'blur',
            max: 255,
          },
          { max: 255, message: '最多不可超過255個字符', trigger: 'blur' },
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
          { max: 255, message: '最多不可超過255個字符', trigger: 'blur' },
        ],
      },
    };
  },
};