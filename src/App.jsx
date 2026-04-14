import { ParallaxProvider } from "react-scroll-parallax";
import Main from "./Main";
import "./styles.css";

import StaggeredMenu from "./components/StaggeredMenu/StaggeredMenu";

export default function App() {
  return (
    <ParallaxProvider>
      <StaggeredMenu />
      <Main />
    </ParallaxProvider>
  );
}
