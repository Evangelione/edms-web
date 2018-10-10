import { Layout } from 'antd'
import Sider from './Sider'
import Header from './Header'
import Content from './Content'

const BasicLayout = ({location, children}) => {
  if (location.pathname === '/login' || location.pathname === '/admin') {
    return (
      <>{children}</>
    )
  }
  return (
    <Layout style={{height: '100vh'}}>
      <Sider />
      <Layout>
        <Header />
        <Content children={children} />
      </Layout>
    </Layout>
  )
}

export default BasicLayout
