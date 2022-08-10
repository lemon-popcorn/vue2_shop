import { reqCategoryList,reqGetBannerList } from '@/api/index'
// home模块小仓库
// 仓库存储数据的地方
const state = {
  categoryList: [],
  bannerList: []
}
// 修改state的唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList){
    state.categoryList = categoryList
  },
  BANNERLIST(state, bannerList){
    state.bannerList = bannerList
  }
}
// 书写业务逻辑,也可以处理异步,但不能修改state
const actions = {
  // 通过api里面的接口函数调用,向服务器发请求,获取服务器数据
  async categoryList({ commit }){
    let result = await reqCategoryList()
    if(result.code == 200){
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async bannerList({ commit }){
    let result = await reqGetBannerList()
    if(result.code == 200){
      commit('BANNERLIST', result.data)
    }
  }
}
// 类似计算属性,用于简化仓库数据,让组件获取仓库的数据更方便
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}