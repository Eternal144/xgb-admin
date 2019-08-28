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
          {this.props.data.content}
        </Button>
        <Modal style={{marginTop:"150px"}}
          visible={this.state.visible}
          onOk={this.handleOK}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          {this.props.data.details}
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