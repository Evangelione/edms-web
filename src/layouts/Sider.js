import { Layout, Menu, Icon } from 'antd'
import { connect } from 'dva'
import { withRouter } from 'react-router'
import Link from 'umi/link'
import { menuData } from '../common/menu'
import { LOGO } from '../common/constants'
import styles from './index.css'

const {Sider} = Layout
const SubMenu = Menu.SubMenu
const logo = window.location.hostname.match(/[A-Za-z]+/g)[0]
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_778336_quvbaq5vn7.js',
})
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />
  }
  if (typeof icon === 'string') {
    return <IconFont type={icon} />
  }
  return icon
}

const _Sider = ({dispatch, location, currentKey, openKeys, Authorized}) => {

  function getMenuItems(menusData) {
    if (!menusData) {
      return []
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = getSubMenuOrItem(item)
        return checkPermissionItem(item.authority, ItemDom)
      })
  }

  function getSubMenuOrItem(item) {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = getMenuItems(item.children)
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.iconfont ? (
                <span>
                  {getIcon(item.iconfont)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        )
      }
      return null
    } else {
      return <Menu.Item key={item.path} ischild={item.ischild}>{getLinkItem(item)}</Menu.Item>
    }
  }

  function getLinkItem(item) {
    const icon = getIcon(item.iconfont)
    const {name} = item
    return (
      <Link
        to={item.path}
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }

  function checkPermissionItem(authority, ItemDom) {
    if (Authorized && Authorized.check) {
      const {check} = Authorized
      return check(authority, ItemDom)
    }
    return ItemDom
  }

  function onSelect(dom) {
    if (!dom.item.props.ischild) {
      dispatch({
        type: 'sider/save',
        payload: {
          openKeys: [],
        },
      })
    }
    dispatch({
      type: 'sider/save',
      payload: {
        currentKey: dom.selectedKeys,
      },
    })
  }

  function onOpenChange(Keys) {
    const latestOpenKey = Keys.find(key => openKeys.indexOf(key) === -1)
    dispatch({
      type: 'sider/save',
      payload: {
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      },
    })
  }

  return (
    <Sider>
      <div className={styles.logo} style={{backgroundImage: `url(${LOGO[logo].logo})`}} />
      <Menu
        selectedKeys={currentKey}
        openKeys={openKeys}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
        mode="inline"
        theme="dark"
      >
        {getMenuItems(menuData)}
      </Menu>
    </Sider>
  )
}

function mapStateToProps(state) {
  const {currentKey, openKeys, rootSubmenuKeys} = state.sider
  return {
    currentKey,
    openKeys,
    rootSubmenuKeys,
  }
}

export default connect(mapStateToProps)(withRouter(_Sider))
