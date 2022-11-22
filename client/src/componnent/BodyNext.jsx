import React, { useState, useEffect } from "react";
import Puzzle from "./Puzzle";
import DayBox from "./DayBox";



function BodyNext(props) {
  const [arrayOfDay, setArrayOfDay] = useState([]);
  const getDataD = async () => {
    var data = [];
    try {
      var dat = await fetch("api/nextDays");
      var res = await dat.json();
      setArrayOfDay(res);
    }
    catch (error){
      console.log(error);
    }
  }

  function createDayBox(day, i) {
    console.log(i);
    return (
      <DayBox
        key = {i}
        Array = {arrayOfDay[i]}
      />
    );
  }
  useEffect(() => getDataD, []);
  if (arrayOfDay){
    var i = 0;
    return <div className="bodyN-Day">{(arrayOfDay.map((day, index) => createDayBox(day, index)))}</div>;
  }
  else{
    return <div className="bodyN-Day">chargement</div>;
  }
}


export default BodyNext;
