import React from "react";

function SearchResult(props) {
  return (
    <button className="search-btn">
      <img className="img-search" src={props.Thumbnail} alt="" />
      <p className="name-search">{props.Name}</p>
      <p className="price-search">{props.Price} €</p>
      <p className="date-search">{props.Date}</p>
    </button>
  );
}

export default SearchResult;
