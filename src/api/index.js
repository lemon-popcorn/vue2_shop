// 所有api进行统一管理
import requests from './request';
import mockRequest from './mockAJax'

// 三级联动接口
// /api/product/getBaseCategoryList  GET  无参数
export const reqCategoryList = () => {
  // 发请求:axios发请求返回Promise对象
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}

// 获取banner(home首页轮播图接口)
export const reqGetBannerList = () => mockRequest.get('/banner')