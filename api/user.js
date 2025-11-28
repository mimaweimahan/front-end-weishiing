import request from '@/utils/request'
import { API } from '@/utils/config'

export const login = (data) => {
  return request({
    url: API.login,
    method: 'POST',
    data
  })
} 