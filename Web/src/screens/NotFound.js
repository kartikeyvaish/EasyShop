import { useHistory } from "react-router-dom";

import Button from "../components/Button";
import Container from "../components/Container";
import LottieFile from "../components/LottieFile";
import NotFoundLottie from "../animations/NotFound.json";
import Text from "../components/Text";
import { useEffect } from "react";

function NotFound() {
  const history = useHistory();

  useEffect(() => {
    document.title = "404 Not Found";
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container
      style={{ paddingTop: 50, justifyContent: "center", alignItems: "center" }}
    >
      <LottieFile uri={NotFoundLottie} />
      <Text
        text="Oops! 404 Not Found."
        size={30}
        family="Mulish"
        marginTop={50}
      />

      <Button
        Title="Go Home"
        style={{
          maxWidth: 200,
          marginTop: 50,
        }}
        color="white"
        onClick={() => {
          history.replace("/Home");
        }}
      />
    </Container>
  );
}

export default NotFound;
