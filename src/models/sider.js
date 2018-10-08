import * as loginServices from '../services/sider'

export default {
  namespace: 'sider',
  state: {
    currentKey: ['home'],
    openKeys: [],
    collapsed: false,
  },

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {},

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },

}
