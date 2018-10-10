import * as loginServices from '../services/sider'

export default {
  namespace: 'sider',
  state: {
    currentKey: ['/'],
    openKeys: [],
    rootSubmenuKeys: [],
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
