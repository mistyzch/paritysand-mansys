<template>
  <div id="login-form" class="login-form-body">
    <div class="login-form-header">
      <el-row>
        <el-col :span="6" class="col-1"></el-col>
        <el-col :span="6" class="col-2"></el-col>
        <el-col :span="6" class="col-3"></el-col>
        <el-col :span="6" class="col-4"></el-col>
      </el-row>
    </div>
    <el-form :model="form" ref="form">
      <el-form-item>
        <el-input
          v-model="form.username"
          placeholder=" 用 户 名"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          type="password"
          placeholder=" 密 码"
          prefix-icon="el-icon-edit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" type="primary" @click="submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <div class="login-form-footer">
      <el-checkbox v-model="rememberTag">下次记住我</el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rememberTag: true
    };
  },
  methods: {
    submit() {
      let _this = this;
      console.log(_this.rememberTag);
      if (_this.rememberTag) {
        this.setCookie(_this.form.username, _this.form.password, 7);
      } else {
        this.resetCookie();
      }
      _this.$api
        .login(_this.form.username, _this.form.password)
        .then(res => {
          if (res.code === 1) {
            _this.$message({
              type: "success",
              message: res.message,
              offset: 80
            });
            localStorage.setItem("loginStatus", "true");
            _this.$router.replace({ path: "/home/managergoods" });
          } else if (res.code === 0) {
            _this.$message({
              type: "error",
              message: res.message,
              offset: 80
            });
          }
        })
        .catch(err => {
          console.log("loginErr", err);
        });
    },
    reset() {
      this.$ref.form.resetField();
    },
    /**
     * 设置七天记住密码免登录
     */
    setCookie(username, password, day) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * day); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "username" + "=" + username + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + password + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "username") {
            this.form.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.form.password = arr2[1];
          }
        }
      }
    },
    resetCookie() {
      this.setCookie("", "", -1);
    }
  },
  created() {
    this.getCookie();
  }
};
</script>

<style scoped>
.login-form-body {
  width: 100%;
  height: 100%;
  /* border: 1px solid whitesmoke; */
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.el-form {
  width: 80%;
  height: 60%;
  position: relative;
  top: -5%;
}

.login-form-footer {
  position: relative;
  top: -5%;
  right: 25%;
}

.login-form-header {
  width: 100%;
  height: 8%;
}
.el-row {
  width: 100%;
  height: 100%;
}
.el-row .el-col {
  height: 100%;
}
.col-1 {
  background-color: #409eff;
}
.col-2 {
  background-color: #67c23a;
}
.col-3 {
  background-color: #e6a23c;
}
.col-4 {
  background-color: #f56c6c;
}
</style>
