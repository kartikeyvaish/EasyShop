import Address from "./Address";
import Cart from "./Cart";
import Chats from "./Chats";
import Invoice from "./Invoice";
import Orders from "./Orders";
import Products from "./Products";
import Profile from "./Profile";
import Users from "./Users";
import Wishlist from "./Wishlist";

const API = {
  ...Address,
  ...Cart,
  ...Chats,
  ...Invoice,
  ...Orders,
  ...Products,
  ...Profile,
  ...Users,
  ...Wishlist,
};

export default API;
