<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派给父级,这样只有鼠标移出整个三级列表样式才会改变 -->
      <div @mouseleave="navHidden" @mouseenter="navShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动列表 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级列表 -->
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur: currentIndex === index}">
                <h3 @mouseenter="changeIndex(index)">
                  <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a>
                </h3>
                <!-- 二级列表 -->
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem"  v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a>
                      </dt>
                      <!-- 三级列表 -->
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">宁宁商城超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import throttle from 'lodash/throttle'

  export default {
    name: "TypeNav",
    // 组件挂载完毕,向服务端发请求
    data() {
      return {
        currentIndex: -1,
        show: true
      }
    },
    methods: {
      // 使用js实现hover
      // changeIndex(index){
      //   this.currentIndex = index
      // },
      // 加入节流
      changeIndex: throttle(function(index){
        this.currentIndex = index
      },50),
      goSearch(event){
        // event 获取当前触发这个事件的节点,带有data-categoryName属性的节点一定是a标签
        // 节点有一个属性 dataset 属性,可以获取节点的自定义属性与属性值
        let element = event.target
        let { categoryname,categoryid1,categoryid2,categoryid3 } = element.dataset
        // 如果标签上拥有categoryname一定是a标签
        // 整理路由跳转参数
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if(categoryname){
          // 一级分类,二级分类,三级分类
          if(categoryid1){
            query.category1Id = categoryid1
          }else if(categoryid2){
            query.category1Id = categoryid2
          }else if(categoryid3){
            query.category1Id = categoryid3
          }
          // 整理完参数
          if(this.$route.params){
            location.params = this.$route.params
            location.query = query
            // 跳转路由
            this.$router.push(location)
          }
        }
      },
      // search页面三级列表的显示
      navShow(){
        if(this.$route.path != '/home'){
          this.show = true
        }
      },
      // search页面三级列表的隐藏
      navHidden(){
        this.currentIndex = -1
        if(this.$route.path != '/home'){
          this.show = false
        }
      }
    },
    mounted(){
      if(this.$route.path != '/home'){
        this.show = false
      }
    },
    computed: {
      ...mapState({
        // 右侧需要一个函数,当使用这个计算属性的时候,右侧函数就会立即执行一次
        // 注入一个参数state,其实为大仓库中的数据
        categoryList: state => state.home.categoryList.slice(0,16)
      })
    }
  }
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          // js实现hover
          .cur{
            background-color: #ddd;
          }

          .item {
            h3 {
              line-height: 28px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;

                &:hover{
                  cursor: pointer;
                }
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;

                    a {
                      &:hover {
                        cursor: pointer;
                      }
                    }
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    a {
                      &:hover {
                        cursor: pointer;
                      }
                    }

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            // &:hover {
            //   background-color: #ddd;
            //   .item-list {
            //     display: block;
            //   }
            // }
          }
        }
      }

      .sort-enter-active{
        height: 0;
      }
      .sort-enter-to{
        height: 461px;
      }
      .sort-enter-active{
        transition: all .1s linear;
        overflow: hidden;
      }
    }
  }
</style>
