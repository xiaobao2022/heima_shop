import request from '@/utils/request'

// 登入功能
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    params: data
  })
}
