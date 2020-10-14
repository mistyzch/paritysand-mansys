export const adminAPIList = {
  login: "/admin/login",
  logout: "/admin/logout",
  sendFinishMessage: "/admin/message",
  sendOrderMessage: "/wx/message",
  sendDeliverMessage: "/admin/message/adminpushMessageplus"
};

export const goodsAPIList = {
  getGoodsList: "/goods/g",
  updateGoods: "/goods",
  deleteGoods: "/goods",
  insertGoods: "/goods/insert"
};

export const orderAPIList = {
  getOrderList: "/orders/o",
  updateOrderStatus: "/orders",
  cancelOrder: "/orders/cancel",
  setDeliverInfo: "/orders/deliver"
};

export const commentAPIList = {
  getComments: "/comments",
  deleteComment: "/comments/delete"
};

export const noticeAPIList = {
  getNotice: "/announcement/a",
  deleteNotice: "/announcement",
  updateNotice: "/announcement",
  insertNotice: "/announcement/insert"
};

export const battleAPIList = {
  getBattle: "/battle",
  deleteBattle: "/battle",
  updateBattle: "/battle",
  insertBattle: "/battle/insert"
};
