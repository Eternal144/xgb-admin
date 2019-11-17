// SrcMan
export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '账户管理', icon: 'user', component: 'Dashboard', show: true },
        {
            key: '/app/resource', title: '资源管理', icon: 'folder', component: '', show: true
        },
        {
            key: '/app/edit', title: '发帖编辑', icon: 'edit', component: '', show: true,
            subs: [
                { key: '/app/edit/activity', title: '活动类', icon: 'flag', component: 'EditActivity',show: true },
                { key: '/app/edit/news', title: '新闻类', icon: 'profile', component: 'EditNews', show: true },
            ],
        },
        {
            key: '/app/banner', title: '轮播图管理', icon: 'pic-center', component: 'Banners', show: true
        },
        {
            key: '/app/module', title: '模块管理', icon: 'appstore', component: 'ModelIndex', show: true
        },
        {
            key: '/app/category', title: '栏目管理', icon: 'apartment', component: '', show: true,
            subs: [
                { key: '/app/category/list', title: '栏目列表', icon: 'unordered-list', component: 'CateListContainer', show: true },
                { key: '/app/category/modify', title: '栏目编辑', icon: 'folder-add', component: 'CateModify', show: true },
            ],
        },
        {
            key: '/app/navigation', title: '导航栏管理', icon: 'control', component: '', show: true,
            subs: [
                {
                    key: '/app/navigation/list', title: '导航栏列表', icon: 'unordered-list', component: 'NaviListContainer', show: true
                },
                {
                    key: '/app/navigation/modify', title: '导航栏编辑', icon: 'scissor', component: 'NaviModify', show: false
                }
            ]
        },

    ],
    others: [] // 非菜单相关路由
}