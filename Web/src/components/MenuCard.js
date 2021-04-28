import Button from "./Button";

function MenuCard({
  MenuName,
  marginTop,
  marginBottom = 10,
  marginLeft,
  marginRight,
  onClick,
}) {
  return (
    <Button
      Title={MenuName}
      style={{
        width: "90%",
        height: 60,
        borderColor: "grey",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: 10,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
      }}
      onClick={onClick}
      backgroundColor="transparent"
      capitalize={false}
    ></Button>
  );
}

export default MenuCard;
