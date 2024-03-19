export const scriptLoader = (storefront, attributes = null) => {
  const scriptId = "fsc-api";

  document.getElementById(scriptId)?.remove();

  const script = document.createElement("script");
  script.src =
    "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
  script.type = "text/javascript";
  script.id = scriptId;
  script.setAttribute("data-continuous", "true");
  script.dataset.storefront = storefront;

  if (attributes) {
    attributes.forEach((attr) => {
      script.setAttribute(attr.name, attr.value);
    });
  }

  return script;
};

export const loadEpmlScript = () => {
  const script = document.createElement("script");
  script.src = "https://epml.onfastspring.com/epml/epml.min.js";
  script.id = "fsc-epml";
  script.setAttribute("data-payment-component-id", "payment-portal-component");
  document.body.appendChild(script);

  return script;
};
