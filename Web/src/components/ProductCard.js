import Text from "./Text";
import Configuration from "./../config/Configuration";
import HelperFunctions from "../config/HelperFunctions";

const BaseURL = Configuration.BaseURL;

function ProductCard({ item, onClick }) {
  const img = HelperFunctions.GiveImage(item.Files);

  return (
    <div
      style={{
        width: 160,
        height: "auto",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 10,
      }}
      onClick={onClick}
    >
      <div style={{ width: 140, height: 140 }}>
        <img
          src={BaseURL + img}
          className="layers"
          alt="ProductImage"
          width="140"
          height="140"
          style={{ objectFit: "cover", borderRadius: 5 }}
        />
      </div>

      <Text
        text={item.Title}
        textAlign="center"
        marginTop={5}
        size={13}
        weight="500"
        wordBreak="break-word"
      />
      <Text text={`in ${item.Category}`} color="green" size={12} />
    </div>
  );
}

export default ProductCard;
