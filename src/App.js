import React, { useState } from 'react';
import { Slider } from '@material-ui/core';

function randomArray(size) {
  var array = [];
  for(let i=0;i<size;i++) {
    array.push(Math.floor(Math.random() * 200) + 10);
  }

  return array;
}

function App() {
  const [size, setSize] = useState(50);
  const [array, setArray] = useState(randomArray(size));

  const handleSortPress = () => {
    setSize(100);
    setArray(randomArray(100));
  }
  const sliderOnChange = (event, value) => {
    setSize(value);
    setArray(randomArray(size));
  }
  return (
    <div className="h-screen w-screen items-center">
      <div className="flex flex-row w-full bg-red-800 items-center justify-around" style={{ height: '8%' }}>
        <div className="w-1/4 pl-4">
          <Slider
            min={50}
            max={250}
            step={1}
            value={size}
            onChange={sliderOnChange}
            aria-labelledby="continuous-slider"
          />
        </div>
        <button onClick={handleSortPress}>
          sort
        </button>
      </div>
      <div className="w-full bg-green-400" style={{ height: '92%' }}>
        <div className="flex flex-row justify-evenly" >
          {array.map((number) => 
            <div className="bg-red-400" style={{ height: `${number/3}vh`, width: `${1000/size}px` }} >
            </div> 
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
