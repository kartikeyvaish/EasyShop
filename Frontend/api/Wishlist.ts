import apiClient from "./Client";

const WishlistPrefix = "/api/wishlist/";

const AddWishListEndPoint = WishlistPrefix + "AddToWishList";
const RemoveWishEndPoint = WishlistPrefix + "RemoveFromWishList";
const GetWishListEndPoint = WishlistPrefix + "GetWishlist";

const AddToWishList = (DATA: any) => apiClient.post(AddWishListEndPoint, DATA);
const RemoveWishList = (DATA: any) => apiClient.post(RemoveWishEndPoint, DATA);
const GetWishList = (DATA: any) => apiClient.post(GetWishListEndPoint, DATA);

export default {
  AddToWishList,
  RemoveWishList,
  GetWishList,
};
