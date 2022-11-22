import React from "react";

function Puzzle(props) {
  return (
      <button className="puzzle">
        <img className="img-puzzle" src={props.Thumbnail} alt="" />
        <div className="puzzle2">
          <h4 className="name-puzzle top">{props.ShoeName.slice(0, 18)}</h4>
          <h4 className="name-puzzle bottom">{props.ShoeName.slice(18)}</h4>
          <h5>Price</h5>
          <p className="price-puzzle">{props.Price}€</p>
        </div>
      </button>
  );
}

export default Puzzle;
