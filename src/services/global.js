import request from '../utils/request'
import { IP } from '../common/constants'

export function login({account, pwd}) {
  let formData = new FormData()
  formData.append('account', account)
  formData.append('pwd', pwd)
  return request(`${IP}/home/login/login`, {
    method: 'POST',
    body: formData,
  })
}

export function logout({account, pwd}) {
  let formData = new FormData()
  formData.append('account', account)
  formData.append('pwd', pwd)
  return request(`${IP}/home/login/login`, {
    method: 'POST',
    body: formData,
  })
}

export function adminLogin({account, pwd}) {
  let formData = new FormData()
  formData.append('account', account)
  formData.append('pwd', pwd)
  return request(`${IP}/admin/login/login`, {
    method: 'POST',
    body: formData,
  })
}

export function adminLogout() {
  let formData = new FormData()
  return request(`${IP}/admin/login/logout`, {
    method: 'POST',
    body: formData,
  })
}
