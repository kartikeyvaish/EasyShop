import Text from "./Text";
import Configuration from "./../config/Configuration";

const BaseURL = Configuration.ImageURL;

function CatgegoryCard({ title, uri, onClick }) {
  return (
    <div
      style={{
        width: 140,
        height: 140,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginLeft: 10,
        marginRight: 10,
      }}
      onClick={onClick}
    >
      <div style={{ width: 110, height: 110 }}>
        <img src={BaseURL + uri} alt="CC" width="110" height="110" />
      </div>
      <Text text={title} size={13} family="Mulish" />
    </div>
  );
}

export default CatgegoryCard;
