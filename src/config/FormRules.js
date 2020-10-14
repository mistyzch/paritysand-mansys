/* eslint-disable no-useless-escape */
export const goodsFormRule = {
  goodsName: [{ required: true, message: "请填写商品名称", trigger: "blur" }],
  amount: [
    { required: true, message: "请填写商品库存", trigger: "blur" },
    { type: "number", message: "库存必须为数字值" }
  ],
  deliverCost: [{ type: "number", message: "配送费用必须为数字值" }],
  salePrice: [
    { required: true, message: "请填写商品单价", trigger: "blur" },
    { type: "number", message: "商品单价必须为数字值" }
  ],
  unit: [{ required: true, message: "请填写计价单位", trigger: "blur" }],
  goodsType: [{ required: true, message: "请选择商品类别", trigger: "change" }]
};

export const noticeFormRule = {
  title: [{ required: true, message: "请填写公告标题", trigger: "blur" }],
  content: [{ required: true, message: "请填写公告内容", trigger: "blur" }]
};

export const battleFormRule = {
  name: [{ required: true, message: "请填写砂场名称", trigger: "blur" }],
  latitude: [
    { required: true, message: "请填写砂场纬度", trigger: "blur" },
    {
      type: "string",
      message: "请输入正确的纬度",
      pattern: /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/,
      trigger: "blur"
    }
  ],
  longitude: [
    { required: true, message: "请填写砂场经度", trigger: "blur" },
    {
      type: "string",
      message: "请输入正确的经度",
      pattern: /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/,
      trigger: "blur"
    }
  ]
};

export const deliverFormRule = {
  name: [
    {
      type: "string",
      required: true,
      message: "请填写配送员名称",
      trigger: "blur"
    }
  ],
  tel: [
    { required: true, message: "请填写配送员电话号码", trigger: "blur" },
    {
      type: "string",
      message: "请输入正确的电话号码",
      pattern: /^1[3456789]\d{9}$/,
      trigger: "blur"
    }
  ]
};
