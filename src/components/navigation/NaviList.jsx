import React from 'react'
import {
    Table,
    Button,
    Card
} from 'antd';
import { Link } from 'react-router-dom'
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
        if (props.children[0].props.record.parent_id === -1) {
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

// is_parents 0 1
// is_link 0 1

// 0: 链接
// 1: 文章列表
// 2: 父节点

export default class NaviList extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data
    //     }
    // }
    state = {
        data: this.props.data
    };

    components = {
        body: {
            row: DragableBodyRow,
        },
    };
    
    handleModify = () => {

    }

    getPath = (i) => {
        let data = this.state.data[i];
        let arr = [data];
        return {
            pathname: '/app/navigation/modify',
            state: arr
        }
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
    };

    render() {
        const { data } = this.state;
        return (
            <Card>
                <DndProvider backend={HTML5Backend} >
                    {/* {console.log(this.state.data)} */}
                    <Table
                        // columns={columns}
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
                        <Column
                            title="操作"
                            key="action"
                            render={(text, record, i) => {
                                if (record.parent_id < 0) {
                                    return (
                                        <span>
                                            {/* {console.log(i)} */}
                                            <Button size="small" type="primary"><Link to={this.getPath(i)}>修改</Link></Button>
                                            <Button size="small" type="primary">删除</Button>
                                        </span>
                                    )
                                }
                            }
                            }
                        />
                    </Table>
                </DndProvider>
            </Card>
        );
    }
}
