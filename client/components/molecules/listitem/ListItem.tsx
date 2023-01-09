import React from 'react';
import Img from '../../atoms/image/Image';

const ListItem = ({
  src,
  alt,
  title,
  heartSrc,
  heartAlt,
}: ListItemPropsType) => {
  return (
    <div className="flex flex-col">
      <Img src={src} alt={alt} />
      <strong>{title}</strong>
      {heartSrc ? <Img src={heartSrc} alt={heartAlt} /> : null}
    </div>
  );
};

export default ListItem;
