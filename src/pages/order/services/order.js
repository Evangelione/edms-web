import request from '../../../utils/request'
import { IP } from '../../../common/constants'

export function getOrderList({page, order_type, order_status, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', 8)
  formData.append('order_type', order_type)
  formData.append('order_status', order_status)
  formData.append('find_str', find_str)
  return request(`${IP}/home/order/order-list`, {
    method: 'POST',
    body: formData,
  })
}
