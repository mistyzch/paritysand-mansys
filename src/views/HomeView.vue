<template>
  <div id="home-view" class="home-view-body">
    <el-container>
      <el-container>
        <el-header height>
          <el-menu
            :default-active="activeIndex"
            router
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-row type="flex" align="middle">
              <el-col :span="22" class="nav-title">
                <el-menu-item index="/home/managergoods">管理商品</el-menu-item>
                <el-menu-item index="/home/managerorder">管理订单</el-menu-item>
                <el-menu-item index="/home/managernotice">
                  管理公告
                </el-menu-item>
                <el-menu-item index="/home/managerbattle">
                  管理砂场
                </el-menu-item>
                <el-menu-item index="/home/managercomments">
                  用户评论
                </el-menu-item>
              </el-col>
              <el-col :span="2">
                <el-link type="danger" @click="logout" :underline="false"
                  ><i class="el-icon-warning-outline"></i
                ></el-link>
              </el-col>
            </el-row>
          </el-menu>
        </el-header>
        <el-main height> <router-view v-if="isRouterActive" /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      isRouterActive: true,
      activeIndex: this.$route.path
    };
  },
  provide: function() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterActive = false;
      this.$nextTick(() => {
        this.isRouterActive = true;
      });
    },
    logout() {
      let _this = this;
      _this
        .$confirm("是否退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$api
            .logout()
            .then(res => {
              if (res.code === 1) {
                _this.$message({
                  type: "success",
                  message: res.message
                });
                _this.$router.replace({ path: "/login" });
                localStorage.removeItem("loginStatus");
              } else {
                _this.$message({
                  type: "error",
                  message: res.error
                });
              }
            })
            .catch(err => {
              console.log("upStatusRes", err);
            });
        })
        .catch(() => {
          return;
        });
    }
  }
};
</script>

<style scoped>
.home-view-body {
  width: 100%;
  height: 100%;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-header {
  padding: 0;
}
.nav-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>
