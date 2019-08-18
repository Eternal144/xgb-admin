/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicForm from './forms/BasicForm';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
// import Recharts from './charts/Recharts';
// import Icons from './ui/Icons';
import Buttons from './ui/Buttons';
import Spins from './ui/Spins';
// import Modals from './ui/Modals';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import NaviManage from './navigation/NaviManage';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Edit from './edit/Edit';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Cssmodule from './cssmodule';
import QueryParams from './extension/QueryParams';


const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicForm, BasicTable, AdvancedTable, AsynchronousTable,
    Echarts, Buttons, Spins, Notifications,
    Tabs, Banners, Drags, Dashboard, Gallery,
     AuthBasic, RouterEnter, WysiwygBundle,
    Cssmodule, QueryParams,Edit,NaviManage
}