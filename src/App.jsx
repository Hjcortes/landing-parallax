import { ParallaxProvider } from "react-scroll-parallax";
import Main from "./Main";
import "./styles.css";

export default function App() {
  return (
    <>
      <ParallaxProvider>
          <Main />
      </ParallaxProvider>
    </>
  );
}
