import { Button } from "antd";
import PropTypes from "prop-types";

const FsButton = ({ path, title }) => {
  FsButton.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  const buyProduct = () => {
    const newProduct = {
      path: path,
      quantity: 1,
    };

    const payload = {
      products: [newProduct],
    };
    console.log(payload);

    var mySession = {
      reset: true,
      products: [
        {
          path: path,
          quantity: 1,
        },
      ],
      paymentContact: {
        email: "myname@email.com",
        firstName: "John",
        lastName: "Doe",
      },
      language: "en",
    };
    console.log(mySession);
    window.fastspring.builder.push(mySession);

    // window.fastspring.builder.add(path);
    // window.fastspring.builder.push(payload);
    // window.fastspring.builder.checkout();
  };

  return (
    <Button onClick={buyProduct}>
      <span dangerouslySetInnerHTML={{ __html: title }}></span>
    </Button>
  );
};

export default FsButton;
