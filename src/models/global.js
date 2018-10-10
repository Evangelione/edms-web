import * as globalServices from '../services/global'
import router from 'umi/router'
import { message } from 'antd'

export default {
  namespace: 'global',
  state: {},

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {
    * login({payload: {form}}, {call}) {
      const {data} = yield call(globalServices.login, form)
      if (data.code === 1) {
        message.success(data.msg)
        localStorage.setItem('loginAuth', data.user.auth)
        localStorage.setItem('userData', JSON.stringify(data.user))
        router.push({
          pathname: '/',
        })
      } else {
        message.error(data.msg)
      }
    },
    * logout({payload: {form}}, {call}) {
      const {data} = yield call(globalServices.logout)
      if (data.code === 1) {
        message.success(data.msg)
        localStorage.removeItem('loginAuth')
        localStorage.removeItem('userData')
        router.push({
          pathname: '/login',
        })
      } else {
        message.error(data.msg)
      }
    },
    * adminLogin({payload: {form}}, {call}) {
      const {data} = yield call(globalServices.adminLogin, form)
      if (data.code === 1) {
        message.success(data.msg)
        localStorage.setItem('backAuth', data.admin.auth)
        localStorage.setItem('adminData', JSON.stringify(data.admin))
        (data.admin.auth - 0) === 6 ?
          router.push({
            pathname: '/permission',
          })
          :
          router.push({
            pathname: '/backstage',
          })
      } else {
        message.error(data.msg)
      }
    },
    * adminLogout({payload}, {call}) {
      const {data} = yield call(globalServices.adminLogout)
      if (data.code === 1) {
        message.success(data.msg)
        localStorage.removeItem('backAuth')
        localStorage.removeItem('adminData')
        router.push({
          pathname: '/admin',
        })
      } else {
        message.error(data.msg)
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },

}
