import { useState, useRef } from "react";
import FsButton from "../components/FsButton";
import { useFastSpring } from "../store/FastSpringContext";
import { useAuth } from "../store/AuthContext";
import AccountManagement from "../components/AccountManagement";

export default function Account() {
  const { products, productsFetched } = useFastSpring();
  const { subscription } = useAuth();

  const scriptData = useRef(null);
  const [scriptRendered, setScriptRendered] = useState(false);
  const [oneClick, setOneClick] = useState(false);

  function renderPaymentScript() {
    const scriptId = "fsc-api";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) document.body.removeChild(existingScript);
    if (!scriptData.current && productsFetched) {
      setScriptRendered(true);
      console.log("products23", document.getElementById(scriptId));
      document.getElementById(scriptId)?.remove();
      const script = document.createElement("script");
      script.src =
        "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
      script.type = "text/javascript";
      script.id = scriptId;
      script.setAttribute(
        "data-storefront",
        "fsportal.test.onfastspring.com/embedded-portal-payment"
      );
      script.setAttribute("data-access-key", "SAONYVFHRSM6PUXFW-KZMA");

      script.onload = () => {
        if (!oneClick) {
          window.fastspring.builder.add("saasco-bronze-10-seats", 1);
        } else {
          window.fastspring.builder.secure({
            account: "Po4-MoBxTCCr9iGvp7bG8w",
            items: [
              {
                product: "additional-10-bronze-seats",
                quantity: 1,
              },
            ],
          });
        }
      };

      document.body.appendChild(script);
    }
  }

  let mainProduct = "saasco-bronze-10-seats";
  if (productsFetched) {
    const foundProduct = products.find(
      (product) => product.path === "saasco-bronze-10-seats"
    );
    if (foundProduct) mainProduct = foundProduct;
  }

  return (
    <div className="bg-[#F9F6EE] min-h-[100vh] w-[100vw]">
      <div className="p-[50px]">
        <h1 className="text-[22px]">Manage your SaaSCo Subscription</h1>
        <div className="pt-[40px] flex gap-[50px]">
          <div className="text-[14px]">
            <h2 className="text-[18px]">Your Subscription</h2>
            <div className="pl-[40px] mt-[20px] ">
              <p>Subscription: {subscription?.display}</p>
              <p>Monthly Charge: ${subscription?.priceInPayoutCurrency}</p>
            </div>

            {(productsFetched || true) && (
              <FsButton
                renderPaymentComponent={renderPaymentScript}
                path={mainProduct?.path}
                title={
                  mainProduct?.description
                    ? "Buy: " + mainProduct.description.summary
                    : "Buy Base Plan Now"
                }></FsButton>
            )}
          </div>

          <div
            style={{
              position: "absolute",
              top: 100,
              right: 50,
              backgroundColor: scriptRendered ? "#F2EFE5" : undefined,
              borderRadius: "4px",
            }}>
            <div
              className="col-6"
              id="fsc-embedded-checkout-container"
              style={{
                width: "500px",
                height: "500px",
              }}></div>
          </div>
        </div>
        <div className="pt-[40px]">
          <AccountManagement />
        </div>
        <div className="pt-[80px]">
          <h2
            onMouseEnter={() => {
              setOneClick(true);
            }}
            onMouseLeave={() => {
              setOneClick(false);
            }}
            className="text-[18px]"
            onClick={() => {
              renderPaymentScript();
            }}>
            Buy more seats
          </h2>
        </div>
      </div>
    </div>
  );
}

const setOpacityToZero = () => {
  const elements = document.querySelectorAll("#fsc-embedded-checkout-skeleton");

  elements.forEach((element) => {
    if (element.style.opacity !== "0") {
      element.style.opacity = "0";
      element.style.transition = "opacity 0.1s";
    }
  });
};
