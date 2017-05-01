import Vue from 'vue'
import Router from 'vue-router'

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css' 
    
// import Hello from '@/components/Hello'
// import Login from '@/components/Login'
// import Error from '@/components/Error'

// import Login from '@/components/test/Login'
import Hellotest from '@/components/test/Hello'

import Login from '@/danger/Login'
import Register from '@/danger/Register'
import Main from '@/danger/Main'

import CriticalQuire from '@/danger/CriticalQuire'
import DeptInfo from '@/danger/DeptInfo'
import DangerQuire from '@/danger/DangerQuire'
import FileQuire from '@/danger/FileQuire'
import RecordQuire from '@/danger/RecordQuire'

import LoginAdmin from '@/danger/LoginAdmin'
import MainAdmin from '@/danger/MainAdmin'
import UserManager from '@/danger/UserManager'
import FileManager from '@/danger/FileManager'
import DangerManager from '@/danger/DangerManager'



Vue.use(Router)
Vue.use(Element)
Vue.use(iView)
//开启debug模式
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
     {
      path: '/Hellotest',
      name: 'Hellotest',
      component: Hellotest
    },
    {
      path: '/LoginAdmin',
      name: 'LoginAdmin',
      component: LoginAdmin
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      children:[
          {
          path: '/DeptInfo',
          name: 'DeptInfo',
          component: DeptInfo
        },
        //  {
        //   path: '',
        //   name: 'DeptInfo',
        //   component: DeptInfo
        // },
         {
          path: '/CriticalQuire',
          name: 'CriticalQuire',
          component: CriticalQuire
        },
         {
          path: '/DangerQuire',
          name: 'DangerQuire',
          component: DangerQuire
        },
         {
          path: '/FileQuire',
          name: 'FileQuire',
          component: FileQuire
        },
         {
          path: '/RecordQuire',
          name: 'RecordQuire',
          component: RecordQuire
        }
      ]
    },
    {
      path: '/MainAdmin',
      name: 'MainAdmin',
      component: MainAdmin,
      children:[
          {
          path: '/UserManager',
          name: 'UserManager',
          component: UserManager
        },
        //  {
        //   path: '',
        //   name: 'UserManager',
        //   component: UserManager
        // },
         {
          path: '/FileManager',
          name: 'FileManager',
          component: FileManager
        },
         {
          path: '/DangerManager',
          name: 'DangerManager',
          component: DangerManager
        },
      ]
    }
  ]
})


