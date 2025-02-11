import Posts from "../components/Posts"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import React, { useEffect } from "react"

export default function Parrot(props) {
  useEffect(() => {
    props.curAnimalChange("parrot")
  }, [])
  return (
    <div className="mainPage">
      <Header />
      <Navigation isLinkToWritePage />
      <Posts
        title="앵무새"
        isLinkToWritePage
        postList={props.postList}
        curAnimal={props.curAnimal}
        curPostRead={props.curPostRead}
      />
    </div>
  )
}
