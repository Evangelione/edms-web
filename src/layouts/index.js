import { Layout } from 'antd'
import Sider from './Sider'
import Header from './Header'
import styles from './index.css'

const {Content} = Layout

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
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
