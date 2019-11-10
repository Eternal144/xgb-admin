/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import ModelIndex from './forms/ModuleIndex';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
import Buttons from './ui/Buttons';
import SrcMan from './ui/SrcMan';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import NaviManage from './navigation/NaviManage';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import EditActivity from './edit/EditActivity';
import EditNews from './edit/EditNews';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Cssmodule from './cssmodule';
import QueryParams from './extension/QueryParams';
import CateListContainer from './category/CateListContainer'
import CateModify from './category/CateModify'
import NaviListContainer from './navigation/NaviListContainer'
import NaviModify from './navigation/NaviModifyContainer'


const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    ModelIndex, BasicTable, AdvancedTable, AsynchronousTable,
    Echarts, Buttons, Notifications,
    Tabs, Banners, Drags, Dashboard, Gallery,
    AuthBasic, RouterEnter, WysiwygBundle, SrcMan,
    Cssmodule, QueryParams, EditActivity, NaviManage, EditNews
    , CateListContainer, CateModify, NaviListContainer, NaviModify
}