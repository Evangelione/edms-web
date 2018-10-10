const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

export function isUrl(path) {
  return reg.test(path)
}

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

// function formatter(data, parentPath = '', parentAuthority) {
//   return data.map(item => {
//     let {path} = item
//     if (!isUrl(path)) path = parentPath + item.path
//     const result = {...item, path, authority: item.authority || parentAuthority}
//     if (item.children) result.children = formatter(item.children, `${parentPath}${item.path}`, item.authority)
//     return result
//   })
// }

// export const getMenuData = () => formatter(menuData)
