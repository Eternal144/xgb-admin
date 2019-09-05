
export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '账户管理', icon: 'user', component: 'Dashboard' },
        {
            key: '/app/resource', title: '资源管理', icon: 'folder', component: 'SrcMan',
        },
        {
            key: '/app/edit', title: '发帖编辑', icon: 'edit', component: '',
            subs: [
                { key: '/app/edit/activity', title: '活动类', icon: 'flag', component: 'EditActivity' },
                { key: '/app/edit/news', title: '新闻类', icon: 'profile', component: 'EditNews' },
            ],
        },
        {
            key: '/app/banner', title: '轮播图管理', icon: 'pic-center', component: 'Banners',
        },
        {
            key: '/app/module', title: '模块管理', icon: 'appstore', component: 'BasicForm',
        },
        {
            key: '/app/navigation', title: '导航栏管理', icon: 'apartment', component: 'NaviManage',
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