import { Row, Col, Form, Select, Input, AutoComplete, DatePicker, Icon, Divider } from 'antd'
import { connect } from 'dva'
import locale from 'antd/lib/date-picker/locale/zh_CN'

const FormItem = Form.Item
const {Option} = Select

const formItemLayout = {
  labelCol: {span: 10},
  wrapperCol: {span: 14},
}

const Step1 = ({customOption, siteOption}) => {
  const {getFieldDecorator} = this.props.form
  const customOptions = customOption.map(option => {
    return <Option key={option.id} value={option.id} mobile={option.customer_mobile}
                   contact={option.customer_contact} balance={option.balance} credit={option.credit}
                   credit_used={option.credit_used}>{option.customer_name}</Option>
  })
  const siteOptions = siteOption.map(option => {
    return <Option key={option.id}
                   sitetype={option.site_type}
                   usertype={option.user_type_name}
                   province={option.delivery_province}
                   city={option.delivery_city}
                   area={option.delivery_area}
                   address={option.detailed_address}
                   shouhuo={option.shouhuo}
                   value={option.id}>{option.site_name}</Option>
  })
  return (
    <Form layout='inline' style={{padding: '0 25px'}}>
      <Row>
        <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>
          客户信息
          <div style={{
            position: 'absolute',
            top: 1,
            left: 115,
            backgroundColor: '#FFE595',
            color: '#545F76',
            fontSize: 15,
            padding: '2px 10px',
            borderRadius: 4,
          }}><Icon type="red-envelope"
                   theme="outlined" />&nbsp;客户余额： {this.state.custombalance} 元&nbsp;&nbsp;&nbsp;&nbsp;<Icon
            type="schedule" theme="outlined" />&nbsp;剩余信用额度： {this.state.creditbalance} 元</div>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="客户名称" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('cust_id', {
              rules: [{required: true, message: '此项为必选项！'}],
            })(
              <Select placeholder="请选择客户名称" style={{width: 185}} onChange={this.customerChange}
                      disabled={this.props.confirm ? true : false}>
                {customOptions}
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="客户联系人" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('cust_id2')(
              <Input placeholder="自动生成，非手填" disabled />,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="联系电话" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('cust_id3')(
              <Input placeholder="自动生成，非手填" disabled />,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="销售价" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('saler_price', {
              rules: [{
                required: true,
                message: '请填写数字！',
                pattern: '^[0-9.]*$',
                max: 10,
              }],
            })(
              <Input placeholder='请填写销售价' addonAfter='元 / 吨' onChange={this.calculation} />,
            )}
          </FormItem>
        </Col>
        <Col span={16}>
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 7}} label="数量" hasFeedback
                    style={{display: 'block', marginLeft: '-5px'}}>
            {getFieldDecorator('saler_num')(
              <Input placeholder="请填写数量" addonAfter='吨' disabled />,
            )}
          </FormItem>
        </Col>
      </Row>
      <Divider dashed={true} />
      <Row>
        <Col style={{color: '#1C86F6', fontSize: 18, marginBottom: 20, fontWeight: 600}}>站点信息</Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="站点简称" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('site_id', {
              rules: [{required: true, message: '此项为必选项！'}],
            })(
              <Select placeholder="请选择站点名称" style={{width: 185}} onChange={this.siteChange}
                      disabled={this.props.confirm ? true : false}>
                {siteOptions}
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="站点类型" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('site_id2')(
              <Select placeholder="自动生成，非手填" style={{width: 185}} disabled>
                <Option value="1">加气站</Option>
                <Option value="2">气化站</Option>
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="用户类型" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('site_id3')(
              <Select placeholder="自动生成，非手填" style={{width: 185}} disabled></Select>,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="收货联系人" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('recv_contact', {
              rules: [
                {required: true, message: '请填写收货联系人', pattern: '^[\\u4e00-\\u9fa5]+$', max: 10},
              ],
            })(
              <AutoComplete
                onSelect={this.autoSelect}
                disabled={this.props.confirm ? true : false}
                dataSource={this.state.dataSource}
                placeholder="请填写收货联系人姓名"
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="联系电话" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('recv_phone', {
              rules: [{
                required: true,
                message: '请填写正确联系电话！',
                max: 11,
                pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7,9]))\\d{8}$',
              }],
              validateTrigger: 'onBlur',
            })(
              <Input placeholder="请填写联系电话" />,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="交货时间" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('recv_time', {
              rules: [{required: true, message: '请选择交货时间！'}],
            })(
              <DatePicker placeholder="请选择交货时间" format={'YYYY-MM-DD HH:00:00'} showTime={{format: 'HH'}}
                          disabled={this.props.confirm ? true : false}
                          locale={locale} />,
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="配送方式" hasFeedback style={{display: 'block', marginBottom: 10}}>
            {getFieldDecorator('deliver_type', {
              rules: [{required: true, message: '此项为必选项！'}],
            })(
              <Select placeholder="请选择配送方式" style={{width: 150}} disabled={this.props.confirm ? true : false}>
                <Option value="1">卖家配送</Option>
                <Option value="2">买家自提</Option>
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={16}>
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 18}} label="收货地址" hasFeedback
                    style={{display: 'block', marginLeft: '-5px'}}>
            {getFieldDecorator('delivery')(
              <Input placeholder="请选择收货地址" disabled />,
            )}
          </FormItem>
        </Col>
      </Row>
      <Divider dashed={true} />
      <div style={{textAlign: 'right'}}>
        <div style={{color: '#A1A9B3', fontSize: 18, marginBottom: 16}}>付款方式：{this.state.payType}</div>
        <div style={{color: '#545F76', fontSize: 20, marginBottom: 8, fontWeight: 600}}>合计金额：
          <span style={{color: '#FF4241', fontSize: 22}}>￥{this.state.total}</span>&nbsp;&nbsp;
          <span style={{fontSize: 18}}>
                    (多含7.5%预付款)
                  </span>
        </div>
        <div style={{
          color: '#A1A9B3',
          fontSize: 18,
          marginBottom: 8,
        }}>余额支付{this.state.yuePay}元，信用支付{this.state.xinyongPay}元
        </div>
      </div>
    </Form>
  )
}

function mapStateToProps(state) {
  const {customOption, siteOption} = state.order
  return {
    customOption,
    siteOption,
    loading: state.loading.models.order,
  }
}

export default connect(mapStateToProps)(Step1)



