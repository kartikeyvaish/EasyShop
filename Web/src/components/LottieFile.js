import { useEffect } from "react";
import Lottie from "react-lottie";

export default function LottieFile({ uri, onComplete }) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Lottie
      options={{
        loop: false,
        autoplay: true,
        animationData: uri,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      height={200}
      width={200}
      onLoopComplete={onComplete}
    />
  );
}
