import { Button } from "antd";
import React, { useEffect } from "react";
import { loadEpmlScript } from "../helpers";

const AccountManagement = () => {
  const authenticatedAccountURL =
    "https://fsportal.test.onfastspring.com/account/OZ0MEsEpTPeDHLEYWYaLog/4gtwxpy6Qcc"; // Your authenticated account URL
  const subscriptionId = "nvXALr7mSQqpBQcqqqFAcQ"; // Your specific subscription ID

  useEffect(() => {
    const loadAndInitEPML = () => {
      if (!document.getElementById("fsc-epml")) {
        const script = loadEpmlScript();

        script.onload = () => {
          if (window.fastspring && window.fastspring.epml) {
            window.fastspring.epml.init(authenticatedAccountURL);
          }
        };
      }
    };

    loadAndInitEPML();
  }, []);

  const handleOpenPaymentManagement = () => {
    if (window.fastspring && window.fastspring.epml) {
      window.fastspring.epml.paymentManagementComponent(subscriptionId);
    }
  };

  return (
    <div>
      <Button
        style={{
          border: "1px solid #000",
        }}
        onClick={handleOpenPaymentManagement}>
        Manage Payment Methods
      </Button>
    </div>
  );
};

export default AccountManagement;
