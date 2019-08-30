export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '账户管理', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/resource', title: '资源管理', icon: 'scan', component: 'Buttons',
            // subs: [
            //     { key: '/app/ui/buttons', title: '按钮', component: 'Buttons'},
            //     { key: '/app/ui/icons', title: '图标', component: 'Icons'},
            //     { key: '/app/ui/spins', title: '加载中', component: 'Spins'},
            //     { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications'},
            //     { key: '/app/ui/tabs', title: '标签页', component: 'Tabs'},
            //     { key: '/app/ui/banners', title: '轮播图', component: 'Banners'},
            //     { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle'},
            //     { key: '/app/ui/drags', title: '拖拽', component: 'Drags'},
            //     { key: '/app/ui/gallery', title: '画廊', component: 'Gallery'},
            //     { key: '/app/ui/map', title: '地图', component: 'MapUi'},
            // ],
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
            // subs: [
            //     { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable'},
            //     { key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable'},
            //     { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
            // ],
        },
        {
            key: '/app/module', title: '模块管理', icon: 'edit', component: 'BasicForm',
            // subs: [
            //     { key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm'},
            // ],
        },
        {
            key: '/app/navigation', title: '导航栏管理', icon: 'area-chart', component: 'NaviManage',
            // subs: [
            //     { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
            //     { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
            // ],
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