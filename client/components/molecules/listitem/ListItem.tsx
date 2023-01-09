import React from "react";
import Img from "../../atoms/image/Image";

const ListItem = ({ src, alt, title }) => {
  return (
    <div>
      <Img src={src} alt={alt} />
      <strong>{title}</strong>
    </div>
  );
};

export default ListItem;
