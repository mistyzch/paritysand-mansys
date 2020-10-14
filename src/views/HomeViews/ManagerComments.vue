<template>
  <div id="manager-comments-view" class="manager-comments-view">
    <el-container>
      <el-main height="">
        <el-row
          type="flex"
          align="middle"
          justify="flex-start"
          v-loading="loading"
        >
          <el-col
            :span="24"
            v-for="item in commentList"
            :key="item.id"
            class="comment-card"
          >
            <div class="card-body">
              <div class="card-left">
                <el-avatar
                  fit="fill"
                  size="large"
                  shape="square"
                  :src="item.avatarUrl"
                ></el-avatar>
              </div>
              <div class="card-right">
                <el-row type="flex" align="middle" justify="center">
                  <el-col :span="24" class="comment-header">
                    <span class="username-span">{{ item.name }}</span>
                    <el-rate
                      class="rate-div"
                      v-model="item.delivery"
                      :colors="colors"
                      disabled
                    >
                    </el-rate>
                    <span class="time-span">{{ item.createTime }}</span>
                  </el-col>
                  <el-col :span="24" class="comment-body">
                    <span class="content-span">
                      {{ item.content }}
                    </span>
                    <el-link
                      type="danger"
                      :underline="false"
                      @click="deleteComment(item.id)"
                    >
                      <i class="el-icon-delete"></i>
                    </el-link>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "ManagerComments",
  inject: ["reload"],
  data() {
    return {
      loading: new Boolean(),
      commentList: [],
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
    };
  },
  methods: {
    getComments() {
      let _this = this;
      _this.loading = true;
      _this.$api
        .getComments()
        .then(res => {
          _this.loading = false;
          this.commentList = res;
        })
        .catch(err => {
          _this.loading = false;
          console.log("getCommentsErr", err);
        });
    },
    deleteComment(id) {
      let _this = this;
      _this
        .$confirm("是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$api
            .deleteComment(id)
            .then(res => {
              if (res.status === 204) {
                _this.$message({
                  type: "success",
                  message: "删除成功！"
                });
                _this.reload();
              }
            })
            .catch(err => {
              _this.$message({
                type: "error",
                message: "删除失败！请稍后再试"
              });
              console.log("deleteCommentErr", err);
            });
        })
        .catch(() => {
          return;
        });
    }
  },
  created() {
    this.getComments();
  }
};
</script>

<style scoped>
.manager-comments-view,
.manager-comments-view .el-container,
.manager-comments-view .el-container .el-main {
  width: 100%;
  height: 100%;
}

.el-main .el-row {
  flex-wrap: wrap;
  height: 100%;
}

.comment-card {
  height: 15%;
  width: 100%;
  margin: 1%;
  border-radius: 4px;
}
.comment-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.card-left,
.el-avatar {
  height: 100%;
  width: 5.8vw;
}
.card-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.card-right {
  width: 100%;
}
.comment-header {
  display: flex;
  padding-left: 2%;
  justify-content: space-between;
  align-items: flex-start;
}
.rate-div {
  position: relative;
  left: -27vw;
}
.time-span {
  color: #c0c4cc;
}
.username-span {
  color: #909399;
}
.content-span {
  font-style: oblique;
}
.comment-body {
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
