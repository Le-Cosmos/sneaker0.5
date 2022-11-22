import React from "react";
import SearchBar from "./SearchBar";

function Heading(props) {
  return (
    <div className="heading">
      <h1 className="nom"> THE SITE </h1>
      <SearchBar />
    </div>
  );
}

export default Heading;
