import CategoriesCard from "./CategoriesCard";
import CategoriesSchema from "../schema/CategoriesSchema";
import Configuration from "./../config/Configuration";

const ImageURL = Configuration.ImageURL;

function CategoriesCaraousel() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 85,
      }}
    >
      <div
        style={{
          width: "auto",
          height: "auto",
          padding: 0,
          display: "flex",
          flexDirection: "row",
          alignSelf: "center",
          overflowX: "auto",
        }}
      >
        {CategoriesSchema.map((c) => (
          <CategoriesCard title={c.Title} uri={ImageURL + c.File} key={c._id} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesCaraousel;
