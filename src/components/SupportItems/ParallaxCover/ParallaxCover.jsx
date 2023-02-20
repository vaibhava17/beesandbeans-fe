import React from "react";
import { Parallax } from "react-parallax";

const Cover = ({ children, img, size }) => {
  const styles = {
    backgroundImage: "linear-gradient(transparent 70%, #00000070)",
    height: size,
  };
  
  return (
    <>
      <section>
        <Parallax bgImage={img} bgImageSizes="700px" strength={500}>
          <div
            className={`justify-content-center align-items-center`}
            style={styles}
          >
            {children}
          </div>
        </Parallax>
      </section>
    </>
  );
};

export default Cover;
