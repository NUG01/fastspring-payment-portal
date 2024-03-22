import { Button } from "antd"
import React, { useEffect } from "react"
import { loadEpmlScript } from "../helpers"
import { CreditCardOutlined } from "@ant-design/icons"
import { useAuth } from "../store/AuthContext"

const AccountManagementButton = () => {
  const { managementUrl, lastSubscriptionId } = useAuth()
  const authenticatedAccountURL = managementUrl

  const loadAndInitEPML = () => {
    if (!document.getElementById("fsc-epml")) {
      const script = loadEpmlScript()

      script.onload = () => {
        if (window.fastspring && window.fastspring.epml) {
          window.fastspring.epml.init(authenticatedAccountURL)
          window.fastspring.epml.paymentManagementComponent(lastSubscriptionId)
        }
      }
    } else {
      if (window.fastspring && window.fastspring.epml) {
        window.fastspring.epml.paymentManagementComponent(lastSubscriptionId)
      }
    }
  }

  return (
    <div>
      <Button
        className="flex items-center justify-center gap-[5px] border-[1px] border-solid border-[#000]"
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
