import { useEffect } from "react";
import CatgegoryCard from "../components/CatgegoryCard";
import SingleContainer from "../components/SingleContainer";
import Text from "../components/Text";
import CategorySchema from "../schema/CategoriesSchema";

const CategoryArray = CategorySchema;

function AllCategories({ history }) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <SingleContainer boxStyle={{ maxWidth: 1500, flexDirection: "column" }}>
      <Text
        text="All Catgories"
        marginLeft={20}
        marginTop={15}
        marginBottom={10}
        size={20}
        family="Mulish"
        weight="bold"
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {CategoryArray.map((c) => (
          <CatgegoryCard
            key={c._id}
            title={c.Title}
            uri={c.File}
            onClick={() =>
              history.push({
                pathname: "/Search",
                state: { Search: c.Title },
              })
            }
          />
        ))}
      </div>
    </SingleContainer>
  );
}

export default AllCategories;
