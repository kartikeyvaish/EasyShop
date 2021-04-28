import { useEffect, useState } from "react";

import API from "../api/API";
import CategoriesCaraousel from "../components/CategoriesCaraousel";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function HomeScreen({ history }) {
  const [Recent, SetRecent] = useState([]);
  const [Search, SetSearch] = useState("");

  useEffect(() => {
    document.title = "EasyShop | Home";
    GetRecentProducts();
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  const GetRecentProducts = async () => {
    try {
      const response = await API.GetRecentProducts();
      SetRecent(response.data);
    } catch (error) {}
  };

  const SearchForQuery = (e) => {
    if (Search.length) {
      history.push({
        pathname: "/Search",
        state: { Search: Search },
      });
    }
  };

  return (
    <div>
      <SearchBar
        onChange={(e) => SetSearch(e.target.value)}
        placeholder="Search for Sellers or Products.."
        onKeyPress={() => SearchForQuery()}
        onRightPress={() => SearchForQuery()}
      />

      <CategoriesCaraousel />

      <div style={styles.ProductBox}>
        {Recent.map((c) => (
          <ProductCard
            item={c}
            key={c._id}
            onClick={() => {
              history.push({
                pathname: "/ProductDetails",
                state: { _id: c._id },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;

const styles = {
  ProductBox: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 0,
    overflow: "auto",
    justifyContent: "center",
    marginTop: 10,
  },
};
