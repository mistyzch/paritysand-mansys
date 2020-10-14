<template>
  <div id="manager-battle-view" class="manager-battle-view">
    <el-container>
      <el-main>
        <el-table :data="battleList" border stripe v-loading="loading">
          <el-table-column
            prop="name"
            label="砂场名称"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="location.latitude"
            label="北纬"
            width="400"
          ></el-table-column>
          <el-table-column prop="location.longitude" label="东经" width="400">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="12">
                  <el-link
                    @click="openUpdateForm(scope.$index, battleList)"
                    :underline="false"
                  >
                    <el-tag><h4>修改砂场信息</h4></el-tag>
                  </el-link>
                </el-col>
                <el-col :span="12">
                  <el-link
                    @click="deleteBattle(scope.$index, battleList)"
                    :underline="false"
                  >
                    <el-tag type="danger"><h4>删除该砂场</h4></el-tag>
                  </el-link>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-row type="flex" justify="end">
          <el-col :span="2">
            <el-button type="primary" plain @click="openInsertForm"
              >添加砂场</el-button
            >
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
    <el-dialog
      :visible.sync="isShowForm"
      width="40%"
      @close="handleCloseDialog"
      destroy-on-close
    >
      <span slot="title">
        <el-row>
          <el-col :span="12">
            <h3>{{ optionsType }}砂场信息</h3>
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
        <el-row>
          <el-col :span="24">
            <el-form-item label="砂场位置" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请勿超过18个字！"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="北纬" prop="latitude">
              <el-input
                v-model="form.latitude"
                placeholder="格式：xx.xxxxxx"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="东经" prop="longitude">
              <el-input
                v-model="form.longitude"
                placeholder="格式：xx.xxxxxx"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-row type="flex" align="middle" justify="space-between">
          <el-col :span="6">
            <el-switch v-model="isEdit" active-text="点击编辑"></el-switch>
          </el-col>
          <el-col :span="8">
            <el-button type="info" @click="resetForm" :disabled="!isEdit"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="optionBattleInfo('form')"
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
import { battleFormRule } from "../../config/FormRules";
export default {
  name: "ManagerBattle",
  inject: ["reload"],
  data() {
    return {
      formRule: battleFormRule,
      loading: new Boolean(),
      battleList: [],
      isShowForm: false,
      isEdit: false,
      optionsType: "保存",
      form: {
        name: "",
        latitude: "",
        longitude: ""
      }
    };
  },
  methods: {
    getBattleList() {
      let _this = this;
      _this.loading = true;
      _this.$api
        .getBattle()
        .then(res => {
          _this.battleList = res;
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = false;
          console.log("getBattleListErr", err);
        });
    },
    optionBattleInfo(form) {
      let _this = this;
      _this.$refs[form].validate(valid => {
        if (valid) {
          if (_this.optionsType === "修改") {
            _this.updateBattle();
          } else if (_this.optionsType === "新建") {
            _this.insertBattle();
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
    updateBattle() {
      let _this = this;
      _this.$api
        .updateBattle(
          _this.form.id,
          _this.form.latitude,
          _this.form.longitude,
          _this.form.name
        )
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
              message: "操作或服务器异常"
            });
          }
        })
        .catch(err => {
          console.log("updateBattleErr", err);
        });
    },
    insertBattle() {
      let _this = this;
      _this.$api
        .insertBattle(
          _this.form.latitude,
          _this.form.longitude,
          _this.form.name
        )
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
              message: "操作或服务器异常"
            });
          }
        })
        .catch(err => {
          console.log("insertBattleErr", err);
        });
    },
    deleteBattle(idx, arr) {
      let _this = this;
      _this.$api
        .deleteBattle(arr[idx].id)
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
              message: "操作或服务器异常"
            });
          }
        })
        .catch(err => {
          console.log("deleteBattleErr", err);
        });
    },
    /**
     * 打开新增表单
     */
    openInsertForm() {
      this.isShowForm = true;
      this.optionsType = "新建";
      this.$refs["form"].resetFields();
    },
    openUpdateForm(idx, arr) {
      this.optionsType = "修改";
      this.isShowForm = true;
      this.form.id = arr[idx].id;
      this.form.name = arr[idx].name;
      this.form.latitude = arr[idx].location.latitude;
      this.form.longitude = arr[idx].location.longitude;
    },
    resetForm() {
      this.isShowForm = false;
      this.$refs["form"].resetFields();
    },
    handleCloseDialog() {
      this.isShowForm = false;
      this.$refs["form"].resetFields();
    }
  },
  created() {
    this.getBattleList();
  }
};
</script>

<style scoped>
.manager-battle-view,
.manager-battle-view .el-container,
.manager-battle-view .el-container .el-main {
  width: 100%;
  height: 100%;
}
</style>
