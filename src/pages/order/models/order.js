import * as orderServices from '../services/order'

export default {
  namespace: 'order',
  state: {
    list: [],
    page: 1,
    total: 0,
    order_type: '1',
    order_status: '',
    currentTab: 'icon-yingyongchengxu',
    find_str: '',
    statusNum: {},
    currentOrder: {},
    currentIndex: 0,
    customOption: [],
    siteOption: [],
    supplierOption: [],
    goodsOption: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {

      })
    },
  },

  effects: {
    * fetch({payload: {page = '1', order_type = '1', order_status = '', find_str = ''}}, {call, put, select}) {
      const {data} = yield call(orderServices.getOrderList, {page, order_type, order_status, find_str})
      const currentIndex = yield select(state => state.order.currentIndex)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            page: parseInt(page, 10),
            order_type,
            order_status,
            find_str,
            list: data.data.list,
            total: parseInt(data.data.count, 10),
            currentOrder: data.data.list[currentIndex],
            statusNum: data.data.status_num,
          },
        })
        // yield put({
        //   type: 'home/save',
        //   payload: {
        //     currentOrder: data.data.list[currentIndex],
        //   },
        // })
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },

}
