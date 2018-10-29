import { Card, Steps, Button, Collapse, Row, Col, Divider } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import styles from '../index.css'

const {Step} = Steps
const {Panel} = Collapse

const OrderList = ({dispatch, currentOrder}) => {
  const yuePay = ((currentOrder.balance - 0) - (currentOrder.final_money - 0)) >= 0 ? (currentOrder.final_money - 0) : (currentOrder.balance - 0)
  const xinyongPay = ((currentOrder.balance - 0) - (currentOrder.final_money - 0)) >= 0 ? 0 : ((currentOrder.final_money - 0) - (currentOrder.balance - 0))
  const activeKey = []

  function showOrderMap() {
    dispatch({
      type: 'global/save',
      payload: {
        showMap: true,
      },
    })
  }

  function goLogisticsList() {
    dispatch(routerRedux.push({
      pathname: '/logistics',
    }))
    dispatch({
      type: 'logistics/getDeliverList',
      payload: {
        page: 1,
        deliver_status: '1',
      },
    })
    dispatch({
      type: 'logistics/save',
      payload: {
        currentTab: 'daidiaodu',
        currentIndex: 0,
      },
    })
  }

  function expand() {
    // setState({
    //   expand: !expand,
    //   activeKey: activeKey.length === 0 ? ['1'] : [],
    // })
  }

  function viewReport() {
    window.open(currentOrder.temperament_report)
  }

  return (
    <Card title={<div style={{color: '#545F76', fontSize: 15}}>订单编号：{currentOrder.order_code}</div>}
          extra={<div>创建时间：{currentOrder.order_date}</div>}>
      <Steps progressDot current={currentOrder.order_status - 0} style={{margin: '70px 0 80px'}}>
        <Step title="待确认" />
        <Step title="待支付" />
        <Step title="待发货" />
        <Step title="待收货" description={
          <div className={styles.upArrow} onClick={showOrderMap}
               style={{display: (currentOrder.order_status - 0) >= 3 ? 'block' : 'none'}}>
            <Button size='large' className={styles.showMapBtn}>查看地图</Button>
          </div>} />
        <Step title="待结算" />
        <Step title="已结算" />
      </Steps>
      <div style={{margin: '0 20px'}}>
        <Divider style={{backgroundColor: '#e8e8e8', height: 2}} />
      </div>
      {/*订单状态*/}
      <div style={{paddingLeft: 20, margin: '40px 0'}}>
        <div className={styles.detailTitle}>订单状态：{currentOrder.status_name}</div>
        {currentOrder.order_status === '0' ?
          <>
            <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>确认小程序上的订单以进行下一步操作</div>
            <div style={{float: 'right', marginTop: '-60px', marginRight: 20}}>
              {/*<OrderModal confirm={true} currentOrder={currentOrder}>*/}
              <Button type='primary' style={{marginRight: 10}}>确认订单</Button>
              {/*</OrderModal>*/}
              {/*<PromptModal state={'cancelOrder'} cancelId={currentOrder.order_id}>*/}
              <Button style={{height: 32, marginRight: 10}}>取消订单</Button>
              {/*</PromptModal>*/}
            </div>
          </> : currentOrder.order_status === '1' ?
            <>
              <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>付款方式：预付款</div>
              <div style={{color: '#545F76', fontWeight: 600, fontSize: 17, marginBottom: 8}}>
                合计金额：
                <span
                  style={{color: '#FF4241', fontSize: 22}}>￥{currentOrder.final_money}</span>
                <span
                  style={{color: '#A1A9B3', fontWeight: 400}}>&nbsp;&nbsp;(多含7.5%预付款)</span>
              </div>
              <div
                style={{color: '#A1A9B3', fontSize: 15}}>余额支付 {yuePay.toFixed(2)} 元，信用支付 {xinyongPay.toFixed(2)} 元
              </div>
              <div style={{
                float: 'right',
                marginTop: '-32px',
                marginRight: 20,
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
              }}>
                {/*<Button type='primary' style={{marginRight: 10}}>立即支付</Button>*/}
                {/*<StatusModal id={currentOrder.order_id} />*/}
                {/*<OrderModal modify={true} currentOrder={currentOrder}>*/}
                <Button className='blueBorder' style={{height: 32, marginRight: 10}}>修改订单</Button>
                {/*</OrderModal>*/}
                {/*<PromptModal state={'cancelOrder'} cancelId={currentOrder.order_id}>*/}
                <Button>取消订单</Button>
                {/*</PromptModal>*/}
              </div>
            </> : currentOrder.order_status === '2' ?
              <div>
                <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>请前往“我的物流”里进行调度，以保证订单能够顺利进行~</div>
                <div style={{float: 'right', marginTop: '-60px', marginBottom: '40px', marginRight: 20}}>
                  <div onClick={goLogisticsList} style={{
                    background: `url(${require('../../../assets/image/scheduling_now.gif')})`,
                    width: 102,
                    height: 38,
                    marginRight: 10,
                    cursor: 'pointer',
                  }}></div>
                  {/*马上去调度*/}
                </div>
              </div> : currentOrder.order_status === '3' ?
                <div>
                  <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>请前往“我的物流”里进行上传磅单等操作</div>
                </div> : currentOrder.order_status === '4' ?
                  <div>
                    <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>点击“去结算”，在弹出窗口上进行订单结算</div>
                    <div style={{float: 'right', marginTop: '-60px', marginBottom: '40px', marginRight: 20}}>
                      {/*<ResultModal>*/}
                      <div style={{
                        background: `url(${require('../../../assets/image/settlement.gif')})`,
                        width: 74,
                        height: 38,
                        marginRight: 10,
                      }}></div>
                      {/*</ResultModal>*/}
                    </div>
                  </div> : currentOrder.order_status === '5' ?
                    <div>
                      <div style={{color: '#A1A9B3', fontSize: 15, marginBottom: 20}}>此订单已完成，您可以继续进行其它订单操作~</div>
                    </div> : ''
        }
      </div>
      <div style={{margin: '0 20px'}}>
        <Divider style={{backgroundColor: '#e8e8e8', height: 2}} />
      </div>
      {/*供应商信息*/}
      <div style={{paddingLeft: 20, margin: '40px 0'}}>
        <Row>
          <Col span={12} style={{fontSize: 14}}>
            <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>供应商信息</div>
            {currentOrder.order_status === '0' ?
              <div style={{color: '#A1A9B3', fontSize: 15}}>未选择供应商</div> :
              <div>
                <div style={{marginBottom: 4}}>{currentOrder.supp_name}</div>
                <div style={{marginBottom: 4}}>{currentOrder.supp_contact}</div>
                <div style={{marginBottom: 6}}>{currentOrder.supp_mobile}</div>
                <div style={{fontWeight: 600}}>采购价：{currentOrder.purchase_price}元/吨</div>
              </div>}
          </Col>
          <Col span={12} style={{fontSize: 14}}>
            <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>客户信息</div>
            <div style={{marginBottom: 4}}>{currentOrder.customer_name}</div>
            <div style={{marginBottom: 4}}>{currentOrder.customer_contact}</div>
            <div style={{marginBottom: 6}}>{currentOrder.customer_mobile}</div>
            <div style={{fontWeight: 600}}>销售价：{currentOrder.saler_price}元/吨</div>
          </Col>
        </Row>
      </div>
      <div style={{margin: '0 20px'}}>
        <Divider style={{backgroundColor: '#e8e8e8', height: 2}} />
      </div>
      {/*装货信息*/}
      <Collapse style={{border: 0}} onChange={expand} activeKey={activeKey}>
        <Panel style={{
          background: '#fff',
          borderRadius: 4,
          marginBottom: 61,
          border: 0,
          overflow: 'hidden',
        }} activeKey={[]} showArrow={false}
               header={expand ? <span style={{color: '#A1A9B3', paddingLeft: 10}}>详细信息：</span>
                 :
                 <span style={{color: '#A1A9B3', paddingLeft: 10}}>展开更多</span>} key="1">
          <div>
            <div style={{paddingLeft: 20, margin: '30px 0'}}>
              <Row>
                <Col span={12} style={{fontSize: 14}}>
                  <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>装货信息</div>
                  {currentOrder.order_status === '0' ?
                    <div style={{color: '#A1A9B3', fontSize: 15}}>暂无装货信息</div> :
                    <div>
                      <div style={{marginBottom: 4}}>{currentOrder.cargo_contact}</div>
                      <div style={{marginBottom: 6}}>{currentOrder.cargo_mobile}</div>
                      <div
                        style={{marginBottom: 6}}>{currentOrder.cargo_province + '/' + currentOrder.cargo_city + '/' + (currentOrder.cargo_area ? currentOrder.cargo_area + '/' : '') + currentOrder.detailed_address}</div>
                      {currentOrder.temperament_report ?
                        <div style={{marginBottom: 6, color: '#3477ED', cursor: 'pointer'}}
                             onClick={viewReport}>查看气质报告</div> :
                        <div style={{marginBottom: 6}}>暂无气质报告</div>}
                    </div>}
                </Col>
                <Col span={12} style={{fontSize: 14}}>
                  <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>收货信息</div>
                  <div style={{marginBottom: 4, fontWeight: 600}}>
                    {currentOrder.site_name}
                    <span style={{
                      background: 'rgba(28,134,246, 0.2)',
                      color: '#1C86F6',
                      padding: '0 5px',
                      display: 'inline-block',
                      height: 18,
                      fontSize: 12,
                      marginLeft: 10,
                    }}>加气站</span>
                  </div>
                  <div style={{marginBottom: 4}}>{currentOrder.recv_contact}</div>
                  <div style={{marginBottom: 6}}>{currentOrder.recv_phone}</div>
                  <div
                    style={{marginBottom: 6}}>{currentOrder.delivery_province + '/' + currentOrder.delivery_city + '/' + (currentOrder.delivery_area ? currentOrder.delivery_area + '/' : '') + currentOrder.detaileds_address}</div>
                  <div style={{marginBottom: 6}}>交货时间: {currentOrder.recv_time}</div>
                  <div style={{marginBottom: 6, marginTop: 12, color: '#A1A9B3'}}>用户类型: LNG加气站</div>
                  <div style={{marginBottom: 6, color: '#A1A9B3'}}>配送方式: {currentOrder.deliver_type_name}</div>
                </Col>
              </Row>
            </div>
            <div style={{margin: '0 20px'}}>
              <Divider style={{backgroundColor: '#e8e8e8', height: 2}} />
            </div>
            {/*物流信息*/}
            <div style={{paddingLeft: 20, margin: '40px 0'}}>
              <div style={{fontSize: 18, fontWeight: 600, marginBottom: 10}}>物流信息</div>
              {currentOrder.order_status === '0' ?
                <div>
                  <div style={{marginBottom: 4, color: '#545F76'}}>运距: --</div>
                  <div style={{marginBottom: 4, color: '#545F76'}}>运费单价: --</div>
                  <div
                    style={{
                      float: 'right',
                      marginTop: '-88px',
                      marginRight: 20,
                      color: '#545F76',
                    }}>运单编号：暂无
                  </div>
                </div> :
                <div>
                  <div style={{marginBottom: 4, color: '#545F76'}}>运距: {currentOrder.distance}公里</div>
                  <div style={{marginBottom: 4, color: '#545F76'}}>运费单价: {currentOrder.deliver_price}元/吨/公里</div>
                  <div
                    style={{
                      float: 'right',
                      marginTop: '-88px',
                      marginRight: 20,
                      color: '#545F76',
                    }}>运单编号：{currentOrder.deliver_code}
                  </div>
                </div>}
            </div>
            <div style={{margin: '0 20px'}}>
              <Divider style={{backgroundColor: '#e8e8e8', height: 2}} />
            </div>
            {/*进度条*/}
            {/*{currentOrder.create_time ?*/}
            {/*<div>*/}
            {/*<TimeLine detail={currentOrder} />*/}
            {/*<div style={{margin: '0 40px 30px'}}>*/}
            {/*<Map center={{lng: 116.402544, lat: 39.928216}} zoom="11">*/}
            {/*<Marker position={{lng: 116.402544, lat: 39.928216}} />*/}
            {/*<NavigationControl />*/}
            {/*<InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题" />*/}
            {/*</Map>*/}
            {/*</div>*/}
            {/*</div> : ''*/}
            {/*}*/}
            <div style={{color: '#A1A9B3', paddingLeft: 25, cursor: 'pointer'}} onClick={expand}>收起</div>
          </div>
        </Panel>
      </Collapse>
    </Card>
  )
}


function mapStateToProps(state) {
  const {list, total, page, order_type, order_status, currentOrder, currentIndex} = state.order
  return {
    list,
    page,
    total,
    order_type,
    order_status,
    currentOrder,
    currentIndex,
    loading: state.loading.models.order,
  }
}

export default connect(mapStateToProps)(OrderList)
