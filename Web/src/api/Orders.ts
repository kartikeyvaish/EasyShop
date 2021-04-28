import apiClient from "./Client";

const OrderPrefix = "/api/orders/";

const PlaceOrderEndPoint = OrderPrefix + "PlaceOrder";
const GetOrdersEndPoint = OrderPrefix + "GetOrders";

const PlaceOrder = (DATA: any) => apiClient.post(PlaceOrderEndPoint, DATA);
const GetOrders = (DATA: any) => apiClient.post(GetOrdersEndPoint, DATA);

const EndPoints = {
  PlaceOrder,
  GetOrders,
};

export default EndPoints;
