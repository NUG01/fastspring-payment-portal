import React, { useState, useEffect, useRef } from "react";
import FsButton from "../components/FsButton";
import { useFastSpring } from "../store/FastSpringContext";
import { useAuth } from "../store/AuthContext";

export default function Account() {
  const { products, openSubscriptionManagement, productsFetched } =
    useFastSpring();
  const { subscription } = useAuth();

  const [renderPaymentComponent, setRenderPaymentComponent] = useState(false);
  const scriptData = useRef(null);

  useEffect(() => {
    if (!scriptData.current) {
      const script = document.createElement("script");
      script.src =
        "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
      script.type = "text/javascript";
      script.id = "fsc-api";
      script.setAttribute(
        "data-storefront",
        "fsportal.test.onfastspring.com/embedded-fast-pay"
      );
      script.setAttribute("data-continuous", "true");

      script.onload = () => {
        scriptData.current = window.fastspring;
        window.dispatchEvent(
          new CustomEvent("scriptDataLoaded", { detail: scriptData.current })
        );
      };

      document.body.appendChild(script);

      return () => {
        script.removeEventListener("load", script.onload);
        document.body.removeChild(script);
      };
    }
  }, []);

  const paymentHandler = (path) => {
    setRenderPaymentComponent(true);
    setTimeout(() => {
      setOpacityToZero();
    }, 1200);
  };

  let mainProduct = "saasco-bronze-10-seats"; // Default value, adjust as needed
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
              {!subscription && (
                <button onClick={() => paymentHandler(mainProduct.path)}>
                  Buy Base Plan Now
                </button>
              )}
            </div>
            {productsFetched && (
              <FsButton
                path={mainProduct.path}
                title={
                  mainProduct.description ? mainProduct.description.summary : ""
                }></FsButton>
            )}
          </div>
          {renderPaymentComponent && (
            <div
              className="col-6"
              id="fsc-embedded-checkout-container"
              style={{
                width: "500px",
                height: "500px",
                position: "relative",
              }}></div>
          )}
        </div>
        <div className="pt-[40px]">
          <h2 className="text-[18px]">Update your payment method</h2>
          <div className="mt-[30px] w-[200px] h-[200px] bg-[red]"></div>
        </div>
        <div className="pt-[80px]">
          <h2 className="text-[18px]" onClick={() => {}}>
            Buy more seats
          </h2>
          <div className="mt-[30px] w-[200px] h-[200px] bg-[red]"></div>
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
// import React, { useState, useEffect } from "react";
// import FsButton from "../components/FsButton";
// import { useFastSpring } from "../store/FastSpringContext";

// export default function Account() {
//   const { products, openSubscriptionManagement, productsFetched } =
//     useFastSpring();
//   const [fastSpringScriptLoaded, setFastSpringScriptLoaded] = useState(false);

//   // Adjustments start here
//   const [showPaymentComponent, setShowPaymentComponent] = useState(false);
//   let mainProduct = "saasco-bronze-10-seats"; // Adjusted for initial value

//   if (productsFetched) {
//     const foundProduct = products.find(
//       (product) => product.path === "saasco-bronze-10-seats"
//     );
//     if (foundProduct) mainProduct = foundProduct; // Ensure you're correctly referencing the product properties
//   }

//   useEffect(() => {
//     // Load FastSpring script conditionally
//     if (showPaymentComponent && !fastSpringScriptLoaded) {
//       const script = document.createElement("script");
//       script.src =
//         "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
//       script.type = "text/javascript";
//       script.id = "fsc-api-second";
//       script.setAttribute(
//         "data-storefront",
//         "fsportal.test.onfastspring.com/embedded-fast-pay"
//       );
//       script.setAttribute("data-continuous", "true");

//       script.onload = () => setFastSpringScriptLoaded(true);

//       document.body.appendChild(script);

//       return () => {
//         document.body.removeChild(script);
//       };
//     }
//   }, [showPaymentComponent, fastSpringScriptLoaded]);

//   const handleBuyNowClick = () => {
//     setShowPaymentComponent(true); // This will load the FastSpring script if it's not already loaded

//     // Wait for the script to load before initializing the checkout
//     const interval = setInterval(() => {
//       if (window.fastspring && window.fastspring.builder) {
//         clearInterval(interval);

//         // Optionally, initialize FastSpring checkout here if necessary
//         // For example, window.fastspring.builder.initSession({ ... });
//       }
//     }, 100);
//   };

//   return (
//     <div className="bg-[#F9F6EE] min-h-[100vh] w-[100vw]">
//       <div className="p-[50px]">
//         <h1 className="text-[22px]">Manage your SaaSCo Subscription</h1>
//         <div className="pt-[40px]">
//           {/* Subscription details and Buy Now button */}
//           <h2 className="text-[18px]">Your Subscription</h2>
//           <div className="pl-[40px] mt-[20px] text-[14px]">
//             <p>Subscription: SaaSCo Bronze (10 Seats)</p>
//             <p>Monthly Charge: $100</p>
//             <button onClick={handleBuyNowClick}>Buy Now</button>
//             {productsFetched && mainProduct && (
//               <FsButton
//                 path={mainProduct.path} // Ensure you're using the correct property
//                 title={
//                   mainProduct.description ? mainProduct.description.summary : ""
//                 }></FsButton>
//             )}
//           </div>
//         </div>
//         <div className="pt-[40px]">
//           <div>
//             <h2 className="text-[18px]">Update your payment method</h2>{" "}
//             <div className="flex items-start justify-start gap-[50px]">
//               {" "}
//               <div className="mt-[30px] w-[200px] h-[200px] bg-[red]"></div>
//               <div
//                 className="col-6"
//                 id="fsc-embedded-checkout-container"
//                 style={{
//                   width: "500px",
//                   height: "500px",
//                   position: "relative",
//                 }}></div>
//             </div>
//           </div>
//           <div className="pt-[80px]">
//             <h2 className="text-[18px]" onClick={() => {}}>
//               Buy more seats
//             </h2>
//             <div className="mt-[30px] w-[200px] h-[200px] bg-[red]"></div>
//           </div>
//         </div>
//         {/* Conditionally render the payment component's container */}
//         {showPaymentComponent && (
//           <div
//             className="col-6"
//             id="fsc-embedded-checkout-container"
//             style={{
//               width: "500px",
//               height: "500px",
//               position: "relative",
//             }}>
//             {/* The payment component or checkout container will be populated by FastSpring's script */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
