import React from 'react';
import { Modal, Button } from 'antd';

class LocalizedModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOK =  () => {
    if(this.props.onConfirm){
      this.props.onConfirm();
    }
    this.hideModal();
  }
  handleCancel = () => {
    this.hideModal();
  }
  hideModal = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          确认修改
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOK}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          {this.props.content}
        </Modal>
      </div>
    );
  }
}

// function confirm() {
//   Modal.confirm({
//     title: 'Confirm',
//     content: 'Bla bla ...',
//     okText: '确认',
//     cancelText: '取消',
//   });
// }

export default LocalizedModal;