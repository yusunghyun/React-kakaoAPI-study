import React from 'react';
import ImageForm from '../components/ImageForm'
import ImageList from '../components/ImageList'

const ImageSearch = ({ match }) => {
  const {params} = match
  return (
    <div>
      <h1>Kakao Image Search</h1>
      <ImageForm/>
      <hr/>
      <ImageList query={params.query}/>
    </div>
  );
};

export default ImageSearch;