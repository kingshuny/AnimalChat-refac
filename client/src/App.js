import React, { useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import axios from "axios"
import NavBar from "./pages/0.navBar"
import FirstPage from "./pages/1.firstPage"
import Signup from "./pages/2.signUp"
import MainPage from "./pages/4-2.mainPage"
import Hamster from "./pages/5-1.hamster"
import Chick from "./pages/5-2.chick"
import Parrot from "./pages/5-3.parrot"
import Rabbit from "./pages/5-4.rabbit"
import Hedgehog from "./pages/5-5.hedgehog"
import Post from "./pages/6.post"
import PostEdit from "./pages/7.postEdit"
import PostRead from "./pages/8.postRead"
import MyPage from "./pages/9.myPage"
// import MyPageEdit from "./pages/10.myPageEdit"
// import PwdEdit from "./pages/11.pwdEdit"

import "./App.css"
const url =
  process.env.REACT_APP_URL ||
  "http://ec2-3-34-2-204.ap-northeast-2.compute.amazonaws.com"

function App() {
  const [isLogin, setIsLogin] = useState(false)
  function getAxios() {
    axios({
      url: url,
      method: "post",
      withCredentials: true,
    }).then((res) => setIsLogin(true))
  }

  return (
    <>
      <NavBar />
      <div className="entire">
        <Switch>
          <Route exact path="/firstpage">
            <FirstPage />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/mainpage">
            <MainPage />
          </Route>
          <Route exact path="/board/hamster">
            <Hamster />
          </Route>
          <Route exact path="/board/chick">
            <Chick />
          </Route>
          <Route exact path="/board/parrot">
            <Parrot />
          </Route>
          <Route exact path="/board/rabbit">
            <Rabbit />
          </Route>
          <Route exact path="/board/hedgehog">
            <Hedgehog />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/postedit">
            <PostEdit />
          </Route>
          <Route path="/postread">
            <PostRead />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>

          {/* <Route path="/mypageedit">
            <MyPageEdit />
          </Route>
          <Route path="/pwdedit">
            <PwdEdit />
          </Route> */}

          <Route path="/">
            {isLogin ? (
              <Redirect to="/mainpage" />
            ) : (
              <Redirect to="/firstpage" />
            )}
          </Route>
        </Switch>
      </div>
    </>
  )
}
export default App
