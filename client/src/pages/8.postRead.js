import { useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import Comment from "./8.postRead-comment"

// styled-component
const Outer = styled.div`
    width: 100vw;
    height: 100vh;
`

const Contents = styled.div`
    width: 100vw;
    background-color: #feefd5;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PostReadSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div {
        margin: 1rem;
    }

    & .postPic {
        width: 50vw;
        height: 50vw;
        border: 1px solid grey;
    }

    & .postContent {
        font-size: 1.2rem;
        padding: 1rem;
        width: 90%;
        margin-bottom: 2rem;
    }
`

const PostTitle = styled.div`
    display: flex;
    width: calc(100% - 2rem);

    & h1 {
        margin: auto 1rem;
    }
`

const PostTitleLeft = styled.div`
    display: flex;
    flex-grow: 8;
    align-items: center;

    & img {
        border: 1px solid black;
        width: 3rem;
        height: 3rem;
    }
`

const PostButtons = styled.div`
    padding: 0;
    display: flex;
    flex-grow: 2;
    align-items: center;

    & button {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-size: 1rem;
        padding: 0.5rem;
        margin: 0.5rem;
        color: white;
    }
    & .editPost {
        flex-grow: 2;
        background-color: #4876bf;
        color: white;
    }
    & .deletePost {
        flex-grow: 1;
        background-color: #e00000;
    }
`

const CommentSection = styled.div`
    width: inherit;
    padding: 1rem;

    & li {
        padding: 1rem;
        margin: 0.5rem;
    }
`

const PostComment = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;

    & .commentUsername {
        display: flex;
        font-size: 0.8rem;
        & .username {
            font-weight: bold;
            margin-right: 0.5rem;
        }
        & .inputTitle {
            margin-right: 0.5rem;
        }
    }

    & input {
        width: 70%;
        padding: 0.5rem;
        font-size: 1rem;
        margin-right: 1rem;
    }

    & button {
        background-color: #419300;
        padding: 0.5rem;
    }
`

const CommentList = styled.ul`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    width: inherit;
`

const BackButton = styled.button`
    font-weight: bold;
    text-decoration: underline;
    background-color: transparent;
    color: #7b7b7b;
    font-size: 1rem;
    margin: 1rem;
    padding: 0.8rem;
`
const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function PostRead(props) {
    // title - 수정버튼 : history.push
    //console.log(props.curPost)
    // console.log(props)
    const history = useHistory()
    function editPostButton(event) {
        history.push("/postedit")
    }
    useEffect(() => {
        handleButtonClick2()
    }, [])

    // title - 삭제 :
    const deletePostButton = (event) => {
        // 데이터베이스 게시물 삭제
        if (window.confirm("게시물을 삭제하시겠습니까?")) {
            axios({
                url: url + "/postdelete",
                method: "delete",
                withCredentials: true,
            }).then(() => {
                alert("게시물 삭제 완료")
                history.push("/mainpage") // 또는 board/{해당동물} 페이지로
            })
        }
    }

    // 뒤로 버튼
    const backButtonHandler = () => {
        history.goBack()
        history.goBack()
        // history.goBack()
    }

    // 댓글
    const [contentMsg, setContentMsg] = useState(null) // 작성되어지는 댓글 (input)
    const [cotentList, setContentList] = useState([]) // 댓글 목록

    // 댓글작성 버튼
    function handleButtonClick() {
        axios({
            url: url + "/commentsend",
            method: "post",
            data: {
                post_id: props.curPost.id,
                comment_user_id: props.userinfo.user_id,
                comment_content: contentMsg,
            },
            withCredentials: true,
        }).then((res) => {
            // setContentList(res.data)
            // console.log("댓글작성완료")
            handleButtonClick2()
        })
    }

    function handleButtonClick2() {
        // console.log("handleButtonClick2")

        axios({
            url: url + "/commentlist",
            method: "post",
            data: {
                post_id: props.curPost.id,
                comment_user_id: props.userinfo.user_id,
            },
            withCredentials: true,
        }).then((res) => setContentList(res.data))
        // console.log("handleButtonClick2끝")
        // console.log(cotentList) // 댓글목록배열
    }

    // 댓글 삭제 (해당 유저 아이디만, )
    const deleteComment = (event) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            axios({
                url: url + "/commentdelete",
                method: "delete",
                data: {
                    // 해당댓글삭제
                    post_id: props.curPost.id, //
                },
                withCredentials: true,
            })
                .then(() => {
                    history.push("/mainpage")
                    history.goBack()
                })
                .then(() => {
                    console.log("cotentList : ", cotentList)
                })
        }
    }

    // 댓글내용
    const handleChangeMsg = (event) => {
        setContentMsg(event.target.value)
    }
    // console.log('댓글배열 : ', cotentList)

    return (
        <Outer>
            {/* 내사진, 제목, 날짜, 버튼 */}
            <Contents>
                <PostReadSection>
                    <PostTitle className="postTitle">
                        <PostTitleLeft className="postTitle_left">
                            <h1 className="title">
                                {props.curPost.post_title}
                            </h1>
                            <p>{props.curPost.updatedAt}</p>
                        </PostTitleLeft>

                        <PostButtons className="postTitle_right">
                            <button
                                className="editPost"
                                onClick={editPostButton}
                            >
                                수정
                            </button>
                            <button
                                className="deletePost"
                                onClick={deletePostButton}
                            >
                                삭제
                            </button>
                        </PostButtons>
                    </PostTitle>

                    {/* 게시물 사진 */}
                    <div className="postPic">
                        <img
                            className="picture"
                            src={url + props.curPost.post_img}
                            alt="게시물 사진"
                        />
                    </div>

                    {/* 게시물 내용 */}
                    <div className="postContent">
                        {props.curPost.post_content}
                    </div>

                    {/* 뒤로 버튼 */}
                    <BackButton
                        className="backButton"
                        onClick={backButtonHandler}
                    >
                        home
                    </BackButton>
                </PostReadSection>
                {/* 댓글 작성 */}

                <CommentSection>
                    <PostComment className="postComment">
                        <div>{props.userinfo.user_id} 댓글달기:</div>
                        <input
                            className="inputComment"
                            type="text"
                            placeholder="댓글을 작성해주세요."
                            onChange={handleChangeMsg}
                        />
                        <button onClick={handleButtonClick}>작성</button>
                    </PostComment>

                    {/* 댓글 목록 */}
                    <CommentList className="commentsList">
                        {cotentList.map((content) => (
                            <Comment
                                content={content}
                                deleteComment={deleteComment}
                            />
                        ))}
                    </CommentList>
                </CommentSection>
            </Contents>
        </Outer>
    )
}
