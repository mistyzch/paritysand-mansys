<template>
  <div id="login-view" class="login-body">
    <el-container>
      <el-main>
        <div class="login-form-container">
          <LoginForm></LoginForm>
        </div>
      </el-main>
      <el-footer>
        该背景图片由<el-link
          type="info"
          href="https://pixabay.com/zh/users/MichaelGaida-652234/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1510561"
          >Michael Gaida</el-link
        >在<el-link
          type="info"
          href="https://pixabay.com/zh/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1510561"
          >Pixabay</el-link
        >发布
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import LoginForm from "../components/Form/LoginForm";
export default {
  name: "LoginView",
  components: {
    LoginForm
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.login-body {
  width: 100%;
  height: 100%;
  background: url("../assets/images/loginBg.jpg") center center no-repeat;
  background-size: cover;
}

.el-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 30%; */
}

.login-form-container {
  float: right;
  width: 25%;
  height: 50%;
  position: relative;
  right: -25%;
}
</style>
