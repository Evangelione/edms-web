// 全局接口
export const IP = '/xtw'

// 全局表格
export const PAGE_SIZE = 10

// 根据域名前几位判断该用什么logo和名称
export const LOGO = {
  lch: {
    name: '蓝采和',
    logo: require('../assets/image/Group.png'),
  },
  xny: {
    name: '鑫能源',
    logo: require('../assets/image/logo_xny.png'),
  },
  sh: {
    name: '实华',
    logo: require('../assets/image/Group.png'),
  },
  chenchen: {
    name: '蓝采和',
    logo: require('../assets/image/Group.png'),
  },
  localhost: {
    name: '蓝采和',
    logo: require('../assets/image/Group.png'),
  },
}

// 菜单list
export const menuData = [{
  name: '首页',
  iconfont: 'icon-shouye',
  path: '/',
}, {
  name: '我的订单',
  iconfont: 'icon-wodedingdan',
  path: '/order',
}, {
  name: '我的物流',
  iconfont: 'icon-wodewuliu',
  path: '/logistics',
}, {
  name: '我的账务',
  iconfont: 'icon-wodezhangwu',
  path: '/account',
  children: [
    {
      name: '余额管理',
      icon: '',
      path: '/account/balance',
      ischild: 1,
    },
    {
      name: '数据分析',
      icon: '',
      path: '/account/analysis',
      ischild: 1,
      // hideInBreadcrumb: true,
      // hideInMenu: true,
    },
  ],
}, {
  name: '我的客户',
  iconfont: 'icon-wodekehu',
  path: '/customer',
}, {
  name: '我的供应商',
  iconfont: 'icon-wodegongyingshang_',
  path: '/supplier',
}, {
  name: '我的公司',
  iconfont: 'icon-wodegongsi',
  path: '/company',
}]

// 订单顶部tabs
export const orderTabs = [{
  name: 'quanbu',
  value: '全部',
  status: '',
}, {
  name: 'daiqueren',
  value: '待确认',
  status: '1',
}, {
  name: 'daizhifu',
  value: '待支付',
  status: '2',
}, {
  name: 'daifahuo',
  value: '待发货',
  status: '3',
}, {
  name: 'daishouhuo',
  value: '待收货',
  status: '4',
}, {
  name: 'daijiesuan',
  value: '待结算',
  status: '5',
}, {
  name: 'yijiesuan',
  value: '已结算',
  status: '6',
}]


// 物流顶部tabs
export const logisticsTabs = [{
  name: 'quanbu',
  value: '全部',
  status: '',
}, {
  name: 'daidiaodu',
  value: '待调度',
  status: '1',
}, {
  name: 'daijiedan',
  value: '待接单',
  status: '2',
}, {
  name: 'yijiedan',
  value: '已接单',
  status: '3',
}, {
  name: 'yunshuzhong',
  value: '运输中',
  status: '4',
}, {
  name: 'yixieche',
  value: '已卸车',
  status: '5',
}, {
  name: 'yiwancheng',
  value: '已完成',
  status: '6',
}]
