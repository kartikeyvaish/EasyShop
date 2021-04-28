import { useEffect, useState } from "react";

import Container from "../components/Container";
import Text from "../components/Text";
import OrderDetailsCard from "../components/OrderDetailsCard";
import OrderProgress from "../components/OrderProgress";
import ShippingAddressCard from "../components/ShippingAddressCard";
import DownloadInvoice from "../components/DownloadInvoice";
import PriceBreakup from "../components/PriceBreakup";
import { toast } from "react-toastify";
import API from "../api/API";
import Configuration from "../config/Configuration";

const BaseURL = Configuration.BaseURL;

function OrderDetails({ history }) {
  const [File, SetFile] = useState("");
  const [Loading, SetLoading] = useState(false);
  const [LoadingText, SetLoadingText] = useState(false);

  useEffect(() => {
    document.title = "EasyShop | Order Details";
  }, []);

  const DownloadInvoiceButton = async () => {
    SetLoading(true);
    SetLoadingText("Downloading Invoice");
    try {
      const response = await API.CheckInvoice({
        ProductID: history.location.state.Product._id,
        OrderID: history.location.state.OrderID,
      });
      if (response.ok) {
        SetFile(response.data);
        setTimeout(function () {
          SetLoading(false);
          document.getElementById("DownloadButton").click();
        }, 1000);
      } else {
        SetLoading(false);
        toast.error(response.data);
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Server Error while downloading invoice");
    }
  };

  return (
    <Container
      style={styles.container}
      Loading={Loading}
      LoadingText={LoadingText}
    >
      <div style={styles.OrderID}>
        <Text text={`Order ID : ${history.location.state.OrderID}`} size={15} />
      </div>

      <OrderDetailsCard
        Files={history.location.state.Product.Files}
        Price={history.location.state.Price}
        Quantity={history.location.state.Quantity}
        Seller={history.location.state.Seller.Name}
        Title={history.location.state.Product.Title}
      />

      <OrderProgress
        Date={history.location.state.DateTime}
        OrderID={history.location.state.OrderID}
        Product={history.location.state.Product}
      />

      <ShippingAddressCard Address={history.location.state.DeliveryAddress} />

      {File.length ? (
        <a
          href={BaseURL + File}
          download
          target="_blank"
          style={{ display: "none" }}
          rel="noopener noreferrer"
          id="DownloadButton"
        >
          <i></i>
        </a>
      ) : null}

      <DownloadInvoice
        onClick={() => DownloadInvoiceButton()}
        OrderID={history.location.state.OrderID}
        Product={history.location.state.Product}
      />

      <PriceBreakup
        FinalPrice={history.location.state.Price}
        Quantity={history.location.state.Quantity}
      />
    </Container>
  );
}

export default OrderDetails;

const styles = {
  container: { paddingTop: 0, maxWidth: 900 },
  OrderID: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    borderBottomStyle: "solid",
    marginBottom: 10,
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
};
