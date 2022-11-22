import React, { useState, useEffect } from "react";
import Puzzle from "./Puzzle";



function Body(props) {
  const [search, setSearch] = useState([]);
  const getData = async () => {
    var data = [];
    var js = [];
    data = await fetch("/api/home");
    js = await data.json();
    setSearch(js);
  }
  function createShoeBox(shoe) {
    return (
      <Puzzle
        key= {shoe.id}
        Thumbnail= {shoe.thumbnail}
        ShoeName= {shoe.shoeName}
        Price= {shoe.retailPrice}
      />
    );
  }
  useEffect(() => getData, []);
  if (search){
    return <div className="body-puzzle">{(search.map((shoe) => createShoeBox(shoe)))}</div>;
  }
  else{
    return <div className="body-puzzle">chargement</div>;
  }
}


export default Body;
