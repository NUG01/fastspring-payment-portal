import { CreditCardOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { loadEpmlScript } from "../helpers"
import { useAuth } from "../store/AuthContext"

const AccountManagementButton = () => {
  const { managementUrl, lastSubscriptionId } = useAuth()
  // const authenticatedAccountURL = managementUrl
  // const subscriptionId = lastSubscriptionId
  const subscriptionId = "BYZNbg2aT7Wiu9vSO49yBw"
  const authenticatedAccountURL =
    "https://fsportal.test.onfastspring.com/account/ncObbNbXS1Kle8Nd0L7d4Q/DjMaU5cWQcs"

  const loadAndInitEPML = () => {
    if (!document.getElementById("fsc-epml")) {
      const script = loadEpmlScript()

      script.onload = () => {
        if (window.fastspring && window.fastspring.epml) {
          window.fastspring.epml.init(authenticatedAccountURL)
          window.fastspring.epml.paymentManagementComponent(subscriptionId)
        }
      }
    } else if (window.fastspring && window.fastspring.epml) {
      window.fastspring.epml.paymentManagementComponent(subscriptionId)
    }
  }

  return (
    <div>
      <Button
        className="mt-[12px] text-[16px] p-[10px] flex items-center justify-center gap-[5px]"
        type="primary"
        onClick={loadAndInitEPML}
      >
        <span>Manage Payment Methods</span>
        <span>
          <CreditCardOutlined className="text-[16px]" />
        </span>
      </Button>
    </div>
  )
}

export default AccountManagementButton
