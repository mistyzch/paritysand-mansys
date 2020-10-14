<template>
  <div id="manager-notice-view" class="manager-notice-view">
    <el-container>
      <el-main height="90%">
        <el-row
          class="el-main-row"
          type="flex"
          align="middle"
          justify="space-around"
          v-loading="loading"
        >
          <el-col
            :span="11"
            class="el-main-col"
            v-for="item in noticeList"
            :key="item.id"
          >
            <div class="notice-container">
              <div class="notice-header">
                <h3>{{ item.title }}</h3>
                <span>创建时间：{{ item.createTime }}</span>
              </div>
              <div class="notice-body">
                <div>{{ item.content }}</div>
                <span>更新时间：{{ item.updateTime }}</span>
              </div>
              <div class="notice-footer">
                <el-link @click="deleteNotice(item.id)" :underline="false">
                  <el-tag type="danger">
                    <h4>删除公告</h4>
                  </el-tag>
                </el-link>
                <el-link @click="openUpdateForm(item)" :underline="false">
                  <el-tag>
                    <h4>修改公告</h4>
                  </el-tag>
                </el-link>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer height="10%">
        <el-row type="flex" justify="center">
          <el-col :span="22" class="pagination-col">
            <el-pagination
              background
              hide-on-single-page
              layout="prev, pager, next"
              :page-count="totalPages"
              @current-change="handlePageChange"
            ></el-pagination>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" plain @click="openInsertForm"
              >新建公告</el-button
            >
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
    <el-dialog
      :visible.sync="isShowForm"
      width="40%"
      @close="handleCloseDialog"
    >
      <span slot="title">
        <el-row>
          <el-col :span="12">
            <span>{{ optionsType }}公告信息</span>
          </el-col>
        </el-row>
      </span>
      <el-form
        :model="form"
        ref="form"
        :rules="formRule"
        status-icon
        label-width="80px"
        :disabled="!isEdit"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="form.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-row type="flex" align="middle">
          <el-col :span="8">
            <el-switch v-model="isEdit" active-text="点击编辑"></el-switch>
          </el-col>
          <el-col :span="16">
            <el-button type="info" @click="resetForm" :disabled="!isEdit"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="optionNoticeInfo('form')"
              :disabled="!isEdit"
              >{{ optionsType }}</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { noticeFormRule } from "../../config/FormRules";
export default {
  name: "ManagerNotice",
  inject: ["reload"],
  data() {
    return {
      loading: new Boolean(),
      formRule: noticeFormRule,
      noticeList: [],
      totalPages: 1,
      isShowForm: false,
      isEdit: false,
      optionsType: "保存",
      form: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    optionNoticeInfo(form) {
      let _this = this;
      _this.$refs[form].validate(valid => {
        if (valid) {
          if (_this.optionsType === "修改") {
            _this.updateNoticeInfo();
          } else if (_this.optionsType === "新建") {
            _this.insertNotice();
          }
        } else {
          _this.$message({
            type: "error",
            message: "表单信息填写不规范！"
          });
          return;
        }
      });
    },
    updateNoticeInfo() {
      let _this = this;
      this.$confirm("是否保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.$api
            .updateNotice(_this.form.id, _this.form.title, _this.form.content)
            .then(res => {
              if (res.code === 1) {
                _this.$message({
                  type: "success",
                  message: res.message
                });
                _this.reload();
              } else {
                _this.$message({
                  type: "error",
                  message: res.message
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          return;
        });
    },
    insertNotice() {
      let _this = this;
      _this.$api
        .insertNotice(_this.form.title, _this.form.content)
        .then(res => {
          if (res.code === 1) {
            _this.$message({
              type: "success",
              message: res.message
            });
            _this.reload();
          } else {
            _this.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNotice(pageNum, pageSize) {
      let _this = this;
      _this.loading = true;
      _this.$api
        .getNotice(pageNum, pageSize)
        .then(res => {
          _this.loading = false;
          _this.totalPages = res.pages;
          _this.noticeList = res.list;
        })
        .catch(err => {
          _this.loading = false;
          _this.$message({
            type: "error",
            message: "服务器异常！"
          });
          console.log(err);
        });
    },
    deleteNotice(id) {
      let _this = this;
      _this
        .$confirm("是否删除当前公告?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$api
            .deleteNotice(id)
            .then(res => {
              if (res.code === 1) {
                _this.$message({
                  type: "success",
                  message: res.message
                });
                _this.reload();
              } else {
                _this.$message({
                  type: "error",
                  message: res.message
                });
              }
            })
            .catch(err => {
              console.log("deleteGoodsErr", err);
            });
        })
        .catch(() => {
          return;
        });
    },
    /**
     * 打开新增公告表单
     */
    openInsertForm() {
      this.isShowForm = true;
      this.optionsType = "新建";
    },
    /**
     * 打开更新公告表单
     */
    openUpdateForm(item) {
      let _this = this;
      _this.optionsType = "修改";
      _this.isShowForm = true;
      for (let key in item) {
        _this.form[key] = item[key];
      }
    },
    resetForm() {
      this.isShowForm = false;
      this.$refs["form"].resetFields();
    },
    handleCloseDialog() {
      this.isShowForm = false;
      this.$refs["form"].resetFields();
    },
    handlePageChange(curPage) {
      this.getNotice(curPage, this.$store.state.noticePageSize);
    }
  },
  created() {
    let _this = this;
    _this.getNotice(
      _this.$store.state.noticePageNum,
      _this.$store.state.noticePageSize
    );
  }
};
</script>

<style scoped>
.manager-notice-view,
.manager-notice-view .el-container,
.manager-notice-view .el-main,
.el-main-row {
  width: 100%;
  height: 100%;
}

.el-main-col {
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.notice-body {
  height: 100%;
}

.notice-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.notice-header {
  width: 95%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid#DCDFE6;
}

.notice-header span {
  font-style: oblique;
  color: #909399;
}

.notice-body {
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.notice-body div {
  width: 95%;
  height: 90%;
  background-color: #f2f6fc;
  text-align: left;
  text-indent: 2em;
  overflow: auto;
}

.notice-body span {
  position: relative;
  left: 30%;
  font-style: oblique;
  color: #909399;
}

.notice-footer {
  width: 95%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-footer {
  width: 99%;
}
</style>
