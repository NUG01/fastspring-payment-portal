import { Button, Checkbox, Form, Input } from "antd"
import { useState } from "react"
import { useAuth } from "../store/AuthContext"
import BasicAxios from "../lib/axios"

export default function AccountDetails() {
  const [componentDisabled, setComponentDisabled] = useState(true)
  const [form] = Form.useForm()
  const { fastspringAccount, user } = useAuth()
  const { first, last, email, company, phone } = fastspringAccount.contact

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
    <div className="w-[100%] flex items-start justify-start flex-col">
      <div className="text-[24px]">Account Details</div>
      <div className="border-2 border-[#777] border-solid rounded-[5px] p-[20px] w-[100%]">
        <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Inputs Disabled
        </Checkbox>
        <Form
          form={form}
          onFinish={updateFastSpringAccount}
          initialValues={{
            first: first,
            last: last,
            email: email,
            company: company,
            phone: phone,
          }}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          disabled={componentDisabled}
          style={{
            maxWidth: 600,
          }}
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
