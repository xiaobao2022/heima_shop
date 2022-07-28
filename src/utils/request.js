// 创建一个axios实例
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/' // 基础路径
})
export default request
