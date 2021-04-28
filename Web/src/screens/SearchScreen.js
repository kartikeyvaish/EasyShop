import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/API";
import Container from "../components/Container";
import MyProductsCard from "../components/MyProductsCard";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";

function SearchScreen({ history }) {
  const [Search, SetSearch] = useState(history.location.state.Search);
  const [Products, SetProducts] = useState([]);
  const [Loading, SetLoading] = useState(true);

  useEffect(() => {
    GetSearchResults();
    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const GetSearchResults = async () => {
    if (Search.length) {
      SetLoading(true);
      try {
        const resposne = await API.GetSearchResults({
          Search: Search,
        });
        if (resposne.ok) {
          SetProducts(resposne.data);
          SetLoading(false);
        } else {
          toast.error("Server Error");
          SetLoading(false);
        }
      } catch (error) {
        toast.error("Server Error");
        SetLoading(false);
      }
    }
  };

  return (
    <Container Loading={Loading} LoadingText="Getting Search Results..">
      <SearchBar
        onChange={(e) => SetSearch(e.target.value)}
        placeholder="Search for Sellers or Products.."
        onKeyPress={() => GetSearchResults()}
        onRightPress={() => GetSearchResults()}
      />
      {Products.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {Products.map((item) => (
            <MyProductsCard
              key={item._id}
              item={item}
              maxWidth={900}
              onClick={() => {
                history.push({
                  pathname: "/ProductDetails",
                  state: { _id: item._id },
                });
              }}
              showEditBTN={false}
            />
          ))}
        </div>
      ) : (
        <Text text="No Search Results Found..." weight="bold" size={25} />
      )}
    </Container>
  );
}

export default SearchScreen;
