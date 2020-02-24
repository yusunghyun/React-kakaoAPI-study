import React from 'react';
import styled from 'styled-components'
import {useSelector,useDispatch} from 'react-redux'
import ImageItem from '../components/ImageItem'
import * as kakaoImageSearchModule from '../modules/KakaoImageSearch'

const ImageListBox = styled.div`
  &:after{
    content:'';
    display:block;
    float:none;
    clear:both;
  }
`

const ImageList = (props) => {

  const {result,loading,error} = useSelector(state=>{
    return {...state.kakaoImageSearchModule}
  });

  const dispatch=useDispatch()

  React.useEffect(()=>{
    dispatch(kakaoImageSearchModule.imageSearchAsync(props.query))
  },[props.query])

  if(loading) { return <h2 style={{color:'#00f'}}>검색중입니다...</h2>}
  if(error) { return <h2 style={{color:'#f00'}}>{error}</h2>}
  if(!result || result.length < 1) {return <h2 style={{color:'#f90'}}>검색결과가 없습니다.</h2>}

  return (<ImageListBox>
    {result.map((item,index)=>(
      <ImageItem key={index} item={item}/>
    ))}
  </ImageListBox>);
};

export default React.memo(ImageList);