import { Card, Tabs, Button } from 'antd'
import { connect } from 'dva'
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

  return (
    <>
      <div className='page-title'>我的订单</div>
      <Card>
        <Tabs>
          <TabPane tab="我的订单" key="1">
            <div className={'toolBar'}>
              {/*<OrderModal>*/}
              <Button type='primary' icon="plus"
                      style={{boxShadow: '0px 1px 10px #1890ff'}}>我要下单</Button>
              {/*</OrderModal>*/}
            </div>
            <div className='changeList'>
              <div onClick={changeClass.bind(null, 'quanbu', '')}
                   className={currentTab === 'quanbu' ? styles.blueFont : styles.grayFont}>
                <span className={currentTab === 'quanbu' ? 'quanbuBlue ' : 'quanbuGray'}></span>
                <span>全部</span>
                <span></span>
              </div>
              <div onClick={changeClass.bind(null, 'daiqueren', '0')}
                   className={currentTab === 'daiqueren' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daiqueren' ? 'daiquerenBlue ' : 'daiquerenGray'}></span>
                <span>待确认</span>
                <span style={{color: 'red'}}>({statusNum.dqr})</span>
              </div>
              <div onClick={changeClass.bind(null, 'daizhifu', '1')}
                   className={currentTab === 'daizhifu' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daizhifu' ? 'daizhifuBlue ' : 'daizhifuGray'}></span>
                <span>待支付</span>
                <span style={{color: 'red'}}>({statusNum.dzf})</span>
              </div>
              <div onClick={changeClass.bind(null, 'daifahuo', '2')}
                   className={currentTab === 'daifahuo' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daifahuo' ? 'daifahuoBlue ' : 'daifahuoGray'}></span>
                <span>待发货</span>
                <span style={{color: 'red'}}>({statusNum.dfh})</span>
              </div>
              <div onClick={changeClass.bind(null, 'daishouhuo', '3')}
                   className={currentTab === 'daishouhuo' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daishouhuo' ? 'daishouhuoBlue ' : 'daishouhuoGray'}></span>
                <span>待收货</span>
                <span style={{color: 'red'}}>({statusNum.dsh})</span>
              </div>
              <div onClick={changeClass.bind(null, 'daijiesuan', '4')}
                   className={currentTab === 'daijiesuan' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daijiesuan' ? 'daijiesuanBlue ' : 'daijiesuanGray'}></span>
                <span>待结算</span>
                <span style={{color: 'red'}}>({statusNum.djs})</span>
              </div>
              <div onClick={changeClass.bind(null, 'yijiesuan', '5')}
                   className={currentTab === 'yijiesuan' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'yijiesuan' ? 'yijiesuanBlue ' : 'yijiesuanGray'}></span>
                <span>已结算</span>
                <span></span>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </>
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
