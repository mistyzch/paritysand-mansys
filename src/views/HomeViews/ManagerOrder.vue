<template>
  <div id="manager-order-view" class="manager-order-view">
    <el-container>
      <el-main>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading="loading"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="createTime" label="下单时间">
          </el-table-column>
          <el-table-column prop="contactName" label="联系人姓名">
          </el-table-column>
          <el-table-column prop="deliveryAddress" label="配送地址">
          </el-table-column>
          <el-table-column prop="status" label="订单状态"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="12">
                  <el-link
                    @click="updateOrderStatus(scope.$index, tableData)"
                    :underline="false"
                  >
                    <el-tag><h4>修改订单状态</h4></el-tag>
                  </el-link>
                </el-col>
                <el-col :span="12">
                  <el-link
                    @click="showOrderInfo(scope.$index, tableData)"
                    :underline="false"
                  >
                    <el-tag><h4>查看订单详情</h4></el-tag>
                  </el-link>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          background
          hide-on-single-page
          layout="prev, pager, next"
          :page-count="totalPages"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </el-footer>
    </el-container>
    <el-dialog title="订单详情" :visible.sync="isShowGoodsInfoDrawer">
      <el-row class="orderinfo">
        <el-col :span="24">
          <div class="goods-item">
            <p>下单时间:</p>
            <span>{{ curOrderInfo.createTime }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>配送时间:</p>
            <span>{{ curOrderInfo.deliveryTime }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>订单总额:</p>
            <span>{{ curOrderInfo.totalAmount }} ￥</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>货物总额:</p>
            <span>{{ goodsPrice }} ￥</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>运费总额:</p>
            <span>{{ curOrderInfo.carriage }} ￥</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>配送车型:</p>
            <span>{{ curOrderInfo.carType }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>订单状态:</p>
            <span>{{ curOrderInfo.status }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>联系人姓名:</p>
            <span>{{ curOrderInfo.contactName }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>联系方式:</p>
            <span>{{ curOrderInfo.contactPhone }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>配送平台:</p>
            <span>{{ curOrderInfo.distributionPoint }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>配送地址:</p>
            <span>{{ curOrderInfo.deliveryAddress }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>楼房性质:</p>
            <span>{{ curOrderInfo.buildingNature }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>楼盘性质:</p>
            <span>{{ curOrderInfo.propertyNature }}</span>
          </div>
        </el-col>
        <el-col :span="24" v-show="curOrderInfo.remark != ''">
          <div class="goods-item">
            <p>订单说明:</p>
            <span>{{ curOrderInfo.remark }}</span>
          </div>
        </el-col>
        <el-col :span="24" v-show="curOrderInfo.cancelReason != null">
          <div class="goods-item">
            <p>订单取消缘由:</p>
            <span>{{ curOrderInfo.cancelReason }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>订单修改时间:</p>
            <span>{{ curOrderInfo.updateTime }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>订单货物详情:</p>
            <span>
              <el-row
                type="flex"
                justify="space-between"
                align="middle"
                class="goods-details"
              >
                <el-col
                  class="no-border"
                  :span="5"
                  v-for="item in curOrderInfo.extendGoods"
                  :key="item.id"
                >
                  <el-popover
                    placement="top"
                    :title="goodsAmount"
                    width="150"
                    trigger="click"
                  >
                    <el-row>
                      <el-col :span="24">
                        <span>配送数量：{{ item.num }}</span>
                      </el-col>
                      <el-col :span="24">
                        <span>销售单价：{{ item.goods["salePrice"] }} ￥</span>
                      </el-col>
                      <el-col :span="24">
                        <span>销售单位：{{ item.goods["unit"] }}</span>
                      </el-col>
                      <el-col :span="24">
                        <span>库存数量：{{ item.goods["amount"] }}</span>
                      </el-col>
                    </el-row>
                    <el-button
                      type="primary"
                      plain
                      :underline="false"
                      slot="reference"
                      size="mini"
                      @click="getGoodsAmount(item)"
                    >
                      {{ item.goods["goodsName"] }}</el-button
                    >
                  </el-popover>
                </el-col>
              </el-row>
            </span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="goods-item">
            <p>订单协议图:</p>
            <span>
              <el-image
                style="width: 100px; height: 100px"
                :src="imgBaseUrl + curOrderInfo.protocolUrl"
                :preview-src-list="previewScrList"
              >
              </el-image>
            </span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="配送员信息" :visible.sync="deliverInfoDialog">
      <el-form
        :model="deliverInfo"
        :rules="deliverFormRule"
        status-icon
        ref="form"
      >
        <el-form-item label="配送员姓名" prop="name">
          <el-input v-model="deliverInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="配送员电话号码" prop="tel">
          <el-input v-model="deliverInfo.tel"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deliverInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="setDeliverInfo">确 定</el-button>
      </div>
    </el-dialog>
    <el-drawer
      title="修改订单状态"
      :visible.sync="isShowGoodsStatusDrawer"
      direction="btt"
    >
      <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="24" class="drawer-step">
          <el-steps :active="stepActive" simple process-status="wait">
            <el-step title="预约中" icon="el-icon-alarm-clock"></el-step>
            <el-step title="预约成功" icon="el-icon-thumb"></el-step>
            <el-step title="配送中" icon="el-icon-truck"></el-step>
            <el-step title="已完成" icon="el-icon-circle-check"></el-step>
          </el-steps>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" plain @click="clickBeforetStep"
            >上一步</el-button
          >
          <el-button type="primary" plain @click="clickNextStep"
            >下一步</el-button
          >
        </el-col>
        <el-col :span="8">
          <el-button @click="saveCurStep" type="primary">保 存</el-button>
          <el-button
            @click="cancelOrder"
            type="danger"
            plain
            :disabled="cancelBtn"
            >驳 回</el-button
          >
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { companyConfig } from "../../config/companyConfig";
import { deliverFormRule } from "../../config/FormRules";
export default {
  name: "ManagerOrder",
  inject: ["reload"],
  data() {
    return {
      loading: new Boolean(),
      deliverInfoDialog: false,
      deliverInfo: {
        name: "",
        tel: ""
      },
      deliverFormRule: deliverFormRule,
      imgBaseUrl: this.$imgBaseUrl.imgBaseUrl,
      isShowGoodsInfoDrawer: false,
      isShowGoodsStatusDrawer: false,
      cancelBtn: true,
      newSrc: "",
      goodsAmount: new String(),
      goodsPrice: 0,
      stepStr: new String(),
      orderAmount: new Number(),
      totalPages: 1,
      tableData: new Array(),
      curOrderInfo: new Object()
    };
  },
  computed: {
    previewScrList() {
      let arr = [];
      arr[0] = this.newSrc;
      return arr;
    },
    stepActive: {
      get: function() {
        switch (this.stepStr) {
          case "预约中":
            return 1;
          case "预约成功":
            return 2;
          case "配送中":
            return 3;
          case "已完成":
            return 4;
          default:
            return 0;
        }
      },
      set: function(stepIndex) {
        switch (stepIndex) {
          case 1:
            this.stepStr = "预约中";
            return;
          case 2:
            this.stepStr = "预约成功";
            return;
          case 3:
            this.stepStr = "配送中";
            return;
          case 4:
            this.stepStr = "已完成";
            return;
          default:
            return;
        }
      }
    }
  },
  methods: {
    /**
     * 更新订单状态
     */
    updateOrderStatus(index, tableData) {
      let _this = this;
      _this.isShowGoodsStatusDrawer = true;
      _this.curOrderInfo = tableData[index];
      if (tableData[index].status === "预约中") {
        _this.cancelBtn = false;
      }
      if (tableData[index].status === "已取消") {
        this.$message({
          type: "error",
          message: "该订单已取消！",
          offset: 80
        });
        _this.isShowGoodsStatusDrawer = false;
      } else if (tableData[index].status === "已完成") {
        this.$message({
          type: "error",
          message: "该订单已完成！",
          offset: 80
        });
        _this.isShowGoodsStatusDrawer = false;
      } else {
        _this.isShowGoodsStatusDrawer = true;
        _this.stepStr = tableData[index].status;
      }
    },

    /**
     * 查看订单消息
     */
    showOrderInfo(index, tableData) {
      let _this = this;
      try {
        _this.curOrderInfo = tableData[index];
        let goodsPrice = 0;
        _this.newSrc = _this.imgBaseUrl + tableData[index].protocolUrl;
        tableData[index].extendGoods.forEach(val => {
          goodsPrice += val.goods["salePrice"] * val.num;
        });
        _this.goodsPrice = goodsPrice;
        _this.isShowGoodsInfoDrawer = true;
      } catch (error) {
        this.$message({
          type: "error",
          message: "订单中的商品信息已经删除"
        });
      }
    },

    /**
     * 获取订单列表
     */
    getOrderList(pageNum, pageSize) {
      let _this = this;
      _this.loading = true;
      _this.$api
        .getOrderList(pageNum, pageSize)
        .then(res => {
          _this.loading = false;
          _this.totalPages = res.pages;
          _this.tableData = res.list;
        })
        .catch(err => {
          _this.loading = false;
          console.log(err);
        });
    },

    /**
     * 渲染列表颜色对比度
     */
    tableRowClassName({ row }) {
      if (row.status == "已取消") {
        return "cancle-row";
      } else if (row.status == "已完成") {
        return "success-row";
      }
      return "";
    },

    /**
     * 换页查看其他页的数据
     */
    handlePageChange(curPage) {
      this.getOrderList(curPage, this.$store.state.orderPageSize);
    },

    /**
     * 计算单类货物总价
     */
    getGoodsAmount(item) {
      this.goodsAmount = `货物总价：${item.goods["salePrice"] * item.num} ￥`;
    },

    /**
     * 步骤条控制
     */
    clickBeforetStep() {
      if (this.stepActive-- <= 0) {
        return;
      }
    },
    clickNextStep() {
      if (this.stepActive++ > 4) {
        return;
      }
    },

    /**
     * 保存步骤
     */
    saveCurStep() {
      let _this = this;
      if (_this.stepStr == "配送中") {
        _this.deliverInfoDialog = true;
      } else {
        _this
          .$confirm("是否保存操作?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            _this.$api
              .updateOrderStatus(_this.curOrderInfo.id, _this.stepStr)
              .then(res => {
                if (res.code === 1) {
                  if (_this.stepStr == "预约成功") {
                    _this.$api
                      .sendOrderMessage(
                        _this.curOrderInfo.totalPrice,
                        _this.curOrderInfo.deliveryTime,
                        _this.curOrderInfo.userId,
                        _this.curOrderInfo.contactName,
                        _this.curOrderInfo.distributionPoint,
                        `...${_this.$strUtils.sliceStrFormEnd(
                          _this.curOrderInfo.deliveryAddress,
                          17
                        )}`,
                        _this.curOrderInfo.contactPhone
                      )
                      .then(res => {
                        if (res.errcode == 0) {
                          _this.$message({
                            type: "success",
                            message: "已成功通知用户预约成功"
                          });
                          _this.reload();
                        } else {
                          console.log("sendOrderMessage", res);
                          _this.$message({
                            type: "error",
                            message:
                              "微信服务异常，未能通知客户，如有需要请电话联系"
                          });
                          _this.reload();
                        }
                      })
                      .catch(err => {
                        console.log("sendOrderMessageErr", err);
                      });
                  } else if (_this.stepStr == "已完成") {
                    _this.$api
                      .sendFinishMessage(
                        `如有问题请联系${companyConfig.telephone}`,
                        "订单已完成",
                        `${_this.$strUtils.sliceStrFormStart(
                          _this.curOrderInfo.id,
                          20
                        )}`,
                        _this.curOrderInfo.userId
                      )
                      .then(res => {
                        if (res.errcode == 0) {
                          _this.$message({
                            type: "success",
                            message: "已成功通知用户订单已完成"
                          });
                          _this.reload();
                        } else {
                          console.log("sendFinishMessage", res);
                          _this.$message({
                            type: "error",
                            message:
                              "微信服务异常，未能通知客户，如有需要请电话联系"
                          });
                          _this.reload();
                        }
                      })
                      .catch(err => {
                        console.log("sendFinishMessageErr", err);
                      });
                  } else {
                    _this.$message({
                      type: "success",
                      message: res.message
                    });
                  }
                  _this.reload();
                } else {
                  _this.$message({
                    type: "error",
                    message: res.message
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
    },

    setDeliverInfo() {
      let _this = this;
      _this.$refs.form.validate(isChecked => {
        if (isChecked) {
          _this.$api
            .setDeliverInfo(
              _this.curOrderInfo.id,
              _this.deliverInfo.name,
              _this.deliverInfo.tel
            )
            .then(res => {
              if (res.code == 1) {
                _this.$api
                  .updateOrderStatus(_this.curOrderInfo.id, _this.stepStr)
                  .then(res => {
                    if (res.code == 1) {
                      _this.deliverInfoDialog = false;
                      _this.$api
                        .sendDeliverMessage(
                          _this.curOrderInfo.userId,
                          `${_this.$strUtils.sliceStrFormStart(
                            _this.curOrderInfo.id,
                            20
                          )}`,
                          "请保持电话畅通",
                          _this.deliverInfo.name,
                          _this.deliverInfo.tel,
                          _this.stepStr
                        )
                        .then(res => {
                          _this.isShowGoodsStatusDrawer = false;
                          if (res.errcode == 0) {
                            _this.$message({
                              type: "success",
                              message: "已成功通知用户订单正在配送中"
                            });
                            _this.reload();
                          } else {
                            console.log("sendDeliverMessage", res);
                            _this.$message({
                              type: "error",
                              message:
                                "微信服务异常，未能通知客户，如有需要请电话联系"
                            });
                            _this.reload();
                          }
                        })
                        .catch(err => {
                          console.log("sendDeliverMessageErr", err);
                        });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          _this.$message({
            message: "请完成必填项！",
            type: "warning"
          });
          return false;
        }
      });
    },

    /**
     * 取消订单
     */
    cancelOrder() {
      let _this = this;
      _this
        .$prompt("请输入取消缘由", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "取消缘由不能超过15个字"
        })
        .then(({ value }) => {
          console.log("value.length", value, value.length);
          if (value == "") {
            _this.$message({
              type: "error",
              message: "取消缘由不许为空！"
            });
          } else if (value.length >= 15) {
            _this.$message({
              type: "danger",
              message: "取消缘由不许超过15个字！"
            });
          } else {
            _this.$api
              .cancelOrder(_this.curOrderInfo.id, value)
              .then(res => {
                if (res.code === 1) {
                  _this.$message({
                    type: "success",
                    message: res.message
                  });
                  _this.$api
                    .sendMessage(
                      `${value}`,
                      "已取消",
                      `${_this.$strUtils.sliceStrFormStart(
                        _this.curOrderInfo.id,
                        20
                      )}`,
                      _this.curOrderInfo.userId
                    )
                    .then(res => {
                      console.log("sendMessageRes", res);
                    })
                    .catch(err => {
                      console.log("sendMessageErr", err);
                    });
                  _this.reload();
                } else {
                  _this.$message({
                    type: "error",
                    message: "服务器异常！"
                  });
                }
              })
              .catch(err => {
                console.log("cancelOrderErr", err);
              });
          }
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  created() {
    this.getOrderList(
      this.$store.state.orderPageNum,
      this.$store.state.orderPageSize
    );
  }
};
</script>

<style scoped>
.manager-order-view {
  height: 100%;
  width: 100%;
}
.drawer-step {
  padding-bottom: 2%;
}
.el-row {
  flex-wrap: wrap;
}
.orderinfo .el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid#DCDFE6;
  padding: 0.8%;
}
.orderinfo .el-col .goods-item {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.orderinfo .el-col div p {
  width: 30%;
  display: flex;
  justify-content: flex-start;
}
.orderinfo .el-col div span {
  width: 70%;
  display: flex;
  justify-content: flex-start;
}
.orderinfo .order-goods-tag {
  border: 0px;
}
.orderinfo .no-border {
  border: 0px;
}
.goods-details {
  width: 100%;
}
</style>

<style>
.el-table .cancle-row {
  background-color: #ebeef5;
}

.el-table .success-row {
  background-color: #f0f9eb;
}

.el-image-viewer__close {
  color: #f56c6c;
}
</style>
