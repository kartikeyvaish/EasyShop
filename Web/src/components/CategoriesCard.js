import Text from "./Text";

function CategoriesCard({ title, uri, onClick }) {
  return (
    <div
      style={{
        width: "auto",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingLeft: 10,
        paddingRight: 10,
      }}
      onClick={onClick}
    >
      <div style={{ width: 60, height: 60 }}>
        <img src={uri} alt="CC" width="60" height="60" />
      </div>
      <Text text={title} size={13} family="Mulish" />
    </div>
  );
}

export default CategoriesCard;
