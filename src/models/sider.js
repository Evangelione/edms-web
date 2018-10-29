import * as loginServices from '../services/sider'

export default {
  namespace: 'sider',
  state: {
    currentKey: ['/'],
    openKeys: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        dispatch({
          type: 'save', payload: {
            currentKey: [pathname],
          },
        })
        dispatch({
          type: `${pathname.substr(1)}/fetch`,
          payload: {},
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
