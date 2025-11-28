const API_BASE_URL = 'https://admin1.youtoube563.top/api' // 替换成您实际的API域名
const apis = {
  login: 'user/login', //登录
  register:"user/register",//注册
  getProductList:"product/getProductList",//产品列表
  getBannerList:'banner/getBannerList',//轮播图列表
  getKlineChart:'product/getKline',//k线图
  getproductData:'product/getProductInfo',//产品详细数据
  getUserinfo:'user/getUserinfo',//获取用户信息
  orderSubmit:'order/submit',//提交订单
  getOrderInfo:'order/getOrderInfo',//获取订单详情
  getOrderList:'order/getOrderList',//获取订单列表
  getNewsList:'news/getNewsList',//资讯列表
  getNewsInfo:'news/getNewsInfo',//资讯详情
  getConfig:'index/getConfig',//
  recharge:'recharge/submit',//充值
  getUserAddressList:'user/getUserAddressList',//获取用户地址
  saveUserAddressList:'user/saveUserAddressList',//usdt地址保存
  getRechargeList:'recharge/getRechargeList',//获取充值列表
  getUserBankList:'user/getUserBankList',//获取银行卡列表
  saveUserBankList:'user/saveUserBankList',//银行卡地址保存
  withdraw:'withdraw/submit',//提现
  getMoneyLog:'user/getMoneyLog',//获取余额变动日志
  getUserIncome:'user/getUserIncome',//获取用户收益
  upload:'common/upload',//上传
  saveIDCardImages:'user/saveIDCardImages',//认证
  getShareUrl:'user/getShareUrl',//获取分享链接
  resetpwd:'user/resetpwd',//修改密码
  getNoticeList:'notice/getNoticeList',//公告列表
};


// 为所有接口添加基础URL
Object.keys(apis).forEach((key) => {
  apis[key] = `${API_BASE_URL}/${apis[key]}`
});

export default apis;
