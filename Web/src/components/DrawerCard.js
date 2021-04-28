import Text from "./Text";

function DrawerCard({ title, onClick, style }) {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 15,
        ...style,
      }}
      onClick={onClick}
    >
      <Text text={title} />
    </div>
  );
}

export default DrawerCard;
