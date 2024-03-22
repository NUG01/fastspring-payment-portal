import { Button } from "antd"
import React, { useEffect } from "react"
import { loadEpmlScript } from "../helpers"

const AccountManagementButton = () => {
  const authenticatedAccountURL =
    "https://fsportal.test.onfastspring.com/account/OZ0MEsEpTPeDHLEYWYaLog/iaX5H9v-TYY" // Your authenticated account URL
  const subscriptionId = "nvXALr7mSQqpBQcqqqFAcQ" // Your specific subscription ID

  const loadAndInitEPML = () => {
    if (!document.getElementById("fsc-epml")) {
      const script = loadEpmlScript()

      script.onload = () => {
        if (window.fastspring && window.fastspring.epml) {
          window.fastspring.epml.init(authenticatedAccountURL)
          window.fastspring.epml.paymentManagementComponent(subscriptionId)
        }
      }
    } else {
      if (window.fastspring && window.fastspring.epml) {
        window.fastspring.epml.paymentManagementComponent(subscriptionId)
      }
    }
  }
  // useEffect(() => {
  //   const loadAndInitEPML = () => {
  //     if (!document.getElementById("fsc-epml")) {
  //       const script = loadEpmlScript();

  //       script.onload = () => {
  //         if (window.fastspring && window.fastspring.epml) {
  //           window.fastspring.epml.init(authenticatedAccountURL);
  //         }
  //       };
  //     }
  //   };

  //   loadAndInitEPML();
  // }, []);

  // const handleOpenPaymentManagement = () => {
  //   loadAndInitEPML();
  // if (window.fastspring && window.fastspring.epml) {
  //   window.fastspring.epml.paymentManagementComponent(subscriptionId);
  // }
  // };

  return (
    <div>
      <Button
        style={{
          border: "1px solid #000",
        }}
        onClick={loadAndInitEPML}
      >
        Manage Payment Methods
      </Button>
    </div>
  )
}

export default AccountManagementButton
