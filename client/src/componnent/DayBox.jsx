import React from "react";
import DayBoxTuile from "./DayBoxTuile"

function DayBox(props) {
  return (
    <div>
      <h1> {props.Array[0].releaseDate}</h1>
      {props.Array.map((shoe) => (<DayBoxTuile
        Img = {shoe.thumbnail}
        Name ={shoe.shoeName}
        Love = {shoe.retailPrice}
        Diff = {Math.min(shoe.lowestResellPrice) - shoe.retailPrice}
        />))}
      </div>
  );
}

export default DayBox;
