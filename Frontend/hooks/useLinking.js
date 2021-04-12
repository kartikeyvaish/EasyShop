import { useEffect } from "react";
import * as Linking from "expo-linking";

import RootNav from "../navigation/RootNavigation";

export default UseLinking = () => {
  useEffect(() => {
    Linking.getInitialURL()
      .then((ev) => {
        if (ev) {
          urlRedirect(ev);
        }
      })
      .catch((err) => {});

    Linking.addEventListener("url", (event) => urlRedirect(event.url));

    return () => {};
  }, []);

  const urlRedirect = (url) => {
    if (!url) return;
    let { path, queryParams } = Linking.parse(url);
    if (path) {
      RootNav.navigate(path, queryParams);
    }
  };
};
