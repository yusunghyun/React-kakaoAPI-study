import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

const SearchInput = styled.input`
  padding: 7px 10px;
  font-size: 14px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  margin-right: 5px;
`
const SearchButton = styled.button`
  padding: 5px 15px 7px 15px;
  font-size: 14px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  cursor: pointer;
  transition: all 0.1s;
  &:hover{
    background-color: #0069d9;
    border-color: #0062cc;
  }
  &:active{
    transform: scale(0.95, 0.95)
  }
`

const ImageForm = ({history}) => {
  const searchInput = React.createRef();
  const onSubmitListener = e => {
    e.preventDefault();//submit에 의한 페이지 이동 방지
    history.push("/"+searchInput.current.value)//검색어를 props로전달
  }
  return (
    <form onSubmit={onSubmitListener}>
      <SearchInput type='search' ref={searchInput} placeholder='검색어를 입력하세요'/>
      <SearchButton type='submit'>검색</SearchButton>
    </form>
  );
};

//내보낼때 withRouter로 가공해서 보내면 이 컴포넌트로 전달되는
//props에는 location,match,history등 Router객체가 포함된당.
export default withRouter(ImageForm);