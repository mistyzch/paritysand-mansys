# paritysand-mansys

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
### 目录结构
```
 App.vue
│  main.js
│
├─api   ----------------接口配置
│      api.js
│      index.js
│
├─assets    ------------静态文件
│  ├─css
│  │      base.css
│  │
│  └─images
│          loginBg.jpg
│
├─components    --------组件
│  └─Form
│          LoginForm.vue    -------登录表单
│
├─config    ------------配置文件
│      apilist.js   ----------------接口地址列表
│      companyConfig.js-------------公司电话配置
│      FormRules.js    -------------表单校验规则配置
│      globalLoadingOptions.js -----全局loading样式配置
│      goodsCategory.js ------------货物类别配置
│      imgBaseUrl.js ---------------图标baseUrl设置
│      unitType.js  ----------------单位配置
│
|
├─router    ------路由
│      index.js
│
├─store     ------VueX
│      index.js
│
├─utils     ------通用方法
│      str-utils.js -------字符串截取
│
└─views     ---------------页面
    │  HomeView.vue ------主页
    │  LoginView.vue -----登录页面
    │
    └─HomeViews
            ManagerBattle.vue   ------管理砂场
            ManagerComments.vue ------管理评论
            ManagerGoods.vue    ------管理商品
            ManagerNotice.vue   ------管理公告
            ManagerOrder.vue    ------管理订单
```