import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { scriptLoader } from "../helpers"
import { fsPortalUrl } from "../consts"
const FastSpringContext = createContext()

export const useFastSpring = () => {
  return useContext(FastSpringContext)
}

export const FastSpringProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [productsFetched, setProductsFetched] = useState(false)
  const [data, setData] = useState({})
  const location = useLocation()

  useEffect(() => {
    const fastSpringCallBack = (data) => {
      setData(data)
      if (data && data.groups) {
        const newProducts = []
        data.groups.forEach((group) => {
          if (group.items && Array.isArray(group.items)) {
            group.items.forEach((item) => {
              newProducts.push(item)
            })
          }
        })
        console.log(newProducts)
        setProducts(newProducts)
        setProductsFetched(true)
      }
    }

    const addSBL = () => {
      const script = scriptLoader("fsportal.test.onfastspring.com")

      window.fastSpringCallBack = fastSpringCallBack
      script.setAttribute("data-data-callback", "fastSpringCallBack")

      document.body.appendChild(script)
    }

    if (location.pathname === "/") addSBL()
  }, [location])

  return (
    <FastSpringContext.Provider value={{ products, data, productsFetched }}>
      {children}
    </FastSpringContext.Provider>
  )
}
