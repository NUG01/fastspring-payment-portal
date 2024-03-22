import { Button, Checkbox, Form, Input } from "antd"
import { useState } from "react"
import { useAuth } from "../store/AuthContext"
import BasicAxios from "../lib/axios"
import AccountManagementButton from "./AccountManagementButton"

export default function AccountDetails() {
  const [componentDisabled, setComponentDisabled] = useState(true)
  const [form] = Form.useForm()
  const { fastspringAccount, user } = useAuth()
  const contact = fastspringAccount?.contact

  const updateFastSpringAccount = (values) => {
    BasicAxios.post("/fastspring/account/update/" + user.fs_account_id, values)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="w-[60%] flex items-start justify-start flex-col">
      <div className="text-[21px] mb-[20px]">Account Details</div>
      {contact ? (
        <div className="border-2 border-[#777] border-solid rounded-[5px] p-[20px] w-[100%]">
          <div className="mb-[20px]">
            <AccountManagementButton />
          </div>
          <Checkbox
            className="mb-[10px]"
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Inputs Disabled
          </Checkbox>
          <Form
            className="border-[1px] border-[#999] max-w-[600px] p-[20px] rounded-[4px]"
            form={form}
            onFinish={updateFastSpringAccount}
            initialValues={{
              first: contact?.first,
              last: contact?.last,
              email: contact?.email,
              company: contact?.company,
              phone: contact?.phone,
            }}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            disabled={componentDisabled}
          >
            {fields().map((field) => {
              return (
                <Form.Item
                  key={field.name}
                  label={field.placeholder}
                  name={field.name}
                  rules={[
                    {
                      required: field.required,
                      message: `Please input your ${field.name}!`,
                    },
                    {
                      type: field.type,
                      message: `Please input a valid ${field.name}!`,
                    },
                  ]}
                >
                  <Input
                    style={{
                      color: componentDisabled ? "#555" : "black",
                    }}
                  />
                </Form.Item>
              )
            })}
            <Button
              disabled={componentDisabled}
              type="default"
              htmlType="submit"
              style={{ marginLeft: "100px" }}
            >
              Submit
            </Button>
          </Form>
        </div>
      ) : (
        <div className="border-2 border-[#777] border-solid rounded-[5px] p-[20px] w-[100%]">
          <p>
            No account details found. You need to have an active subscription to
            view and edit your account details.
          </p>
        </div>
      )}
    </div>
  )
}

const fields = () => {
  return [
    {
      name: "first",
      type: "text",
      required: true,
      placeholder: "First Name",
    },
    {
      name: "last",
      type: "text",
      required: true,
      placeholder: "Last Name",
    },
    {
      name: "email",
      type: "email",
      required: true,
      placeholder: "Email",
    },
    {
      name: "company",
      type: "text",
      required: false,
      placeholder: "Company",
    },
    {
      name: "phone",
      type: "tel",
      required: false,
      placeholder: "Phone",
    },
  ]
}
