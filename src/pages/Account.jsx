import {
  ArrowDownOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons"
import { Button, message, Popconfirm } from "antd"
import { useState } from "react"
import { fsEmebeddedComponentUrl } from "../consts"
import { fadeSkeletonAway, scriptLoader } from "../helpers"
import { useAuth } from "../store/AuthContext"
import { useFastSpring } from "../store/FastSpringContext"
import AccountDetails from "../components/AccountDetails"
import PaymentComponentContainer from "../components/PaymentComponentContainer"
import BasicAxios from "../lib/axios"

export default function Account() {
  const { products, productsFetched } = useFastSpring()
  const { mainSubscription, secondarySubscription, fastspringAccount } =
    useAuth()

  const mainProduct = products.find((product) => product.priceTotalValue > 50)
  const secondaryProduct = products.find(
    (product) => product.priceTotalValue < 50
  )

  const [scriptRendered, setScriptRendered] = useState(false)
  const [oneClickPayButtonHovered, setOneClickPayButtonHovered] =
    useState(false)

  const [isMainSubPaused, setIsMainSubPaused] = useState(
    mainSubscription.isPauseScheduled
  )
  const [isSecondarySubPaused, setIsSecondarySubPaused] = useState(
    secondarySubscription.isPauseScheduled
  )

  function renderPaymentScript() {
    if (productsFetched) {
      setScriptRendered(true)
      const attributes = [
        {
          name: "data-access-key",
          value: import.meta.env.VITE_FS_ACCESS_KEY,
        },
      ]

      const script = scriptLoader(
        fsEmebeddedComponentUrl,
        oneClickPayButtonHovered ? attributes : null
      )

      script.onload = () => {
        window.fastspring.builder.reset()
        if (!oneClickPayButtonHovered) {
          window.fastspring.builder.add(mainProduct.path, 1)
        } else {
          window.fastspring.builder.secure({
            account: fastspringAccount.id,
            items: [
              {
                product: secondaryProduct.path,
                quantity: 1,
              },
            ],
          })
        }

        fadeSkeletonAway()
      }

      document.body.appendChild(script)
    }
  }

  const pauseSubscription = (subscriptionId) => {
    BasicAxios.post("/fastspring/subscription/pause/" + subscriptionId)
      .then(() => {
        if (subscriptionId === mainSubscription.id) setIsMainSubPaused(true)
        else setIsSecondarySubPaused(true)
      })
      .catch(() => {})
  }

  const resumeSubscription = (subscriptionId) => {
    BasicAxios.post("/fastspring/subscription/resume/" + subscriptionId)
      .then(() => {
        if (subscriptionId === mainSubscription.id) setIsMainSubPaused(false)
        else setIsSecondarySubPaused(false)
      })
      .catch(() => {})
  }

  return (
    <div className="bg-[#F9F6EE] min-h-[100vh] w-[100vw]">
      <div className="p-[50px]">
        <h1 className="text-[22px]">Manage your SaaSCo Subscription</h1>
        <div className="pt-[40px] flex gap-[50px]">
          <div className="text-[14px] p-[20px]">
            <h2 className="text-[21px]">Your Subscriptions</h2>
            {mainSubscription && (
              <div className="mt-[20px] border-[1px] border-[#999] p-[20px] rounded-[4px] relative">
                <p>Subscription: {mainSubscription?.display}</p>
                <p>
                  Monthly Charge: ${mainSubscription?.priceInPayoutCurrency}
                </p>
                {subscriptionStatus(isMainSubPaused)}
                <div className="absolute top-[20px] right-[-40px]">
                  <Popconfirm
                    title={popconfirmTitle(
                      isMainSubPaused,
                      mainSubscription.display
                    )}
                    description={popconfirmDescription(isMainSubPaused)}
                    onConfirm={() => {
                      if (!isMainSubPaused) {
                        pauseSubscription(mainSubscription.id)
                      } else {
                        resumeSubscription(mainSubscription.id)
                      }
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    {pauseOrResumeIcon(isMainSubPaused)}
                  </Popconfirm>
                </div>
              </div>
            )}
            {secondarySubscription && (
              <div className="mt-[20px] border-[1px] border-[#999] p-[20px] rounded-[4px] relative">
                <p>Subscription: {secondarySubscription?.display}</p>
                <p>
                  Monthly Charge: $
                  {secondarySubscription?.priceInPayoutCurrency}
                </p>
                {subscriptionStatus(isSecondarySubPaused)}
                <div className="absolute top-[20px] right-[-40px]">
                  <Popconfirm
                    title={popconfirmTitle(
                      isSecondarySubPaused,
                      secondarySubscription.display
                    )}
                    description={popconfirmDescription(isSecondarySubPaused)}
                    onConfirm={() => {
                      if (!isSecondarySubPaused) {
                        pauseSubscription(secondarySubscription.id)
                      } else {
                        resumeSubscription(secondarySubscription.id)
                      }
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    {pauseOrResumeIcon(secondarySubscription)}
                  </Popconfirm>
                </div>
              </div>
            )}
            {!mainSubscription && (
              <div className="mt-[20px] border-[1px] border-[#999] p-[20px] rounded-[4px]">
                <p>Not subscribed currently!</p>
                <p>
                  Click button below to subscribe <ArrowDownOutlined />
                </p>
                <Button
                  className="border-[1px] border-solid border-[#000] w-[100%] mt-[10px]"
                  onClick={renderPaymentScript}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: mainProduct?.description.summary,
                    }}
                  ></p>
                </Button>
              </div>
            )}
            {!secondarySubscription && mainSubscription && (
              <div className="mt-[20px] border-[1px] border-[#999] p-[20px] rounded-[4px]">
                <p>Do you want to add 10 more seats?</p>
                <p>
                  Click button below to subscribe <ArrowDownOutlined />
                </p>
                <Button
                  className="border-[1px] border-solid border-[#000] w-[100%] mt-[10px]"
                  onMouseEnter={() => {
                    setOneClickPayButtonHovered(true)
                  }}
                  onMouseLeave={() => {
                    setOneClickPayButtonHovered(false)
                  }}
                  onClick={renderPaymentScript}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: secondaryProduct?.description.summary,
                    }}
                  ></p>
                </Button>
              </div>
            )}
          </div>

          <PaymentComponentContainer scriptRendered={scriptRendered} />
        </div>

        <div className="pt-[40px]">
          <AccountDetails />
        </div>
      </div>
    </div>
  )
}

const popconfirmTitle = (isPaused, text) =>
  `${isPaused ? "Continue" : "Pause"} ${text} Subscription?`

const popconfirmDescription = (isPaused) =>
  `Are you sure you want to ${isPaused ? "Continue" : "Pause"} your subscription?`

const pauseOrResumeIcon = (isPaused) =>
  isPaused ? (
    <PlayCircleOutlined className="text-[27px] cursor-pointer" />
  ) : (
    <PauseCircleOutlined className="text-[27px] cursor-pointer" />
  )

const subscriptionStatus = (isPaused) => {
  return (
    <p
      className={`text-[18px] ${isPaused ? "text-[var(--color-error)]" : "text-[var(--color-success)]"}`}
    >
      {isPaused ? "(Paused)" : "(Active)"}
    </p>
  )
}
