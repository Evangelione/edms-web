import request from '../utils/request'
import { IP } from '../constants'

export function count({ flag }) {
  let formData = new FormData()
  formData.append('flag', flag)
  return request(`${IP}/home/home/count`, {
    method: 'POST',
    body: formData,
  })
}
