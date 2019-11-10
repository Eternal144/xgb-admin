import React from 'react';
import {
    Button,
    Form,
    Select,
    Card,
    Table,
} from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

let dragingIndex = -1; //拖拽的index
const { Column } = Table;
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
        if (props.children[0].props.record.parent_id > 0) {
            return true;
        } else {
            return false;
        }
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

const { Option } = Select;
//接收默认数据
class NaviModify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    components = {
        body: {
            row: DragableBodyRow,
        },
    };

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
    };

    //合并这个数组。
    componentDidMount() {
        let data = this.props.data[0];
        let children = data.children;
        delete data.children;
        let container = [data];
        container = container.concat(children);
        this.setState({
            data: container
        })
    }

    handleDelect = () => {

    }

    // handleGetEditFormItem = () => {
    //     const { getFieldDecorator } = this.props.form;
    //     return (
    //         // <Form.Item >
    //         //     {getFieldDecorator('')

    //         //     }
    //         // </Form.Item>
    //     )
    // }
    //给每个column都建一个form，然后各自管理各自的修改
    render() {
        const { data } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <DndProvider backend={HTML5Backend} >
                        <Table
                            dataSource={data}
                            components={this.components}
                            onRow={(record, index) => ({
                                index,
                                moveRow: this.moveRow,
                            })}
                        >
                            <Column title="标题" dataIndex="title" key="title" />
                            <Column title="导航类型" dataIndex="type" key="type" render={(text, record) => {
                                let n = parseInt(record.type);
                                if (n === 0) {
                                    return "链接";
                                } if (n === 1) {
                                    return "文章列表"
                                } else {
                                    return "父节点";
                                }
                            }} />
                            <Column title="内容" dataIndex="content" key="content" render={(text, record) => {
                                if (record.type === 0) {
                                    return record.content
                                } if (record.type === 2) {
                                    return null;
                                } else {
                                    return "下拉框"
                                }

                            }} />
                            <Column title="操作" dataIndex="action" key="action" render={(text, record) => {
                                if (record.parent_id > 0) {
                                    return <Button size="small" type="danger" onClick={this.handleDelect}>删除</Button>
                                }
                            }} />

                        </Table>

                    </DndProvider>
                </Form>
            </Card>
        );
    }

}

export default Form.create({ name: 'modify_navi' })(NaviModify);
