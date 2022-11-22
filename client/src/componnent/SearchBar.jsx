import React, { useState } from "react";
import SearchResult from "./SearchButton";


function SearchBar() {
  let [search, setSearch] = useState([]);
  var typingTimer;
  var doneTypingInterval = 500;
  async function handleSearch(event) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async() =>{
      var data = [];
      var js = [];
      const sea = await event.target.value.toLowerCase();
      if (sea) {
        try{
          data = await fetch("/api/search/" + sea);
          js = await data.json();
        }
        catch (error){
          console.log(error);
        }
      }

      console.log(js);
      setSearch(js);
    } ,doneTypingInterval);
  }
  return (
    <div>
      <div className="search">
        <input
          className="search-bar"
          name="search-bar"
          onChange={handleSearch}
          type="text"
          placeholder="Search ..."
        />
        <div className="search-result"> {search ? (search.map((shoe) => createSearchResult(shoe))) : (<h1> No Results </h1>)} </div>
      </div>
    </div>
  );
}

export default SearchBar;

function createSearchResult(search) {
  return (
    <SearchResult
      key={search.shoeName}
      Name={search.shoeName}
      Thumbnail={search.thumbnail}
      Date={search.releaseDate}
      Price={search.retailPrice}
    />
  );
}
