<template>
  <div id="manager-goods-view" class="manager-goods-view">
    <el-container>
      <el-main>
        <el-row :gutter="50">
          <el-col :span="6" v-for="item in goodslist" :key="item.id">
            <el-card v-loading="loading">
              <img :src="imgBaseUrl + item.image" class="image" />
              <div class="goodsinfo-container">
                <el-row>
                  <el-col :span="24">
                    <h3>商品名称：{{ item.goodsName }}</h3>
                  </el-col>
                  <el-col :span="12">
                    <h4>销售价格：{{ item.salePrice }} 元</h4>
                  </el-col>
                  <el-col :span="12">
                    <h4>计价单位：{{ item.unit }}</h4>
                  </el-col>
                  <el-col :span="12">
                    <h4>库存：{{ item.amount }}</h4>
                  </el-col>
                  <el-col :span="24">
                    <h4>商品信息</h4>
                  </el-col>
                  <el-col :span="24">
                    <div>
                      <h5>{{ item.note }}</h5>
                    </div>
                  </el-col>
                </el-row>
                <div class="goodsinfo-footer">
                  <el-tooltip
                    :content="item.monthySales + ''"
                    placement="bottom"
                  >
                    <el-tag type="info">
                      <h4>月销售量</h4>
                    </el-tag>
                  </el-tooltip>
                  <el-link @click="deleteGoods(item.id)" :underline="false">
                    <el-tag type="danger">
                      <h4>删除商品</h4>
                    </el-tag>
                  </el-link>
                  <el-link @click="openUpdateForm(item)" :underline="false">
                    <el-tag>
                      <h4>修改信息</h4>
                    </el-tag>
                  </el-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 商品表单 -->
        <el-dialog
          :visible.sync="isShowForm"
          width="40%"
          @close="handleCloseDialog"
          destroy-on-close
        >
          <span slot="title">
            <el-row>
              <el-col :span="12">
                <h3>{{ optionsType }}商品信息</h3>
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
              <el-col :span="12">
                <el-form-item label="商品名称" prop="goodsName">
                  <el-input v-model="form.goodsName">
                    <template slot="append">({{ form.unit }})</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品库存" prop="amount">
                  <el-input v-model.number="form.amount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计价单位" prop="unit">
                  <el-select v-model="form.unit" placeholder="请选择">
                    <el-option
                      v-for="item in unitType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品单价" prop="salePrice">
                  <el-input v-model.number="form.salePrice">
                    <template slot="append">￥/{{ form.unit }}</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品类别" prop="goodsType">
                  <el-select v-model="form.goodsType" placeholder="请选择">
                    <el-option
                      v-for="item in goodsType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="配送费用" prop="deliverCost">
                  <el-input v-model.number="form.deliverCost"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="24">
                <el-form-item label="商品说明" prop="note">
                  <el-input
                    v-model="form.note"
                    type="textarea"
                    autosize
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="上传新的商品图片" prop="image">
                  <el-upload
                    ref="upload"
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    :limit="1"
                    :on-change="handleUploadChange"
                    :before-remove="handleBeforeRemove"
                  >
                    <i class="el-icon-plus" />
                    <div slot="tip" class="el-upload__tip">
                      只能上传一张文件
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer">
            <el-row type="flex" align="middle">
              <el-col :span="16">
                <el-switch v-model="isEdit" active-text="点击编辑"></el-switch>
              </el-col>
              <el-col :span="8">
                <el-button type="info" @click="resetForm" :disabled="!isEdit"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  @click="optionGoodsInfo('form')"
                  :disabled="!isEdit"
                  >{{ optionsType }}</el-button
                >
              </el-col>
            </el-row>
          </span>
        </el-dialog>
      </el-main>
      <el-footer>
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
              >添加商品</el-button
            >
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { categoryList } from "../../config/goodsCategory";
import { unitType } from "../../config/unitType";
import { goodsFormRule } from "../../config/FormRules";
export default {
  name: "ManagerGoods",
  inject: ["reload"],
  data() {
    return {
      loading: new Boolean(),
      formRule: goodsFormRule,
      goodsType: categoryList,
      unitType: unitType,
      imgBaseUrl: this.$imgBaseUrl.imgBaseUrl,
      isShowForm: false,
      isEdit: false,
      optionsType: "保存",
      totalPages: 1,
      goodslist: [],
      form: {
        goodsName: "",
        amount: 0,
        deliverCost: 0,
        file: null,
        monthySales: 999,
        note: "",
        salePrice: 0,
        unit: "",
        goodsType: "",
        image: [
          {
            name: "",
            url: ""
          }
        ]
      }
    };
  },
  methods: {
    optionGoodsInfo(form) {
      let _this = this;
      _this.$refs[form].validate(valid => {
        if (valid) {
          if (_this.optionsType === "修改") {
            _this.updateGoodsInfo();
          } else if (_this.optionsType === "新建") {
            _this.insertGoods();
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
    updateGoodsInfo() {
      let _this = this;
      this.$confirm("是否保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.$api
            .updateGoods(
              this.form.id,
              this.form.goodsName,
              this.form.amount,
              this.form.deliverCost,
              this.form.image,
              this.form.monthySales,
              this.form.note,
              this.form.salePrice,
              this.form.unit,
              this.form.goodsType
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
    insertGoods() {
      let _this = this;
      _this.$api
        .insertGoods(
          this.form.goodsName,
          this.form.amount,
          this.form.deliverCost,
          this.form.image,
          this.form.monthySales,
          this.form.note,
          this.form.salePrice,
          this.form.unit,
          this.form.goodsType
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
              message: res.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getGoodsList(goodsPageNum, goodsPageSize) {
      let _this = this;
      _this.loading = true;
      _this.$api
        .getGoodsList(goodsPageNum, goodsPageSize)
        .then(res => {
          _this.loading = false;
          _this.totalPages = res.pages;
          _this.goodslist = res.list;
        })
        .catch(err => {
          _this.loading = false;
          console.log(err);
        });
    },
    deleteGoods(id) {
      let _this = this;
      _this
        .$confirm("是否删除当前商品?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$api
            .deleteGoods(id)
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
     * 打开新增货物表单
     */
    openInsertForm() {
      this.isShowForm = true;
      this.optionsType = "新建";
    },
    /**
     * 打开更新货物表单
     */
    openUpdateForm(item) {
      let _this = this;
      _this.optionsType = "修改";
      _this.isShowForm = true;
      for (let key in item) {
        if (key === "image") {
          _this.form.image[0].name = item.goodsName;
          _this.form.image[0].url = _this.imgBaseUrl + item.image;
        } else {
          _this.form[key] = item[key];
        }
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
    handleUploadChange(file) {
      this.form.image = file.raw;
    },
    handlePageChange(curPageNum) {
      this.getGoodsList(curPageNum, this.$store.state.goodsPageSize);
    },
    handleBeforeRemove() {
      let _this = this;
      return new Promise((resolve, reject) => {
        _this
          .$confirm("此操作将删除该图片, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            _this.$message({
              type: "info",
              message: "已经移除图片，保存修改后生效"
            });
            resolve(true);
          })
          .catch(() => {
            _this.$message({
              type: "info",
              message: "取消更改"
            });
            reject(false);
          });
      });
    }
  },
  created: function() {
    this.getGoodsList(
      this.$store.state.goodsPageNum,
      this.$store.state.goodsPageSize
    );
  }
};
</script>

<style scoped>
.manager-goods-view {
  width: 100%;
  height: 100%;
}
.goodsinfo-container .el-col {
  padding-left: 0;
}
.el-container {
  width: 100%;
  height: 100%;
}

.el-main {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.el-card {
  width: 100%;
}

.el-footer {
  overflow-x: hidden;
}

.image {
  width: 17vw;
  height: 12vw;
  display: fill;
}
.el-col {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}
.el-form-item {
  width: 100%;
}
.goodsinfo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-col {
  display: flex;
  justify-content: center;
}

div h5 {
  height: 3vw;
  overflow: auto;
  text-align: left;
  text-indent: 2em;
}
</style>
