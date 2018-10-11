import { Card, Tabs, Button } from 'antd'
import { connect } from 'dva'
import AnimatePage from '../../components/AnimatePage/AnimatePage'
import { orderTabs } from '../../common/constants'
import styles from './index.css'

const TabPane = Tabs.TabPane

const Order = ({dispatch, currentTab, find_str, order_status, order_type, statusNum, loading}) => {

  function changeClass(type, state) {
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

  function createTabs() {
    return orderTabs.map(item =>
      <div onClick={changeClass.bind(null, item.name, item.status)}
           className={currentTab === item.name ? styles.blueFont : styles.grayFont}
           key={item.name}>
        <span></span>
        <span>{item.value}</span>
        <span></span>
      </div>,
    )
  }

  return (
    <AnimatePage>
      <div className='page-title'>我的订单</div>
      <Card>
        <Tabs>
          <TabPane tab="我的订单" key="1">
            <div className='toolBar'>
              {/*<OrderModal>*/}
              <Button type='primary' icon="plus"
                      style={{boxShadow: '0px 1px 10px #1890ff'}}>我要下单</Button>
              {/*</OrderModal>*/}
            </div>
            <div className='changeList'>
              {createTabs()}
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </AnimatePage>
  )
}

function mapStateToProps(state) {
  const {currentTab, find_str, order_status, order_type, statusNum, currentOrder} = state.order
  return {
    currentTab,
    find_str,
    order_status,
    order_type,
    statusNum,
    currentOrder,
    loading: state.loading.models.order,
  }
}

export default connect(mapStateToProps)(Order)
