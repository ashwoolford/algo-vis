import "./App.css";
import React, { useState, useEffect, useRef } from "react";

function App() {
  var [array, setArray] = useState([]);
  var [sortHistory, setSortHistory] = useState([[...array]]);
  var [loopingVar, setLoopingVar] = useState(0);
  const [playing, setPlaying] = useState(false);
  var size = array.length;
  const timeoutRef = useRef();
  console.log(array, sortHistory);
  useEffect(() => {
    setArray(sortHistory[loopingVar]);
  }, [loopingVar, sortHistory]);

  useEffect(() => {
    if (loopingVar < sortHistory.length - 1 && playing) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setLoopingVar(loopingVar + 1);
      }, 500);
    } else {
      setPlaying(false);
    }
  }, [loopingVar, playing]);

  const play = () => {
    setPlaying(true);
  };

  const handleChange = (e) => {
    var str = e.target.value;
    setArray(str.split(",").map((i) => Number(i)));
  };

  const bubblesort = () => {
    var historyArray = [[...array]];
    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          var swap = array[j];
          array[j] = array[j + 1];
          array[j + 1] = swap;
          historyArray.push([...array]);
        }
      }
    }
    setSortHistory(historyArray);
    play();
  };

  return (
    <div>
      <div className="container">
        <label className="label">Enter the values as array</label>
        <input className="input" type="text" onChange={handleChange} />
        <button className="button" onClick={() => bubblesort()}>
          sort
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        {array.map((element) => (
          <div className="App" style={{ height: (element + 1) * 10 }}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
