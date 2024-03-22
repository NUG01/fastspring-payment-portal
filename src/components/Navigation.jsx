import { Layout, Menu, Typography } from "antd"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const { Header } = Layout
const { Title } = Typography

const Navigation = ({ user }) => {
  Navigation.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }

  const location = useLocation()
  return (
    <nav>
      <Layout className="layout">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <Title level={3} style={{ color: "white", margin: 0 }}>
              SaaSCo Customer Portal
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[location.pathname]}
            style={{ lineHeight: "64px", flex: 1, justifyContent: "end" }}
          >
            <Menu.Item key="/dahsboard">
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/">
              <Link to="/">Account</Link>
            </Menu.Item>
            <Menu.Item key="/support">Support</Menu.Item>
          </Menu>
          <div style={{ color: "white", flex: 1, textAlign: "end" }}>
            User: {user ? user.username : "Not logged in"}
          </div>
        </Header>
      </Layout>
    </nav>
  )
}

export default Navigation
