import React from 'react';
import {
    Button,
    Form,
    Select,
    Card,
    Table,
    Input,
    message
} from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { updateNavi, saveSecNavSort } from '../../constants/api/navi';
import { getCateLists } from '../../constants/api/category'
import { fetchApi } from '../../callApi';
import { string } from 'prop-types';

const { Option } = Select;
// 可排序状态
let dragingIndex = -1; //拖拽的index
class BodyRow extends React.Component {
    render() {
        const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
        const style = { ...restProps.style, cursor: 'move' };

        let { className } = restProps;
        if (isOver) {
            if (restProps.index > dragingIndex) {
                className += ' drop-over-downward';
            }
            if (restProps.index < dragingIndex) {
                className += ' drop-over-upward';
            }
        }

        return connectDragSource(
            connectDropTarget(<tr {...restProps} className={className} style={style} />),
        );
    }
}


const rowSource = {
    beginDrag(props) {
        dragingIndex = props.index;
        return {
            index: props.index,
        };
    },
    canDrag(props) {
        // if (parseInt(props.children[0].props.record.parent_id) !== 0) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true
    }
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
        // console.log(monitor);

    },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),

}))(
    DragSource('row', rowSource, connect => ({
        connectDragSource: connect.dragSource(),
    }))(BodyRow),
);


// 可编辑状态
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    getOptions = () => {
        const { cateLists } = this.props;
        // console.log(ctgs)
        // console.log(ctgs && ctgs.length)
        let columns = [];
        if (cateLists && cateLists.length > 0) {
            for (let i = 0; i < cateLists.length; i++) {
                columns.push(
                    <Option value={cateLists[i].id}>{cateLists[i].title}</Option>
                )
            }
        }
        return columns;
    }

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
            // console.log(record, values)
        });
    };

    //内链，栏目
    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        if (editing) {
            if (dataIndex === "title") {
                return (<Form.Item style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                        rules: [
                            {
                                required: true,
                                message: `${title} is required.`,
                            },
                        ],
                        initialValue: record[dataIndex],
                    })(<Input ref={node => (this.input = node)}
                        onPressEnter={this.save} onBlur={this.save}
                        placeholder={'此项必填'}
                    />)}
                </Form.Item>)
            } else if (dataIndex === "type") {
                return (<Form.Item style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                        rules: [
                            {
                                required: true,
                                message: `${title} is required.`,
                            },
                        ],
                        initialValue: record[dataIndex],
                    })(<Select ref={node => (this.input = node)}
                        onPressEnter={this.save} onBlur={this.save}
                    >
                        <Option value={0}>外链</Option>
                        <Option value={1}>栏目</Option>
                    </Select>)}
                </Form.Item>)
            } else if (dataIndex === "link") {
                if (parseInt(record.type) === 0) { //内链
                    return (
                        <Form.Item style={{ margin: 0 }}>
                            {form.getFieldDecorator(dataIndex, {
                                rules: [
                                    {
                                        required: true,
                                        message: `${title} is required.`,
                                    },
                                ],
                                initialValue: record[dataIndex],
                            })(<Input ref={node => (this.input = node)}
                                onPressEnter={this.save} onBlur={this.save}
                            />)}
                        </Form.Item>
                    )

                } else {
                    return (
                        <Form.Item style={{ margin: 0 }}>
                            {form.getFieldDecorator(dataIndex, {
                                rules: [
                                    {
                                        required: true,
                                        message: `${title} is required.`,
                                    },
                                ],
                                initialValue: record[dataIndex],
                            })(<Select ref={node => (this.input = node)}
                                onPressEnter={this.save} onBlur={this.save}
                            >
                                {this.getOptions()}
                            </Select>)}
                        </Form.Item>
                    )

                }
            }
        }
        else {
            return (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
        }
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            cateLists,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

//接收默认数据
class NaviModify extends React.Component {
    constructor(props) {
        super(props);
        this.base_id = 999
        this.state = {
            data: null,
            editWords: "编辑内容",
            sortWords: "子导航排序",
            components: {},
            pageState: 0, //0代表页面展示状态，1代表编辑状态，2代表排序状态
            ctgs: [],
        }
        this.columns = [
            {
                title: '标题',
                dataIndex: 'title',
                with: '30%',
                editable: true,
            },
            {
                title: '导航类型',
                dataIndex: 'type',
                editable: true,
                render: (text, record) => {
                    let n = parseInt(record.type);
                    if (n === 0) {
                        return "外链";
                    } if (n === 1) {
                        return "栏目"
                    } else {
                        return "父节点";
                    }
                }
            },
            {
                title: '内容',
                dataIndex: 'link',
                editable: true,
                render: (text, record) => {
                    return record.link
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record, i) => {
                    return (
                        this.state.pageState === 1 ?
                            <Button size="small" type="danger" onClick={this.handleDelect.bind(this, i)} > 删除</Button >
                            : null
                    )
                }
            }
        ]
    }

    moveRow = (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex];
        this.setState(
            update(this.state, {
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
        //更新link值。
    };

    concatNav = (data) => {
        console.log(data)
        let children = data.children ? data.children : [];
        delete data.children;
        let container = [data];
        container = container.concat(children);
        this.setState({
            data: container
        })
    }
    //合并这个数组。
    componentDidMount() {
        this.concatNav(this.props.data[0])
        const { apiPath, request } = getCateLists()
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(resData => {
                // console.log(resData)
                if (!resData.error_code) {
                    this.setState({
                        ctgs: resData.data
                    })
                }
            })
    }

    //删除子导航
    handleDelect = (index) => {
        const { data } = this.state;
        let newNavs = data.filter((x, i) => {
            return i !== index
        })
        this.setState({
            data: newNavs
        })
    }

    //上传更新数据
    submitUpdate = () => {
        const { data } = this.state;
        let newNav = data[0];
        newNav.children = data.slice(1);
        const { apiPath, request } = updateNavi(data[0].id, newNav);
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(resData => {
                if (!resData.error_code) {
                    message.success("更新成功")
                    this.concatNav(resData.data)
                }
            })
    }

    // 开启可编辑
    handleEdit = () => {
        const { pageState } = this.state;
        if (pageState === 0) { //开启可编辑状态状态
            let sortCpns = {
                body: {
                    row: EditableFormRow,
                    cell: EditableCell,
                },
            };
            this.setState({
                components: sortCpns,
                editWords: "结束编辑",
                pageState: 1
            })
        } else if (pageState === 1) { //结束编辑状态
            this.setState({
                components: {},
                editWords: "编辑内容",
                pageState: 0
            })
            this.submitUpdate()
        } else { //提示先结束排序状态

        }
    }

    // id和link,在这里更新总数据
    saveSort = () => {
        const { data } = this.state;
        for (let i = 1; i < data.length; i++) {
            let id = data[i].link.split('=')[1]
            data[i].link = `/column?columnId=${id}&navf=${data[0].id}&navs=${i}`
        }

        let children = data.slice(1);
        let sort = [];
        children.forEach((x, i) => {
            sort.push({
                id: x.id,
                link: x.link,
            })
        })

        const { apiPath, request } = saveSecNavSort(sort);
        fetchApi(apiPath, request)
            .then(res => res.json())
            .then(resData => {
                if (!resData.error_code) {
                    message.success("排序保存成功")
                    this.setState({
                        data: data
                    })
                }
            })
        console.log(sort)
    }

    // 开启和结束排序
    handleSort = () => {
        const { pageState } = this.state;
        if (pageState === 0) { //开启排序状态
            let sortCpns = {
                body: {
                    row: DragableBodyRow,
                },
            };
            this.setState({
                components: sortCpns,
                sortWords: "结束排序",
                pageState: 2
            })
        } else if (pageState === 2) { //结束排序状态
            this.setState({
                components: {},
                sortWords: "子导航排序",
                pageState: 0
            })
            this.saveSort()
        } else { //提示先结束可编辑状态

        }
    }

    // 添加子导航 
    handleAddSecNav = () => {
        const { data } = this.state;
        const newData = {
            id: this.base_id,
            title: '无',
            type: 1, //默认栏目列表，可下拉选择
            link: '无', //根据length决定 //如果是栏目，也是一个下拉框
            parent_id: data[0].id
        }
        this.setState({
            data: [...data, newData]
        })
        this.base_id++;
    }

    // 更新子导航值
    handleSave = row => {
        // 如果更新的是栏目的link
        const { data } = this.state;
        const newData = [...this.state.data];
        const index = newData.findIndex(item => row.id === item.id);
        if (parseInt(row.type) === 1) {
            let arr = ("" + row.link).split('=');
            let id = arr.length === 2 ? arr[1] : row.link
            row.link = `/column?columnId=${id}&navf=${data[0].id}&navs=${index}`
        }
        newData[index] = row
        this.setState({ data: newData });
    };

    //给每个column都建一个form，然后各自管理各自的修改
    render() {
        const { data, editWords, sortWords, pageState, components, ctgs } = this.state;
        const { getFieldDecorator } = this.props.form;
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                    cateLists: ctgs
                }),
            };
        });
        return (
            <div>
                {pageState === 1 ?
                    <Button type="primary" style={{ float: "left", margin: "15px" }}
                        onClick={this.handleAddSecNav}
                    >添加子导航</Button> : null}
                <div style={{ float: "right", margin: "15px" }}>
                    <Button type="primary" onClick={this.handleEdit}>{editWords}</Button>
                    <Button type="primary" onClick={this.handleSort}>{sortWords}</Button>
                </div>
                <div className="clear"></div>
                <Card>
                    <Form onSubmit={this.handleSubmit}>
                        <DndProvider backend={HTML5Backend} >
                            <Table
                                dataSource={data}
                                components={components}
                                onRow={(record, index) => ({
                                    index,
                                    moveRow: this.moveRow,
                                })}
                                columns={columns}
                                rowKey="id"
                            >
                            </Table>
                        </DndProvider>
                    </Form>
                </Card>
            </div>

        );
    }

}

export default Form.create({ name: 'modify_navi' })(NaviModify);
