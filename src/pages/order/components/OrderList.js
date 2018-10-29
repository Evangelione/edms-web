import { Card, List, Pagination, Divider } from 'antd'
import { connect } from 'dva'
import { PAGE_SIZE } from '../../../common/constants'
import styles from '../index.css'

const tabColor = {
  '待确认': '#666',
  '待支付': '#FF4241',
  '待发货': '#f2b21a',
  '待收货': '#F17C40',
  '待结算': '#54A8FD',
  '已结算': '#00B763',
}

const tabColorOpacity = {
  '待确认': 'rgb(102,102,102,0.1)',
  '待支付': 'rgb(255,66,65,0.1)',
  '待发货': 'rgb(242,178,26,0.1)',
  '待收货': 'rgb(241,124,64,0.1)',
  '待结算': 'rgb(84,168,253,0.1)',
  '已结算': 'rgb(0,183,99,0.1)',
}

const OrderList = ({dispatch, list, page, total, order_type, order_status, find_str, currentIndex}) => {

  function renderItem(item, index) {
    return (
      <List.Item onClick={clickItme.bind(null, item, index)}
                 style={{cursor: 'pointer', paddingTop: 16, paddingBottom: 16}}
                 className={currentIndex === index ? styles.currentOrder : ''}>
        <List.Item.Meta
          title={
            <div className={styles.orderTitle}>
              <span className={styles.orderNumber}>{index + 1}</span>
              <span className={styles.orderGasName}>{item.name_gas_source ? item.name_gas_source : '暂无'}</span>
              <span className={styles.orderStatus}
                    style={{color: tabColor[item.status_name], background: tabColorOpacity[item.status_name]}}>
                <span className={styles.orderStatusDot}
                      style={{backgroundColor: tabColor[item.status_name]}} />
                {item.status_name}
              </span>
              <span className={styles.orderWeight}>{item.saler_num} 吨</span>
              <span className={styles.orderPrice}>({item.saler_price} 元/吨)</span>
              <span className={styles.orderCustomer}>客户名称: {item.customer_name}</span>
              <span className={styles.orderSite}>站点简称: {item.site_name}</span>
              <span className={item.order_type === '2' ? 'shexiao' : ''}></span>
            </div>
          }
          description={
            <div>
              <span style={{float: 'left', marginLeft: 85}}>创建时间: {item.create_time}</span>
              <span style={{float: 'right', marginRight: 25}}>预计交货时间: {item.recv_time}</span>
            </div>
          }
        />
      </List.Item>
    )
  }

  function clickItme(item, index) {
    dispatch({
      type: 'order/save',
      payload: {
        currentOrder: item,
        currentIndex: index,
      },
    })
    dispatch({
      type: 'home/save',
      payload: {
        currentOrder: item,
      },
    })
    dispatch({
      type: 'orderDetail/save',
      payload: {
        showMap: false,
      },
    })
  }

  function pageChangeHandler(page) {
    dispatch({
      type: 'order/fetch',
      payload: {
        page,
        order_type,
        order_status,
        find_str,
      },
    })
  }

  return (
    <Card bodyStyle={{padding: 0}}>
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={renderItem}
      />
      <Divider />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={page}
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
      />
    </Card>
  )
}


function mapStateToProps(state) {
  const {list, total, page, order_type, order_status, find_str, currentIndex} = state.order
  return {
    list,
    page,
    total,
    order_type,
    order_status,
    find_str,
    currentIndex,
    loading: state.loading.models.order,
  }
}

export default connect(mapStateToProps)(OrderList)
