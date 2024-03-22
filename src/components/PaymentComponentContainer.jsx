import PropTypes from "prop-types"
export default function PaymentComponentContainer({ scriptRendered }) {
  PaymentComponentContainer.propTypes = {
    scriptRendered: PropTypes.bool.isRequired,
  }
  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        right: 50,
        backgroundColor: scriptRendered ? "#F2EFE5" : undefined,
        borderRadius: "4px",
      }}
    >
      <div
        className="col-6"
        id="fsc-embedded-checkout-container"
        style={{
          width: "500px",
          height: "500px",
        }}
      ></div>
    </div>
  )
}
