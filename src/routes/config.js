
export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '账户管理', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/resource', title: '资源管理', icon: 'scan', component: 'SrcMan',
        },
        {
            key: '/app/edit', title: '发帖编辑', icon: 'rocket', component: '',
            subs: [
                { key: '/app/edit/activity', title: '活动类', component: 'EditActivity' },
                { key: '/app/edit/news', title: '新闻类', component: 'EditNews' },
            ],
        },
        {
            key: '/app/banner', title: '轮播图管理', icon: 'copy', component: 'Banners',
        },
        {
            key: '/app/module', title: '模块管理', icon: 'edit', component: 'BasicForm',
        },
        {
            key: '/app/navigation', title: '导航栏管理', icon: 'area-chart', component: 'NaviManage',
        },
        // {
        //     key: '/subs4', title: '页面', icon: 'switcher',
        //     subs: [
        //         { key: '/login', title: '登录' },
        //         { key: '/404', title: '404' },
        //     ],
        // },
    ],
    others: [] // 非菜单相关路由
}