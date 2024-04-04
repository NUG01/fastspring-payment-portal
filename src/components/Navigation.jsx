// import { Layout, Menu, Typography } from "antd"
// import { useLocation } from "react-router-dom"
// import PropTypes from "prop-types"
// import { Link } from "react-router-dom"

// const { Header } = Layout
// const { Title } = Typography

// const Navigation = ({ user }) => {
//   Navigation.propTypes = {
//     user: PropTypes.shape({
//       username: PropTypes.string,
//     }),
//   }

//   const location = useLocation()
//   return (
//     <nav>
//       <Layout className="layout">
//         <Header
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ flex: 1 }}>
//             <Title level={3} style={{ color: "white", margin: 0 }}>
//               SaaSCo Customer Portal
//             </Title>
//           </div>
//           <Menu
//             theme="dark"
//             mode="horizontal"
//             defaultSelectedKeys={[location.pathname]}
//             style={{ lineHeight: "64px", flex: 1, justifyContent: "end" }}
//           >
//             <Menu.Item key="/dahsboard">
//               <Link to="/dashboard">Dashboard</Link>
//             </Menu.Item>
//             <Menu.Item key="/">
//               <Link to="/">Account</Link>
//             </Menu.Item>
//             <Menu.Item key="/support">Support</Menu.Item>
//           </Menu>
//           <div style={{ color: "white", flex: 1, textAlign: "end" }}>
//             User: {user ? user.username : "Not logged in"}
//           </div>
//         </Header>
//       </Layout>
//     </nav>
//   )
// }

// export default Navigation

import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import logo from "../assets/logo.png"
import PropTypes from "prop-types"

const navigation = [
  { name: "Dashboard", href: "#", current: false },
  { name: "Account", href: "/", current: true },
  { name: "Support", href: "#", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Navigation({ user }) {
  Navigation.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-[100px]">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="w-[50px] h-[50px] rounded-[5px]"
                    src={logo}
                    alt="logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="text-[#fff]">
                  User: {user ? user.username : "Not logged in"}
                </div>

                <Menu as="div" className="relative ml-3">
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
