import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Posts from "../components/Posts";

export default function Rabbit(props) {
  return (
    <div className="mainPage">
      {/* <Header />
      <Navigation /> */}
      <h1>rabbit</h1>
      <Posts mockBgColorPost={'#290FBA'} />
    </div>
  );
}