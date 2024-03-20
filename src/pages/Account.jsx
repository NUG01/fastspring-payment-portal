import { useState } from "react";
import { useFastSpring } from "../store/FastSpringContext";
import { useAuth } from "../store/AuthContext";
import AccountManagementButton from "../components/AccountManagementButton";
import { fadeSkeletonAway, scriptLoader } from "../helpers";
import { fsEmebeddedComponentUrl } from "../consts";
import { Button } from "antd";
import AccountDetails from "../components/AccountDetails";

export default function Account() {
  const { products, productsFetched } = useFastSpring();
  const { subscription } = useAuth();

  const [scriptRendered, setScriptRendered] = useState(false);
  const [oneClickPayButtonHovered, setOneClickPayButtonHovered] =
    useState(false);

  function renderPaymentScript() {
    if (productsFetched) {
      setScriptRendered(true);
      const attributes = [
        {
          name: "data-access-key",
          value: "SAONYVFHRSM6PUXFW-KZMA",
        },
      ];

      const script = scriptLoader(
        fsEmebeddedComponentUrl,
        oneClickPayButtonHovered ? attributes : null
      );

      script.onload = () => {
        window.fastspring.builder.reset();
        if (!oneClickPayButtonHovered) {
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

        fadeSkeletonAway();
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
              <Button
                style={{
                  border: "1px solid #000",
                  width: "100%",
                }}
                onClick={renderPaymentScript}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: mainProduct?.description
                      ? "Buy: " + mainProduct.description.summary
                      : "Buy Base Plan Now",
                  }}></span>
              </Button>
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
          <AccountManagementButton />
        </div>
        <div className="pt-[80px]">
          <h2
            onMouseEnter={() => {
              setOneClickPayButtonHovered(true);
            }}
            onMouseLeave={() => {
              setOneClickPayButtonHovered(false);
            }}
            className="text-[18px]"
            onClick={() => {
              renderPaymentScript();
            }}>
            Buy more seats
          </h2>
        </div>
        <div className="pt-[40px]">
          <AccountDetails />
        </div>
      </div>
    </div>
  );
}
