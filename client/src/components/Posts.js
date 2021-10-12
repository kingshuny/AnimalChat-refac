import styled from 'styled-components'
import SinglePostOnBoard from '../components/SinglePostOnBoard';

const Background = styled.div`
  box-sizing: content-box;
  background-color: #FEEFD5;
  padding: 1rem;
`;

const BoardInGrid = styled.div`
  box-sizing: content-box;
  display: grid;
  padding: 1rem;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, 200px);
  justify-content: center;
  align-content: center;
`;

export default function Posts({ title }) {

  return (
    <div className="boards">
      <Background>
        <h2>{title}</h2>
        <BoardInGrid>
          <SinglePostOnBoard />
        </BoardInGrid>
      </Background>
    </div>
  );
}

// TODO : 게시물 없을 때의 메시지

// TODO
// [] 게시물 자료 배열에 map으로 <SinglePostOnBoard /> 적용
// [] height를 어떻게 해야 할까

// 데이터.map 수도코드
// Posts props : data
// SinglePostOnBoard Props 미리보기 사진, 프로필 사진, 글쓴이, 제목, 링크(?)
// => data.thumbnail, data.profilePicture, data.writer, data.title, data.postId

/*
  data.map(obj => {
    return (
      <Route path={`/board/${obj.animalType}/${obj.postId}`}>
        <SinglePostOnBoard
          key={uuid something}
          thumbnail={obj.thumbnail}
          profilePicture={obj.profilePicture}
          writer={obj.writer}
          title={obj.title}
          postId={obj.postId}
        />
      </Route>
    );
  })
*/