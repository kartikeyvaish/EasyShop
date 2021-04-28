import { Carousel } from "react-bootstrap";
import Configuration from "../config/Configuration";
import HelperFunctions from "../config/HelperFunctions";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ColorPallete from "../config/ColorPallete";

const BaseURL = Configuration.BaseURL;

function ProductCarousels({ itemArray = [] }) {
  return (
    <Carousel
      style={{ width: "100%", height: "100%" }}
      controls={false}
      interval={null}
    >
      {itemArray.map((c) => (
        <Carousel.Item key={HelperFunctions.GenerateUniqueID()}>
          <div style={styles.Item}>
            {c.endsWith("jpg") === true ||
            c.endsWith("png") === true ||
            c.endsWith("jpeg") === true ? (
              <img
                src={BaseURL + c}
                alt="Product Images"
                style={styles.Image}
              />
            ) : (
              <div style={styles.VideoBox}>
                <PlayArrowIcon style={styles.PLayIcon} />
              </div>
            )}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousels;

const styles = {
  Item: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
  },
  VideoBox: {
    width: 300,
    height: 300,
    backgroundColor: "lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
    maxHeight: 300,
    maxWidth: 600,
  },
  PLayIcon: { fontSize: 100, color: ColorPallete.primary },
};
