import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const FastSpringContext = createContext();

export const useFastSpring = () => {
  return useContext(FastSpringContext);
};

export const FastSpringProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsFetched, setProductsFetched] = useState(false);
  const [data, setData] = useState({});
  const { managementUrl } = useAuth();
  const location = useLocation();

  // Function to set opacity to 0 for elements with the same ID
  // const setOpacityToZero = () => {
  //   const elements = document.querySelectorAll(
  //     "#fsc-embedded-checkout-skeleton"
  //   );

  //   elements.forEach((element) => {
  //     if (element.style.opacity !== "0") {
  //       element.style.opacity = "0";
  //       element.style.transition = "opacity 0.1s";
  //     }
  //   });
  // };

  // // Fills up products array when SBL loads
  useEffect(() => {
    const fastSpringCallBack = (data) => {
      setData(data);
      if (data && data.groups) {
        const newProducts = [];
        data.groups.forEach((group) => {
          if (group.items && Array.isArray(group.items)) {
            group.items.forEach((item) => {
              newProducts.push(item);
            });
          }
        });
        setProducts(newProducts);
        setProductsFetched(true);
      }
    };

    const loadAndInitEPML = () => {
      const epmlScriptId = "fsc-epml";
      if (!document.getElementById(epmlScriptId)) {
        const script = document.createElement("script");
        script.src = "https://epml.onfastspring.com/epml/epml.min.js";
        script.id = epmlScriptId;
        script.dataset.paymentComponentId = "payment-portal-component";
        script.onload = () => {
          console.log(script);
          window.fastspring.epml.init(managementUrl);
          // window.fastspring.epml(
          //   "https://fsportal.test.onfastspring.com/account/OZ0MEsEpTPeDHLEYWYaLog/NBV5ndN0RB4"
          // );
          // Initialization logic for EPML goes here, if any specific action is needed
        };
        document.body.appendChild(script);
      }
    };

    const addSBL = () => {
      const scriptId = "fsc-api";
      const existingScript = document.getElementById(scriptId);
      if (!existingScript) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.id = scriptId;
        script.setAttribute("data-continuous", "true");
        script.src =
          "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
        script.dataset.storefront = "fsportal.test.onfastspring.com";

        window.fastSpringCallBack = fastSpringCallBack;
        script.setAttribute("data-data-callback", "fastSpringCallBack");

        document.body.appendChild(script);
      }
    };

    // const addEmbeddedSBL = () => {
    //   const scriptId = "fsc-api-second";
    //   const existingScript = document.getElementById(scriptId);
    //   if (!existingScript) {
    //     const script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.id = scriptId;
    //     script.setAttribute("data-continuous", "true");
    //     script.src =
    //       "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
    //     script.dataset.storefront =
    //       "fsportal.test.onfastspring.com/embedded-fast-pay";
    //     script.setAttribute("data-access-key", " SAONYVFHRSM6PUXFW-KZMA");

    //     document.body.appendChild(script);
    //     console.log(script);
    //   }
    // };

    addSBL();
    // addEmbeddedSBL();
    loadAndInitEPML();
  }, [location]);

  const openSubscriptionManagement = (
    subscriptionId = "-VYIlfk1RUeBFwRp2rY4Uw",
    language = "en"
  ) => {
    // Ensure EPML script is loaded and `fastspring` object is available
    if (window.fastspring && window.fastspring.epml) {
      window.fastspring.epml.paymentManagementComponent(
        subscriptionId,
        language === "en"
      );
    } else {
      console.error("FastSpring EPML is not initialized.");
    }
  };

  return (
    <FastSpringContext.Provider
      value={{ products, data, openSubscriptionManagement, productsFetched }}>
      {children}
    </FastSpringContext.Provider>
  );
};
