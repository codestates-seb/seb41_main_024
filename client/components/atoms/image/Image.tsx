import React from "react";
import { imagePropsType } from "./Type_Image";

const Img = ({ src, alt }: imagePropsType) => {
  return <img src={src} alt={alt} />;
};

export default Img;
