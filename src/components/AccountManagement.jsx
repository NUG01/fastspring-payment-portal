import { Button } from "antd";
import React, { useEffect } from "react";

const AccountManagement = () => {
  const authenticatedAccountURL =
    "https://fsportal.test.onfastspring.com/account/OZ0MEsEpTPeDHLEYWYaLog/4gtwxpy6Qcc"; // Your authenticated account URL
  const subscriptionId = "nvXALr7mSQqpBQcqqqFAcQ"; // Your specific subscription ID

  useEffect(() => {
    const loadAndInitEPML = () => {
      if (!document.getElementById("fsc-epml")) {
        const script = document.createElement("script");
        script.src = "https://epml.onfastspring.com/epml/epml.min.js";
        script.id = "fsc-epml";
        script.dataset.paymentComponentId = "payment-portal-component";
        document.body.appendChild(script);

        script.onload = () => {
          console.log("EPML script loaded.");
          if (window.fastspring && window.fastspring.epml) {
            window.fastspring.epml.init(authenticatedAccountURL);
          }
        };

        script.onerror = () => {
          console.error("Failed to load EPML script.");
        };
      }
    };

    loadAndInitEPML();
  }, []);

  const handleOpenPaymentManagement = () => {
    if (window.fastspring && window.fastspring.epml) {
      window.fastspring.epml.paymentManagementComponent(subscriptionId);
    } else {
      console.error("EPML is not initialized.");
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
