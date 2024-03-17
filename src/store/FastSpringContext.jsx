import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FastSpringContext = createContext();

export const useFastSpring = () => {
  return useContext(FastSpringContext);
};

export const FastSpringProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsFetched, setProductsFetched] = useState(false);
  const [data, setData] = useState({});
  const location = useLocation();

  useEffect(() => {
    const fastSpringCallBack = (data) => {
      console.log("data32", data);
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
        console.log("newProducts", newProducts);
        setProductsFetched(true);
      }
    };

    const addSBL = () => {
      const scriptId = "fsc-api";
      const existingScript = document.getElementById(scriptId);
      // if (existingScript) document.body.removeChild(existingScript);
      if (!existingScript) {
        console.log("location", location);
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.id = scriptId;
        script.setAttribute("data-continuous", "true");
        script.src =
          "https://sbl.onfastspring.com/sbl/1.0.0/fastspring-builder.min.js";
        script.dataset.storefront = "fsportal.test.onfastspring.com";
        console.log("script", script);

        // script.setAttribute(
        //   "data-storefront",
        //   "fsportal.test.onfastspring.com/embedded-fast-pay"
        // );

        window.fastSpringCallBack = fastSpringCallBack;
        script.setAttribute("data-data-callback", "fastSpringCallBack");
        console.log("script", script);

        document.body.appendChild(script);
      }
    };

    addSBL();
  }, [location]);

  return (
    <FastSpringContext.Provider value={{ products, data, productsFetched }}>
      {children}
    </FastSpringContext.Provider>
  );
};
