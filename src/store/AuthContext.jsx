import React, { createContext, useContext, useState } from "react"
import BasicAxios from "../lib/axios"
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [fastspringAccount, setFastspringAccount] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [managementUrl, setManagementUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async () => {
    try {
      await BasicAxios.get("/user").then(({ data }) => {
        setUser(data.user)
        setManagementUrl(data.management_url)
        setFastspringAccount(data.fastspring_account)
        setSubscription(data.subscription)
      })
    } catch (error) {
      setUser({
        email: "test@fastspring.com",
        name: "Fast",
        surname: "Spring",
        username: "Fast Spring",
        fs_account_id: "Po4-MoBxTCCr9iGvp7bG8w",
      })
      setManagementUrl(
        "https://fsportal.test.onfastspring.com/account/OZ0MEsEpTPeDHLEYWYaLog/THVHMt7LTCM"
      )
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    loading,
    fastspringAccount,
    managementUrl,
    subscription,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
