import { Card, Form, Input, Button, Icon } from 'antd'
import { connect } from 'dva'
import { LOGO } from '../../common/constants'
import styles from './index.css'

const FormItem = Form.Item

const Login = ({dispatch, form, loading}) => {

  function handleSubmit(e) {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'global/login',
          payload: {
            form: values,
          },
        })
      }
    })
  }

  return (
    <div className={styles['login-pic']} id='special'>
      <Card className={styles['login-card']} style={{margin: '150px auto 0'}}>
        <div className={styles['login-title']}>{LOGO[window.location.hostname.match(/[A-Za-z]+/g)[0]].name}平台登录界面</div>
        <Form onSubmit={handleSubmit} className={styles['login-form']}>
          <FormItem>
            {form.getFieldDecorator('account', {
              rules: [{
                required: true,
                message: <div><Icon type="exclamation-circle" /> 账号不能为空</div>,
              }],
              validateTrigger: 'onBlur',
            })(
              <Input prefix={<Icon type="user" style={{color: '#898F97', fontSize: 23, marginLeft: 6}} />}
                     placeholder="Username"
                     className={styles['login-form-input']} />,
            )}
          </FormItem>
          <FormItem>
            {form.getFieldDecorator('pwd', {
              rules: [{
                required: true,
                message: <div><Icon type="exclamation-circle" /> 密码错误，请重新输入</div>,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{color: '#898F97', fontSize: 23, marginLeft: 6}} />}
                     type="password"
                     placeholder="Password" className={styles['login-form-input']} />,
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" className={styles['login-form-button']} loading={loading}>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.global,
  }
}

export default connect(mapStateToProps)(Form.create()(Login))
