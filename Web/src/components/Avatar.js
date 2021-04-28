import Avatar from "@material-ui/core/Avatar";

export default function ImageAvatars({
  uri,
  size = 50,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}) {
  return (
    <Avatar
      alt="Avatar"
      src={uri}
      style={{
        width: size,
        height: size,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
      }}
    />
  );
}
