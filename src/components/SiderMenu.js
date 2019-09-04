import React, { useState } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

//三级导航
const renderSubSubMenu = (item, s) => {


}

//没有下级了，最终的。
const renderMenuItem = (item, s) => ( // item.route 菜单单独跳转的路由
    <Menu.Item
        key={item.key}
    >
        <Link to={(item.route || item.key) + (item.query || '')}>
            {item.icon && <Icon type={item.icon} />}
            {s === 1 ? <span className="nav-text sub-item">{item.title}</span> : <span className="nav-text">{item.title}</span>}
        </Link>
    </Menu.Item>
);

// const [dragItems, setDragItems] = useState(menus);

//如果还有下级
const renderSubMenu = (item, s) => {

    return (
        <Menu.SubMenu
            key={item.key}
            title={
                <span>
                    {item.icon && <Icon type={item.icon} />}
                    {s === 1 ? <span className="sub-item">{item.title}</span> : <span className="nav-text">{item.title}</span>}
                </span>
            }
        >
            {item.subs.map(item => item.subs ? renderSubMenu(item, 1) : renderMenuItem(item, 1))}
        </Menu.SubMenu>
    )
}


export default ({ menus, ...props }) => {
    const [dragItems, setDragItems] = useState(menus);
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const _items = reorder(
            dragItems,
            result.source.index,
            result.destination.index
        );
        setDragItems(_items);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {dragItems.map((item, index) => (
                            <Draggable
                                key={item.key}
                                draggableId={item.key}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                        >
                                            <Menu {...props}>
                                                {console.log(props)}
                                                {
                                                    item.subs ?
                                                        renderSubMenu(item, 0)
                                                        : renderMenuItem(item, 0)
                                                }
                                            </Menu>
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}