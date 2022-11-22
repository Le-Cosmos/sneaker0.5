
import Body from "./Body";
import Heading from "./Heading";
import BodyNext from "./BodyNext";
import React, {useState} from "react";

function App() {
  const [page, setPage] = useState([1]);
  const goPage1 = () => setPage(1);
  const goPage2 = () => setPage(2);
  const goPage3 = () => setPage(3);
  return (
    <div>
      <div className= "navBar">
        <button onClick = {goPage1}> PRODUCTS </button>
        <button onClick = {goPage2}> NEXT DAYS </button>
        <button onClick = {goPage3}> BOARD </button>
      </div>
      <Heading />
      {(page === 1) ? (<Body />) : ((page === 2) ? (<BodyNext />) : (<Body />))}
    </div>
  );
}

export default App;
