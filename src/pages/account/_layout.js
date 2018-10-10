import Banlance from './Banlance'
import Analysis from './Analysis'

const Account = (props) => {
  if (props.location.pathname === '/account/analysis') {
    return <Analysis />
  }
  return (
    <Banlance />
  )
}

export default Account
