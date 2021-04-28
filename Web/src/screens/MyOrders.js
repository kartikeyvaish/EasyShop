import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/API";
import AuthContext from "../auth/context";
import Container from "../components/Container";
import OrdersCard from "../components/OrdersCard";
import Text from "../components/Text";

function MyOrders({ history }) {
  const authContext = useContext(AuthContext);
  const [OrdersArray, SetOrdersArray] = useState([]);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    document.title = "EasyShop | My Orders";
    GetOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const GetOrders = async () => {
    if (authContext?.User) {
      SetLoading(true);
      try {
        const response = await API.GetOrders({ _id: authContext.User._id });
        if (response.ok) {
          SetLoading(false);
          SetOrdersArray(response.data.reverse());
        } else {
          SetLoading(false);
          toast.error("Server Error");
        }
      } catch (error) {
        SetLoading(false);
        toast.error("Server Error");
      }
    } else {
      toast.error("You must be logged in to see your orders");
    }
  };

  return (
    <Container style={{ maxWidth: 1000 }} Loading={Loading}>
      <Text
        text="My Orders"
        size={20}
        marginTop={20}
        marginBottom={20}
        weight="700"
        family="Mulish"
      />

      {OrdersArray.map((item) => (
        <OrdersCard
          Files={item.Product.Files}
          Title={item.Product.Title}
          OrderDate={item.DateTime}
          Price={item.Price}
          key={item._id}
          onClick={() => {
            history.push({
              pathname: "/OrderDetails",
              state: { ...item },
            });
          }}
        />
      ))}
    </Container>
  );
}

export default MyOrders;
