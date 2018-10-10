import { Layout, Button } from 'antd'
import { connect } from 'dva'

const {Header} = Layout

const _Header = (props) => {
  function change() {
    props.dispatch({
      type:'sider/save',
      payload: {
        openKeys:['/account'],
        currentKey: ['/account/analysis']
      }
    })
  }
  return (
    <Header style={{backgroundColor: '#fff'}}>
      <Button type='primary' onClick={change}>123</Button>
    </Header>
  )
}

export default connect()(_Header)
