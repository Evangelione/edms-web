import * as orderServices from '../services/order'

export default {
  namespace: 'order',
  state: {
    list: [],
    page: 1,
    total: 0,
    order_status: '',
    order_type: '1',
    currentTab: 'quanbu',
    statusNum: {},
    currentOrder: {},
    currentIndex: 0,
    find_str: '',
    customOption: [],
    siteOption: [],
    supplierOption: [],
    goodsOption: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        dispatch({
          type: 'save', payload: {
            currentKey: [pathname],
          },
        })
      })
    },
  },

  effects: {},

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },

}
