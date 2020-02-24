import { handleActions, createAction } from 'redux-actions'
import axios from 'axios'

// "파일이름/상황이름" 값을 지정하면 다른 모듈과 Action값이 충돌하는 것을 방지할 수 있다
// Ajax 연동 기능 하나당 3개의 액션 정의 --> 목록가져오는중, 목록가져오기성공, 목록가져오기실패

//1.액션
const SEARCH = 'kakaoImageSearch/SEARCH'
const SEARCH_SUCCESS = 'kakaoImageSearch/SEARCH_SUCCESS'
const SEARCH_FAILURE = 'kakaoImageSearch/SEARCH_FAILURE'
//2.액션 생성 함수 - 액션 객체를 만들어서 리턴
export const searchAction = createAction(SEARCH)
export const searchSuccessAction = createAction(SEARCH_SUCCESS)
export const searchFailureAction = createAction(SEARCH_FAILURE)
//3.상태값 - 뉴스목록,현재검색중인지 여부, 에러 발생 여부
const initialState = {
  result: [],
  loading: false,
  error: false
}
//4.리듀서 - 각각action값을 메서드로 갖고 initialState와 구조가 일치해야한다
export default handleActions({//파라미터가 액션이름 , initialState
  [SEARCH]: (state = initialState,action) => {
    return {//고대로 데꼬와서 로딩만.
      ...state,
      loading: true
    }
  },
  [SEARCH_SUCCESS]: (state = initialState, action) => {
    return {//고대로 데꼬와서 결과괎 넣어주고 로딩복구
      ...state,
      result: action.payload.result,
      loading: false
    }
  },
  [SEARCH_FAILURE]: (state = initialState, action) => {
    return {//고대로 데꼬와서 error작동해줌
      ...state,
      result: action.payload.result,
      error: action.payload.error
    }
  }
},initialState)

//5.비동기 수행할 함수
//컨테이너로부터 query라는 파라미터 받음(내맘), action함수들은 dispatch(호출)함, 컨테이너props에 포함(?)
//query 받고 ajax로 패치 하니까 async 박은듯.
export const imageSearchAsync = query => async dispatch => {

  dispatch(searchAction())

  if(!query){ //검색어 없을 때 대비
    searchSuccessAction({result:[]});
    return
  }

  try{
    const result = await axios.get("https://dapi.kakao.com/v2/search/image",{
      params: {
        query: query
      },
      headers:{
        Authorization: 'KakaoAK 25922514da0b9475dffad343b8927e3f'
      }
    })
    // {result:result.data.articles}이놈이 위에 payload라는 옷을 입고 action으로 드간다. 쓸려면 action.payload.result
    dispatch(searchSuccessAction({result:result.data.documents}))
  } catch(e){
    //카카오에서 에러를 {"errorType":"AccessDeniedError","message":"~~~~"} 일케줌
    const responseBody = e.response.data;
    let msg = '['+e.response.status+']'
    msg+=responseBody.errorType + '\n' + responseBody.message
    dispatch(searchFailureAction({error:msg}))
  }
}
