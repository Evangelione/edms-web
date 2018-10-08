import { Layout, Menu, Icon } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import styles from './index.css'
import { LOGO } from '../constants'

const {Sider} = Layout
const SubMenu = Menu.SubMenu
const logo = window.location.hostname.match(/[A-Za-z]+/g)[0]

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_778336_quvbaq5vn7.js',
})

const _Sider = ({currentKey, openKeys}) => {

  function onSelect({key}) {
    if (key !== 'balance' && key !== 'analysis') {
      this.setState({
        openKeys: [],
      })
    }
  }

  function onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({openKeys})
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  return (
    <Sider>
      <div className={styles.logo} style={{backgroundImage: `url(${LOGO[logo].logo})`}} />
      <Menu
        defaultSelectedKeys={currentKey}
        defaultOpenKeys={openKeys}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1">
          <IconFont type="icon-shouye" />
          <span>首页</span>
        </Menu.Item>
        <Menu.Item key="2">
          <IconFont type="icon-wodedingdan" />
          <span>我的订单</span>
        </Menu.Item>
        <Menu.Item key="3">
          <IconFont type="icon-wodewuliu" />
          <span>我的物流</span>
        </Menu.Item>
        <SubMenu key="sub1" title={<span><IconFont type="icon-wodezhangwu" /><span>我的账务</span></span>}>
          <Menu.Item key="5">余额管理</Menu.Item>
          <Menu.Item key="6">数据分析</Menu.Item>
        </SubMenu>
        <Menu.Item key="7">
          <IconFont type="icon-wodekehu" />
          <span>我的客户</span>
        </Menu.Item>
        <Menu.Item key="8">
          <IconFont type="icon-wodegongyingshang_" />
          <span>我的供应商</span>
        </Menu.Item>
        <Menu.Item key="9">
          <IconFont type="icon-wodegongsi" />
          <span>我的公司</span>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

function mapStateToProps(state) {
  const {currentKey, openKeys} = state.sider
  return {
    currentKey,
    openKeys,
  }
}

export default connect(mapStateToProps)(_Sider)
