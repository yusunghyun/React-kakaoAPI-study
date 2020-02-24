import React from 'react';

const ImageItem = ({item}) => {
  console.log(item)
  return (
    <div>
    <a href={item.doc_url} target="_blank">
      <img src={item.image_url}/>
      
    </a>
    </div>
  );
};

export default ImageItem;