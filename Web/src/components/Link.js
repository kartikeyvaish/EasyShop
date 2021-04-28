function Link({
  text,
  style = {},
  family,
  weight,
  size,
  marginTop,
  marginBottom,
  onClick,
  marginLeft,
  marginRight,
  cursor = "pointer",
  color = "dodgerblue",
  textDecoration = "underline",
}) {
  return (
    <div
      onClick={onClick}
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: family,
          fontWeight: weight,
          fontSize: size,
          cursor: cursor,
          color: color,
          textDecoration: textDecoration,
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default Link;
