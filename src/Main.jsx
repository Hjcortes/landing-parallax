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
    <div className="parallax-container"> {/* Contenedor padre recomendado */}
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <section key={index} className={!isEven ? "reverse" : ""}>
            <div className="wrapper">
              
              <div className="section-heading">
                {/* Aumentamos el rango de X: 
                  Si es par, empieza en 100% (derecha) y va a -100% (izquierda)
                */}
                <Parallax 
                  translateX={isEven ? ['100%', '-50%'] : ['-100%', '50%']} 
                  opacity={[0, 1, 1, 0]} // Aparece y desaparece suavemente
                  className="parallax-title"
                >
                  <h2>{section.title}</h2>
                </Parallax>
              </div>

              <div className="container">
                <Parallax translateY={[-20, 20]} scale={[0.9, 1.1]}>
                  <div className="imgBx">
                    <img src={section.image} alt={section.title} />
                  </div>
                </Parallax>

                <Parallax translateY={[480, -480]}>
                  <div className="content">
                    <p>{section.text}</p>
                  </div>
                </Parallax>
              </div>

            </div>
          </section>
        );
      })}
    </div>
  );
}

