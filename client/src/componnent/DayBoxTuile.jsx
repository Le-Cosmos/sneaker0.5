import React from "react";

function DayBoxTuile(props) {
  return (
    <button className="tuile">
      <img className="img-tuile" src={props.Img} alt="" />
      <div className="tuile2">
        <h4 className="name-tuile top">{props.Name.slice(0, 18)}</h4>
        <h4 className="name-tuile bottom">{props.Name.slice(18)}</h4>
        <h5>Price</h5>
        <p className="price-tuile">{props.Love}€</p>
      </div>
    </button>
  );
}

export default DayBoxTuile;
