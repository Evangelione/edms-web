export default {
  namespace: 'global',
  state: {},

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
