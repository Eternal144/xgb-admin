
export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '账户管理', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/resource', title: '资源管理', icon: 'scan', component: '',
            subs: [ //取决于一级标题的数量
                {   
                    key: '/app/resource/b', title: '按钮按钮', component: '',
                    subs: [
                            {   key: 'app/resource/b/aaa', title: '按钮按a', component: 'Spins'},
                            {   key: 'app/resource/b/bbb', title: '按钮按b', component: 'Notifications'}
                        ],
                },
                // {
                //      key: '/app/resource/a', title: '按钮按钮3', component: '',
                //     subs: [
                //             {   key: 'app/resource/a/aaa', title: '按钮按a', component: 'Spins'},
                //             {   key: 'app/resource/a/bbb', title: '按钮按b', component: 'Notifications'}
                //         ],
                // }
            ],
        },
        {
            key: '/app/edit', title: '发帖编辑', icon: 'rocket', component: '',
            subs: [
                { key: '/app/edit/activity', title: '活动类', component: 'EditActivity' },
                { key: '/app/edit/news', title: '新闻类', component: 'EditNews'},
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