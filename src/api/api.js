import {
  adminAPIList,
  goodsAPIList,
  orderAPIList,
  commentAPIList,
  noticeAPIList,
  battleAPIList
} from "../config/apilist";
import { post, get, put, axiosDelete } from "./index";

//admin
const login = (adminName, password) => {
  return post(adminAPIList.login, { adminName, password });
};
const logout = () => {
  return get(adminAPIList.logout);
};

const sendFinishMessage = (remarks, title, orderNumber, userId) => {
  return post(adminAPIList.sendFinishMessage, {
    remarks,
    title,
    orderNumber,
    userId
  });
};

const sendOrderMessage = (
  money,
  time,
  userId,
  userName,
  deliveryAddress,
  destination,
  telephone
) => {
  return post(adminAPIList.sendOrderMessage, {
    money,
    time,
    userId,
    userName,
    deliveryAddress,
    destination,
    telephone
  });
};

const sendDeliverMessage = (
  userId,
  orderId,
  status,
  driverName,
  phoneNumber,
  remarks
) => {
  return post(adminAPIList.sendDeliverMessage, {
    userId,
    orderId,
    status,
    driverName,
    phoneNumber,
    remarks
  });
};

//goods
const getGoodsList = (pageNum, pageSzie) => {
  return get(goodsAPIList.getGoodsList + `/${pageNum}/${pageSzie}`);
};

/**
 * 更新商品信息
 * @param {String} id 商品ID 唯一主键
 * @param {String} goodsName 商品名称
 * @param {Number} amount 商品数量
 * @param {Number} deliverCost 商品配送费
 * @param {*} file 商品图片
 * @param {Number} monthySales 月销售量
 * @param {String} note 商品说明
 * @param {Number} salePrice 商品单价
 */
const updateGoods = (
  id,
  goodsName,
  amount,
  deliverCost,
  file,
  monthySales,
  note,
  salePrice,
  unit,
  goodsType
) => {
  return put(goodsAPIList.updateGoods + `/${id}`, {
    goodsName,
    amount,
    deliverCost,
    file,
    monthySales,
    note,
    salePrice,
    unit,
    goodsType
  });
};

/**
 * 新建商品信息
 * @param {String} id 商品ID 唯一主键
 * @param {String} goodsName 商品名称
 * @param {Number} amount 商品数量
 * @param {Number} deliverCost 商品配送费
 * @param {*} file 商品图片
 * @param {Number} monthySales 月销售量
 * @param {String} note 商品说明
 * @param {Number} salePrice 商品单价
 */
const insertGoods = (
  goodsName,
  amount,
  deliverCost,
  file,
  monthySales,
  note,
  salePrice,
  unit,
  goodsType
) => {
  return post(goodsAPIList.insertGoods, {
    goodsName,
    amount,
    deliverCost,
    file,
    monthySales,
    note,
    salePrice,
    unit,
    goodsType
  });
};

/**
 * 删除商品ID
 * @param {String} id 商品ID
 */
const deleteGoods = id => {
  return axiosDelete(goodsAPIList.deleteGoods + `/${id}`);
};

//order

/**
 * 获取订单列表
 * @param {Number} pageNum 页号
 * @param {Number} pageSzie 一页内容数量
 */
const getOrderList = (pageNum, pageSzie) => {
  return get(orderAPIList.getOrderList + `/${pageNum}/${pageSzie}`);
};

/**
 * 修改订单状态
 * @param {String} id 订单id
 * @param {String} status 订单状态
 */
const updateOrderStatus = (id, status) => {
  return put(orderAPIList.updateOrderStatus + `/${id}`, { status });
};

const cancelOrder = (id, cancelReason) => {
  return put(orderAPIList.cancelOrder + `/${id}`, { cancelReason });
};

//comment

/**
 * 获取用户评论
 */
const getComments = () => {
  return get(commentAPIList.getComments);
};

/**
 * 删除用户评论
 * @param {String} id 评论id
 */
const deleteComment = id => {
  return axiosDelete(commentAPIList.deleteComment + `?id=${id}`);
};

//notice公告

const getNotice = (pageNum, pageSzie) => {
  return get(noticeAPIList.getNotice + `/${pageNum}/${pageSzie}`);
};

const deleteNotice = id => {
  return axiosDelete(noticeAPIList.deleteNotice + `/${id}`);
};

const insertNotice = (title, content) => {
  return post(noticeAPIList.insertNotice, { title, content });
};

const updateNotice = (id, title, content) => {
  return put(noticeAPIList.updateNotice + `/${id}`, { title, content });
};

//battle砂场位置

/**
 * 获取所有砂场
 */
const getBattle = () => {
  return get(battleAPIList.getBattle);
};

/**
 * 删除砂场
 * @param {String} id 砂场id
 */
const deleteBattle = id => {
  return axiosDelete(battleAPIList.deleteBattle + `/${id}`);
};

/**
 * 更改砂场信息
 * @param {String} id 砂场id
 * @param {String} latitude 砂场纬度
 * @param {String} longitude 砂场经度
 * @param {String} name 砂场名称
 */
const updateBattle = (id, latitude, longitude, name) => {
  return put(battleAPIList.updateBattle + `/${id}`, {
    latitude,
    longitude,
    name
  });
};

/**
 * 新增砂场
 * @param {String} latitude 砂场纬度
 * @param {String} longitude 砂场经度
 * @param {String} name 砂场名称
 */
const insertBattle = (latitude, longitude, name) => {
  return post(battleAPIList.insertBattle, { latitude, longitude, name });
};

/**
 *设置配送人员信息
 *
 * @param {*} id
 * @returns
 */
/**
 *
 *
 * @param {String} id 订单id
 * @param {String} deliveryName 配送人员姓名
 * @param {String} deliveryPhone  配送人员电话
 * @returns
 */
const setDeliverInfo = (id, deliveryName, deliveryPhone) => {
  return put(orderAPIList.setDeliverInfo + `/${id}`, {
    deliveryName,
    deliveryPhone
  });
};
export default {
  login,
  logout,
  sendFinishMessage,
  sendOrderMessage,
  sendDeliverMessage,
  getGoodsList,
  updateGoods,
  deleteGoods,
  insertGoods,
  getOrderList,
  updateOrderStatus,
  cancelOrder,
  getComments,
  deleteComment,
  getNotice,
  deleteNotice,
  insertNotice,
  updateNotice,
  getBattle,
  deleteBattle,
  updateBattle,
  insertBattle,
  setDeliverInfo
};
