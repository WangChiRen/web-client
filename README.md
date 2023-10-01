# web-client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

一. 解釋本 repository 的目的與內容
目的主要是作者我有次去餐廳吃飯時
因為點了餐結果等了30分鐘還沒來
因為該餐廳還是採用手寫紙本的方式
後來才知道老闆把單子用丟
所以就製作了這個簡單的點菜系統
*但要注意的是，目前 web-client的專案是純前端，後端及數據庫代碼在web-server中*


---------------------------------


二 src下的目錄有：
1. assets
2. components
3. router
4. store
5. views
6. App.vue
7. main.js


---------------------------------


三 針對src下較重要的**views**目錄做說明

---------------------------------

views目錄
目錄內的資料夾有：
1. HamburgerMenu
2. OrderManagement
3. ShoppingCar


這三個目錄是唯一的三個目錄，
1. HamburgerMenu下有HamburgerMenuView.vue
2. OrderManagement下有OrderManagementView.vue
3. ShoppingCar下有ShoppingCarView.vue


這三個檔案分別對應三個不同頁面
HamburgerMenuView.vue ->點餐頁面
ShoppingCarView.vue -> 訂單詳情頁
OrderManagementView.vue ->後台系統頁


---------------------------------


四 .vue檔案說明

針對views中的HamburgerMenuView.vue檔案做說明
quantityAdd() -> 商品數量增加按鈕
quantityReduce() -> 商品數量減少按鈕
shoppingCart() -> 加入訂單按鈕(發請求給後端)
checkshoppingCar() -> 跳轉至訂單詳情頁
opinion() -> 意見表

---------------------------------

針對views中的ShoppingCarView.vue檔案做說明
serialNumber() -> 設置訂單編號
getDetails() -> 顯示當前行資訊
handleChange() -> 操作訂單數量並修改總價
handleEdit() -> 修改數據庫中的訂單資訊(發請求給後端)
getSummaries() -> 計算當前數量總金額
loadShoppingCar() -> 呈現數據在訂單詳情頁中(發請求給後端)
openDeleteConfirm() -> 確認是否刪除訂單數據
handleDelete() -> 刪除該筆訂單在數據庫中的訂單資訊(發請求給後端)
orderAndCheckout() -> 確認是否點餐
setOrderNumber() -> 遞增訂單編號的值並給到數據庫(發請求給後端)
backendSystem() -> 將訂單資訊送出給後台系統的數據庫(發請求給後端)
foodDelivery() -> 點餐按鈕(刪除全部數據庫中的訂單) 
returnToOrderManagement() -> 進入後台管理系統
returnToMenu() -> 回首頁

---------------------------------

針對views中的OrderManagementView.vue檔案做說明
processData() -> 儲相同訂單號的訂單數據
loadOrderManagement() -> 從數據庫獲得數據並顯示(發請求給後端)
serialNumber() -> 設定訂單編號
showOrderDetails() -> 將相同的訂單添加到gridData中 
returnToShoppingCar() -> 返回訂單頁面
returnToHamburgerMenu() -> 返回點餐頁面

---------------------------------

views目錄
目錄內的資料夾有：
1. addMenu
2. admin
3. hamburgerMenu
4. login
5. orderManagement
6. shoppingCart

版本-2.0

index.js
(完成)修改AddMenuView、MenuListView、OrderManagementView、AddAdminView、AdminListView 將該五個視圖添加為一個陣列 30min
(完成)新增AddMenuView、MenuListView、OrderManagementView、AddAdminView、AdminListView、LoginView視圖 10min


imageMixin.js
(完成) 新增imageMixin.js文件，將子類共有的行為提取到該文件中 10min
(完成) 新增設置圖片顯示的方法getImageUrl() 10min
(完成) 新增設置表格編號的方法serialNumber() 10min
(完成) 新增返回點餐頁面的方法returnToMenu() 5min
(完成) 新增圖片放大預覽方法handlePictureCardPreview() 10min
(完成) 新增上傳圖片前的處理方法beforeUpload()，判斷格式是否為jpeg、png 10min
(完成) 新增上傳圖片超過1個以上時的方法handleExceed() 10min
(完成) 新增rules屬性，判斷餐點名稱、餐點單價、推薦指數、餐點描述的正則判斷格式 1hr


AddMenuView
(完成) 修改AddMenuView視圖布局，可手動態獲取新增的菜單內容 2.5hr 
(完成) 新增重置按鈕resetForm() 20min
(完成) 新增超過1個以上的檔案時提醒的方法handleExceed() 20min
(完成) 新增上傳前處理判斷圖片格式的方法beforeUpload() 20min
(完成) 新增圖片放大預覽方法handlePictureCardPreview()，並提取到父類中
(完成) 新增創建按鈕submitForm()，點選按鈕後會送出表單及添加圖片 2hr
(完成) 新增圖片上傳成功後調用的方法handleSuccess() 1.5hr
(完成) 新增表單重置按鈕及方法resetForm()，可以快速重置表單 10min
(完成) 新增判斷餐點名稱、餐點單價、推薦指數、餐點描述的正則判斷格式並提取到父類中 
(完成) 新增 import imageMixin from "@/mixins/imageMixin";將共有的方法提取到父類中 5min
(完成) 新增 import {validationMixin} from "@/mixins/imageMixin";將共有的屬性提取到父類中 5min


MenuListView
(完成) 新增MenuListView視圖布局，可以查看並修改菜單內容 4hr 
(完成) 新增刪除菜單按鈕功能 handleDelete() 30min
(完成) 新增畫面顯示功能 loadMenuListView() 20min
(完成) 新增修改圖片後調用的的方法handleSuccess() 20min
(完成) 新增創建按鈕submitForm()，點選按鈕後會送出修改的表單及修改的圖片 20min
(完成) 新增編輯訂單數據的方法editSent()，該方法會將修改的表單內容及修改的圖片發給後端
(完成) 新增 import imageMixin from "@/mixins/imageMixin";將共有的方法提取到父類中 5min
(完成) 新增 import {validationMixin} from "@/mixins/imageMixin";將共有的屬性提取到父類中 5min


AddAdminView
(完成) 新增AddMenuView視圖布局，可以添加員工帳號密碼手機等資料 2hr 
(完成) 新增帳號、密碼、信箱正則判斷規則 1hr
(未完成) 將新增的表單發給後端

AdminListView
(完成) 新增AdminListView視圖布局，可以查看員工基本資料 2hr 
(完成) 新增 import imageMixin from "@/mixins/imageMixin";將共有的方法提取到父類中 5min
(完成) 新增 import {validationMixin} from "@/mixins/imageMixin";將共有的屬性提取到父類中 5min
(完成) 新增分頁功能 1hr
(完成) 新增處理每頁顯示數量的變化的方法 handleSizeChange() 10min
(完成) 新增處理頁碼的變化的方法handleCurrentChange() 10min
            
HamburgerMenuView             
(完成)修改自動添加菜單數據 5hr
(完成)修改HamburgerMenuView視圖布局 1.5hr
(完成)修改加入訂單按鈕功能邏輯 shoppingCart() 2hr
(完成) 新增 import imageMixin from "@/mixins/imageMixin";將共有的方法提取到父類中 5min
(完成) 新增 import {validationMixin} from "@/mixins/imageMixin";將共有的屬性提取到父類中 5min


LoginView
(完成) 新增LoginView視圖布局，員工登入頁畫面 1.5hr
(完成) 新增判斷帳號密碼長度的方法 10min
(未完成) 將帳號密碼發給後端

OrderManagementView
(完成) 新增處理每頁顯示數量的變化的方法 handleSizeChange() 10min
(完成) 新增處理頁碼的變化的方法handleCurrentChange() 10min
(完成) 新增 import imageMixin from "@/mixins/imageMixin";將共有的方法提取到父類中 5min
(完成) 新增 import {validationMixin} from "@/mixins/imageMixin";將共有的屬性提取到父類中 5min



ShoppingCartView
(完成)　新增beforeunload事件用於檢測瀏覽器或標籤頁是否正在關閉
(未完成) 新增deleteAllOrderData()方法，用於刪除訂單頁的全部數據


