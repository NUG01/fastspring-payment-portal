import { Button } from "antd";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const FsButton = ({ title, renderPaymentComponent }) => {
  FsButton.propTypes = {
    title: PropTypes.string.isRequired,
    renderPaymentComponent: PropTypes.func.isRequired,
  };

  const scriptData = useRef(null);

  // useEffect(() => {
  //   if (
  //     !scriptData.current &&
  //     !document.getElementById("fsc-api-embedded-payment")
  //   ) {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
  //     script.type = "text/javascript";
  //     script.id = "fsc-api-embedded-payment";
  //     script.setAttribute(
  //       "data-storefront",
  //       "fsportal.test.onfastspring.com/embedded-fast-pay"
  //     );
  //     script.setAttribute("data-continuous", "true");

  //     script.onload = () => {
  //       scriptData.current = window.fastspring;

  //       window.dispatchEvent(
  //         new CustomEvent("scriptDataLoaded", { detail: scriptData.current })
  //       );
  //     };

  //     document.body.appendChild(script);

  //     return () => {
  //       script.removeEventListener("load", script.onload);
  //       document.body.removeChild(script);
  //     };
  //   }
  // }, []);

  const paymentHandler = () => {
    renderPaymentComponent();
    setTimeout(() => {
      setOpacityToZero();
    }, 1200);
  };

  // const buyProduct = () => {
  //   const newProduct = {
  //     path: path,
  //     quantity: 1,
  //   };

  //   const payload = {
  //     products: [newProduct],
  //   };
  //   console.log(payload);

  //   let mySession = {
  //     reset: true,
  //     products: [
  //       {
  //         path: path,
  //         quantity: 1,
  //       },
  //     ],
  //     paymentContact: {
  //       email: "myname@email.com",
  //       firstName: "John",
  //       lastName: "Doe",
  //     },
  //     language: "en",
  //   };
  //   console.log(mySession);
  //   window.fastspring.builder.push(mySession);
  // };

  return (
    <>
      <Button
        style={{
          border: "1px solid #000",
        }}
        onClick={paymentHandler}>
        <span dangerouslySetInnerHTML={{ __html: title }}></span>
      </Button>
    </>
  );
};

export default FsButton;

const setOpacityToZero = () => {
  const elements = document.querySelectorAll("#fsc-embedded-checkout-skeleton");

  elements.forEach((element) => {
    if (element.style.opacity !== "0") {
      element.style.opacity = "0";
      element.style.transition = "opacity 0.1s";
    }
  });
};
