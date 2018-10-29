import { Row, Col, Form, Select, Input, InputNumber, Icon, Divider } from 'antd'
import { connect } from 'dva'
import styles from '../../index.css'

const FormItem = Form.Item
const {Option} = Select

const formItemLayout = {
  labelCol: {span: 10},
  wrapperCol: {span: 14},
}

const Step1 = ({supplierOption, goodsOption}) => {
  const {getFieldDecorator} = this.props.form
  const supplierOptions = supplierOption.map(option => {
    return <Option key={option.id} contact={option.supp_contact} mobile={option.supp_mobile} balance={option.balance}
                   value={option.id}>{option.supp_name}</Option>
  })
  const goodsOptions = goodsOption.map(option => {
    return <Option key={option.id} source={option.origin_gas_source}
                   contact={option.cargo_contact}
                   mobile={option.cargo_mobile}
                   province={option.cargo_province}
                   city={option.cargo_city}
                   area={option.cargo_area}
                   address={option.detailed_address}
                   report={option.temperament_report}
                   value={option.id}>{option.name_gas_source}</Option>
  })
  return (
    <Form layout='inline' style={{padding: '0 25px'}}>
      <Row>
        <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>
          供应商信息
          <div className={styles.yellowTip}>
            <Icon type="red-envelope" theme="outlined" />&nbsp;采购预付款余额： {this.state.suppbalance} 元
          </div>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="供应商名称" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('supp_id', {
              rules: [{
                required: true,
                message: '此项为必选项！',
              }],
            })(
              <Select placeholder="请选择供应商名称" style={{width: 185}} onChange={this.suppChange}>
                {supplierOptions}
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="供应商联系人" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('supp_id2')(
              <Input placeholder="自动生成，非手填" disabled />,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="联系电话" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('supp_id3')(
              <Input placeholder="自动生成，非手填" disabled />,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="采购价" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('purchase_price', {
              rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
            })(
              <Input placeholder='请填写采购价' addonAfter='元 / 吨' onChange={this.calculation} />,
            )}
          </FormItem>
        </Col>
        <Col span={16}>
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 7}} label="数量" hasFeedback
                    style={{display: 'block', marginLeft: '-5px'}}>
            {getFieldDecorator('shuliang', {
              rules: [{required: true, message: '请填写数字！'}],
            })(
              <InputNumber placeholder="请填写数量" addonAfter='吨' onChange={this.calculation}
                           disabled={this.props.confirm ? true : false} max={20} min={0} step={0.001}
                           precision={3} style={{width: 150}} />,
            )}
            <div style={{
              position: 'absolute',
              border: '1px solid #d9d9d9',
              backgroundColor: '#fafafa',
              top: '-6px',
              right: 0,
              padding: '0 11px',
              height: 32,
              lineHeight: '30px',
              borderRadius: '0 3px 3px 0',
            }}>吨
            </div>
          </FormItem>
        </Col>
      </Row>
      <Divider dashed={true} />
      <Row>
        <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>气源信息</Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="气源名称" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('goods_id', {
              rules: [{required: true, message: '此项为必选项！'}],
            })(
              <Select placeholder="请选择气源名称" style={{width: 185}} onChange={this.goodsChange}>
                {goodsOptions}
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="气源产地" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('goods_source')(
              <Input placeholder="自动生成，非手填" disabled />,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="气质报告" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('qizhibaogao')(
              <div>
                {this.state.report ?
                  <div style={{color: '#3477ED', cursor: 'pointer'}} onClick={this.openPDF}>
                    <Icon type="file-text" /> 查看气质报告
                  </div>
                  :
                  <div>暂无气质报告</div>
                }
              </div>,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="装货联系人" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('goods_contact')(
              <Input placeholder="自动生成，非手填" disabled />,
            )}
          </FormItem>
        </Col>
        <Col span={16}>
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 7}} label="联系电话" hasFeedback
                    style={{display: 'block', marginLeft: '-5px', marginBottom: 10}}>
            {getFieldDecorator('goods_mobile')(
              <Input placeholder="自动生成，非手填" disabled />,
            )}
          </FormItem>
        </Col>
        <Col span={16}>
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 12}} label="装货地址" hasFeedback
                    style={{display: 'block', marginLeft: '-5px', marginBottom: 10}}>
            {getFieldDecorator('goods_delivery')(
              <Input placeholder="自动生成，非手填" disabled />,
            )}
          </FormItem>
        </Col>
      </Row>
      {/*<Divider dashed={true}/>*/}
      <Row style={{display: 'none'}}>
        <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>物流信息</Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="运距" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('distance', {
              initialValue: '0',
              rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
            })(
              <Input placeholder="请填写运距" addonAfter='公里' onChange={this.calculation} />,
            )}
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem {...formItemLayout} label="运费单价" hasFeedback
                    style={{display: 'block', marginLeft: '-55px'}}>
            {getFieldDecorator('deliver_price', {
              initialValue: '0',
              rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$', max: 10}],
            })(
              <Input placeholder="请填写运费单价" addonAfter='元 / 吨 / 公里' onChange={this.calculation} />,
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

function mapStateToProps(state) {
  const {supplierOption, goodsOption} = state.order
  return {
    supplierOption,
    goodsOption,
    loading: state.loading.models.order,
  }
}

export default connect(mapStateToProps)(Step1)
