import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import AuthContext from "./auth/context";
import AllCategories from "./screens/AllCategories";
import DrawerContent from "./navigation/DrawerContent";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MyProducts from "./screens/MyProducts";
import RegisterScreen from "./screens/RegisterScreen";
import NotFound from "./screens/NotFound";
import AddProduct from "./screens/AddProduct";
import Settings from "./screens/Settings";
import ThemeContext from "./themes/context";
import Theme from "./themes/Theme";
import ThemedDiv from "./components/ThemedDiv";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfile from "./screens/EditProfile";
import Addresses from "./screens/Addresses";
import AddAddress from "./screens/AddAddress";
import ProductDetails from "./screens/ProductDetails";
import OrderingScreen from "./screens/OrderingScreen";
import MyOrders from "./screens/MyOrders";
import OrderDetails from "./screens/OrderDetails";
import ChatScreen from "./screens/ChatScreen";
import ChatRoom from "./screens/ChatRoom";
import SearchScreen from "./screens/SearchScreen";
import EditProduct from "./screens/EditProduct";
import Wishlist from "./screens/Wishlist";
import LoadingScreen from "./components/LoadingScreen";
import API from "./api/API";
import CartScreen from "./screens/CartScreen";
import Developers from "./screens/Developers";
import EditAddress from "./screens/EditAddress";

function App() {
  const [User, SetUser] = useState(null);
  const [IsReady, SetIsReady] = useState(false);
  const [CartCount, SetCartCount] = useState(0);
  const [Mode, SetMode] = useState("light");
  const theme = { ...Theme[Mode] };

  useEffect(() => {
    RestoreToken();
  }, []);

  const RestoreToken = async () => {
    const result = localStorage.getItem("AuthToken");
    const modeToken = localStorage.getItem("ModeToken");
    if (modeToken) SetMode(modeToken);
    if (result) {
      const user = jwtDecode(result);
      SetUser(user);
      const response = await API.GetCartLength({
        _id: user._id,
      });
      if (response.ok) SetCartCount(response.data.Length);
    }
    SetIsReady(true);
  };

  if (!IsReady) {
    return (
      <LoadingScreen
        Loading={true}
        LoadingText="Taking you to EasyShop"
      ></LoadingScreen>
    );
  }

  return (
    <AuthContext.Provider
      value={{ User, SetUser, Mode, SetMode, CartCount, SetCartCount }}
    >
      <ThemeContext.Provider value={{ theme }}>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          rtl={false}
          draggable={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          style={{ zIndex: 10 }}
        />

        <DrawerContent />

        <ThemedDiv className="content">
          <Switch>
            <Route path="/AllCategories" exact component={AllCategories} />
            <Route path="/Settings" exact component={Settings} />
            <Route path="/MyProducts" exact component={MyProducts} />
            <Route path="/ProductDetails" exact component={ProductDetails} />
            <Route path="/AddAddress" exact component={AddAddress} />
            <Route path="/EditAddress" exact component={EditAddress} />
            <Route path="/Wishlist" exact component={Wishlist} />
            <Route path="/Profile" exact component={ProfileScreen} />
            <Route path="/EditProfile" exact component={EditProfile} />
            <Route path="/Orders" exact component={MyOrders} />
            <Route path="/AddProduct" exact component={AddProduct} />
            <Route path="/Login" exact component={LoginScreen} />
            <Route path="/Chats" exact component={ChatScreen} />
            <Route path="/Search" exact component={SearchScreen} />
            <Route path="/Cart" exact component={CartScreen} />
            <Route path="/EditProduct" exact component={EditProduct} />
            <Route path="/Developers" exact component={Developers} />
            <Route path="/ChatRoom" exact component={ChatRoom} />
            <Route path="/Register" exact component={RegisterScreen} />
            <Route path="/Addresses" exact component={Addresses} />
            <Route path="/place-order" exact component={OrderingScreen} />
            <Route path="/Login" exact component={LoginScreen} />
            <Route path="/Register" exact component={RegisterScreen} />
            <Route path="/OrderDetails" exact component={OrderDetails} />
            <Route path="/not-found-404" exact component={NotFound} />
            <Route path="/" exact component={HomeScreen} />
            <Redirect from="/Home" to="/" />
            <Redirect to="/not-found-404" />
          </Switch>
        </ThemedDiv>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default withRouter(App);
