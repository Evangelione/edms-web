import { Card, Tabs, Row, Col, Radio, Button, Spin } from 'antd'
import { connect } from 'dva'
import AnimatePage from '../../components/AnimatePage/AnimatePage'
import OrderList from './components/OrderList'
import OrderDetail from './components/OrderDetail'
import MakeOrder from './components/MakeOrder/MakeOrder'
import DetailMap from '../../components/DetailMap/DetailMap'
import { IconFont, orderTabs } from '../../common/constants'
import styles from './index.css'

const {TabPane} = Tabs

const Order = ({dispatch, currentTab, find_str, order_status, order_type, statusNum, loading, showMap}) => {

  function changeOrderStatus(type, state) {
    if (loading) return false
    dispatch({
      type: 'order/save',
      payload: {
        currentTab: type,
        currentIndex: 0,
      },
    })
    dispatch({
      type: 'order/fetch',
      payload: {
        order_status: state,
        order_type,
        find_str,
      },
    })
  }

  function changeOrderType(e) {
    dispatch({
      type: 'order/save',
      payload: {
        order_type: e.target.value,
        currentIndex: 0,
      },
    })
    dispatch({
      type: 'order/fetch',
      payload: {
        order_type: e.target.value,
        order_status,
        find_str,
      },
    })
  }

  function createTabs() {
    return orderTabs.map(item =>
      <div onClick={changeOrderStatus.bind(null, item.name, item.status)}
           className={currentTab === item.name ? styles.blueFont : styles.grayFont}
           key={item.name}>
        <IconFont type={item.name} style={{fontSize: 39, verticalAlign: 'middle', marginRight: 5}} />
        <span>{item.value}</span>
        <span></span>
      </div>,
    )
  }

  return (
    <AnimatePage>
      <div className='page-title'>我的订单</div>
      <Card bodyStyle={{padding: '16px 32px'}}>
        <Tabs>
          <TabPane tab="我的订单" key="1">
            <div className='toolBar'>
              <MakeOrder>
                <Button type='primary' icon="plus" style={{boxShadow: '0px 1px 10px #1890ff'}}>我要下单</Button>
              </MakeOrder>
            </div>
            <div className='changeList'>
              {createTabs()}
            </div>
          </TabPane>
        </Tabs>
      </Card>
      <Radio.Group defaultValue={order_type} buttonStyle="solid" style={{marginTop: 10}} className='radioGp'
                   onChange={changeOrderType}>
        <Radio.Button value="1">预付款订单</Radio.Button>
        <Radio.Button value="2">赊销订单</Radio.Button>
      </Radio.Group>
      <Row gutter={10} style={{marginTop: 10}}>
        <Col span={10}>
          <Spin spinning={loading}>
            <OrderList />
          </Spin>
        </Col>
        <Col span={14}>
          <Spin spinning={loading}>
            {showMap ? <DetailMap /> : <OrderDetail />}
          </Spin>
        </Col>
      </Row>
    </AnimatePage>
  )
}

function mapStateToProps(state) {
  const {order_type, order_status, find_str, currentTab, statusNum, currentOrder} = state.order
  const {showMap} = state.global
  return {
    order_type,
    order_status,
    find_str,
    currentTab,
    statusNum,
    currentOrder,
    showMap,
    loading: state.loading.models.order,
  }
}

export default connect(mapStateToProps)(Order)
