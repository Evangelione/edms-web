import { PureComponent } from 'react'
import { Layout } from 'antd'
import { connect } from 'dva'
import Animated from 'animated/lib/targets/react-dom'
import styles from './index.css'

const {Content} = Layout

class _Content extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      anim: new Animated.Value(0),
    }
  }

  componentWillUnmount() {
    Animated.timing(this.state.anim, {
      toValue: 100,
      duration: 500,
    }).start()
  }

  render() {
    return (
      <Animated.div>
        <Content className={styles.content}>
          {this.props.children}
        </Content>
      </Animated.div>
    )
  }
}


export default connect()(_Content)
