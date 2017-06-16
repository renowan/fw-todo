import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import home from '../pages/home/HomeView.vue'

// 作業スペース
import Step1View from '../pages/Step1/Step1View.vue'
import Step2View from '../pages/Step2/Step2View.vue'

// UIサンプル
import code from '../pages/code/CodeView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/step1',
      name: 'step1',
      component: Step1View
    },
    {
      path: '/step2',
      name: 'step2',
      component: Step2View
    },
    {
      path: '/code',
      name: 'code',
      component: code
    }
  ]
})
