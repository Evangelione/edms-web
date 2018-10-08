import { Layout } from 'antd'
import Sider from './Sider'
import Header from './Header'
import Content from './Content'
import styles from './index.css'

const BasicLayout = (props) => {
  return (
    <Layout style={{height: '100vh'}}>
      <Sider />
      <Layout>
        <Header />
        <Content />
      </Layout>
    </Layout>
  )
}

export default BasicLayout
