import { Parallax } from "react-scroll-parallax";
import "./styles.css";
import bg1 from "./img/bg1.jpg";
import bg2 from "./img/bg2.jpg";
import bg3 from "./img/bg3.jpg";
import bg4 from "./img/bg4.jpg";
import bg5 from "./img/bg5.jpg";

const sections = [
  {
    title: "Creative studio launches",
    text: "A minimal parallax landing experience with crisp image motion and content blocks that float into view.",
    image: bg1,
  },
  {
    title: "Smooth scroll interactions",
    text: "Use vertical motion and soft horizontal offsets to create depth without losing readability.",
    image: bg2,
  },
  {
    title: "Modern layout styling",
    text: "Alternate the image and text positions in each section for a polished, magazine-style flow.",
    image: bg3,
  },
  {
    title: "Bold visual storytelling",
    text: "Keep each section focused, with large headings and layered panels that feel dynamic while staying easy to read.",
    image: bg4,
  },
  {
    title: "High-impact design",
    text: "A refined parallax effect can make a simple landing page feel premium and motion-rich.",
    image: bg5,
  },
];

export default function Main() {
  return (
    <>
      {sections.map((section, index) => (
        <section key={index} className={index % 2 === 1 ? "reverse" : ""}>
          <div className="wrapper">
            <div className="section-heading">
              <Parallax x={index % 2 === 0 ? [-80, 80] : [80, -80]} speed={-10}>
                <h2>{section.title}</h2>
              </Parallax>
            </div>

            <div className="container">
              <Parallax y={[-40, 40]} speed={-10}>
                <div className="imgBx">
                  <img src={section.image} alt={section.title} />
                </div>
              </Parallax>

              <Parallax y={[30, -30]} speed={5}>
                <div className="content">
                  <p>{section.text}</p>
                </div>
              </Parallax>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

