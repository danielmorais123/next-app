import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import { poppins } from "../fonts/fonts";

export default function App({ Component, pageProps }: AppProps) {

  
  return (
    <div className={poppins.className}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </div>
  );
}
