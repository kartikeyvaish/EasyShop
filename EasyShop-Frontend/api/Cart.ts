import apiClient from "./Client";

const CartPrefix = "/api/cart/";

const AddToCartEndPoint = CartPrefix + "AddToCart";
const RemoveCartEndPoint = CartPrefix + "RemoveFromCart";
const GetCartEndPoint = CartPrefix + "GetCart";
const GetCartLenEndPoint = CartPrefix + "GetCartLength";

const AddToCart = (DATA: any) => apiClient.post(AddToCartEndPoint, DATA);
const RemoveFromCart = (DATA: any) => apiClient.post(RemoveCartEndPoint, DATA);
const GetCart = (DATA: any) => apiClient.post(GetCartEndPoint, DATA);
const GetCartLength = (DATA: any) => apiClient.post(GetCartLenEndPoint, DATA);

export default {
  AddToCart,
  RemoveFromCart,
  GetCart,
  GetCartLength,
};
