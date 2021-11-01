import { createContext, useState } from "react";

export const authContext = createContext({
  camposcar: {},
  setcamposcar: () => {},
});

function MyApp({ Component, pageProps }) {
  const [camposcar, setCamposCar] = useState();
  return (
    <authContext.Provider value={{ camposcar, setCamposCar }}>
      <Component {...pageProps} />
    </authContext.Provider>
  );
}

export default MyApp;
