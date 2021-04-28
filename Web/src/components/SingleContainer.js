import LoadingScreen from "./LoadingScreen";

function SingleContainer({
  containerStyle,
  boxStyle,
  children,
  Loading,
  LoadingText,
  id,
}) {
  return (
    <>
      <div
        style={{ ...styles.container, ...containerStyle }}
        id={id ? id : null}
      >
        <LoadingScreen Loading={Loading} LoadingText={LoadingText} />
        <div style={{ ...styles.box, ...boxStyle }}>{children}</div>
      </div>
    </>
  );
}

export default SingleContainer;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: "auto",
    maxWidth: 800,
    display: "flex",
    position: "relative",
  },
};
