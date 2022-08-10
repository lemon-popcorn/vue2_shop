// 对axios进行二次封装
import axios from "axios"
// 引入进度条插件
import nProgress from "nprogress"
// star:进度条开始,done:进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create创建一个axios实例
// 2.requests就是axios,进行配置
const requests = axios.create({
  // 配置对象
  // 基础路径
  baseURL: '/mock',
  // 超时时间 5s
  timeout: 5000,
})
// 请求拦截器
requests.interceptors.request.use((config) => {
  // 进度条开始
  nProgress.start()
  // config:配置对象,对象里面有一个属性很重要,header请求头
  return config
})
requests.interceptors.response.use((res) => {
  // 进度条结束
  nProgress.done()
  // 成功的回调
  return res.data
}, (error) => {
  console.log(error.message)
  return new Promise(() => {})
})

// 对外暴露
export default requests