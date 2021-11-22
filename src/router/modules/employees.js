// 导出员工的路由规则

import Layout from '@/layout'

export default {
  // 路由规则
  path: '/employees',  // 路由地址
  name: 'employees', // 给路由规则加一个name
  component: Layout,
  children: [{
    path: '',  // 当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/employees'),
    // 路由元信息 存储数据的对象 可以在这里放置一些信息
    meta: {
      // meta属性的里面的属性随意定义 左侧导航会读取路由里的meta里的title作为显示菜单名称
      title: '员工管理',
      icon: 'people'
    }
  },
  {
    path: 'detail/:id', // query传参 动态路由传参
    component: () => import('@/views/employees/detail.vue'),
    hidden: true, // 不在左侧菜单显示
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }
  }]
}