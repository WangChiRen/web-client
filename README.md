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


