function GoogleBTN({ onClick }) {
  return (
    <div onClick={onClick}>
      <img
        src="/googleBTN.png"
        alt="GoogleBTN"
        style={{ height: 60, maxWidth: 300, marginTop: 30 }}
      ></img>
    </div>
  );
}

export default GoogleBTN;
