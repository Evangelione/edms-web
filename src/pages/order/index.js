import { Button } from 'antd'
import router from 'umi/router'

const Order = () => {
  function goCompany() {
    router.push('/company')
  }

  return (
    <>
      <div>Order123</div>
      <Button onClick={goCompany}>goCompany</Button>
    </>
  )
}

export default Order
