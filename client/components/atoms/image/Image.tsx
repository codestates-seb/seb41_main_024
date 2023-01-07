import React from "react";
import { imagePropsType } from "./Type_Image";

const Image = ({ src }: imagePropsType) => {
  return <img src={src} />;
};

export default Image;
