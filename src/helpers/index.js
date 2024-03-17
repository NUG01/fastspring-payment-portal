export const scriptLoader = (fastSpringCallBack = null, scriptData) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = scriptId;
  script.setAttribute("data-continuous", "true");
  script.src =
    "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
  script.dataset.storefront = "fsportal.test.onfastspring.com";

  // script.setAttribute(
  //   "data-storefront",
  //   "fsportal.test.onfastspring.com/embedded-fast-pay"
  // );

  window.fastSpringCallBack = fastSpringCallBack;
  script.setAttribute("data-data-callback", "fastSpringCallBack");

  script.onload = () => {
    scriptData.current = window.fastspring;
    window.dispatchEvent(
      new CustomEvent("scriptDataLoaded", { detail: scriptData.current })
    );
  };

  document.body.appendChild(script);
};
