import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Activity from '@/components/Activity'
import Hot from '@/components/Hot'
import Season from '@/components/Season'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/activity',
      name: 'Activity',
      component: Activity
    },{
      path: '/hot',
      name: 'Hot',
      component: Hot
    },{
      path: '/season',
      name: 'Season',
      component: Season
    }
  ]
})
