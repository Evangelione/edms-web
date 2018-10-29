import { PureComponent } from 'react'
import { Row, Col, Modal, Form, Input } from 'antd'

@Form.create()
class MakeOrder extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      visible: false,
    }
  }

  showModal = (e) => {
    e.stopPropagation()
    this.setState({
      visible: true,
    })
  }

  hideModal = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
    })
  }

  render() {
    const {children} = this.props
    const {title, visible} = this.state
    return (
      <div onClick={this.showModal}>
        {children}
        <Modal className='orderModal'
               title={title}
               visible={visible}
               footer={null}
               maskClosable={false}
               width={1100}
               onCancel={this.hideModal}>
          <Form layout='inline' style={{padding: '0 25px'}}>

          </Form>
        </Modal>
      </div>
    )
  }
}

export default MakeOrder
