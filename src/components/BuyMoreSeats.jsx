import { Button } from "antd";
import React from "react";

export default function BuyMoreSeats() {
  const addEmbeddedSBL = () => {
    window.fastspring.builder.secure({
      contact: {
        email: "myName@email.com",
        firstName: "John",
        lastName: "Doe",
      },
      items: [
        {
          product: "phot-io-main-app",
          quantity: 1,
          pricing: {
            price: {
              USD: 19.0,
            },
          },
        },
      ],
    });
    const scriptId = "fsc-api";

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      document.body.removeChild(document.getElementById(scriptId));
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = scriptId;
    script.setAttribute("data-continuous", "true");
    script.src =
      "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
    script.dataset.storefront =
      "fsportal.test.onfastspring.com/embedded-fast-pay";

    // script.onload = () => {
    //   setOpacityToZero();
    // };

    document.body.appendChild(script);
  };

  // function pushToFastSpring() {
  //   window.fastspring.builder.secure({
  //     contact: {
  //       email: "myName@email.com",
  //       firstName: "John",
  //       lastName: "Doe",
  //     },
  //     items: [
  //       {
  //         product: "phot-io-main-app",
  //         quantity: 1,
  //         pricing: {
  //           price: {
  //             USD: 19.0,
  //           },
  //         },
  //       },
  //     ],
  //   });
  //   window.fastspring.builder.push();
  //   window.fastspring.builder.show();
  // }
  return (
    <Button
      style={{
        border: "1px solid #000",
      }}
      onClick={addEmbeddedSBL}></Button>
  );
}
