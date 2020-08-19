import React, { useState } from 'react';

import { bubbleSortAlg, gnomeSortAlg } from './sort-algorithms/sorting-algs'; 

function randomArray(size) {
  var array = [];
  for(let i=0;i<size;i++) {
    array.push(Math.floor(Math.random() * 300) + 10);
  }

  return array;
}

function App() {
  const [sortAlg, setSortAlg] = useState('Bubble sort'); //sorting alg to be used
  const [size, setSize] = useState(50); //size of array
  const [array, setArray] = useState(randomArray(50)); //array that is to be sorted
  const [currSorting, setCurrSorting] = useState(false); //flag to disable the button during sorting
  const [hoveredSize, setHoveredSize] = useState(false); //true if dropdown menu for alg selection is hovered
  const [hoveredAlg, setHoveredAlg] = useState(false); //true if dropdown menu for alg selection is hovered

  const animate = (animations) => {
    const arrayBars = document.getElementsByClassName('arrayBar');
    for(let i=0;i<animations.length;i++) {
      setTimeout(() => {
        arrayBars[animations[i].toCompareFirst].style.backgroundColor = 'red';
        arrayBars[animations[i].toCompareSecond].style.backgroundColor = 'red';
      }, i*50);
      if(animations[i].toSwap) {
        setTimeout(() => {
          const tmp = arrayBars[animations[i].toCompareFirst].style.height;
          arrayBars[animations[i].toCompareFirst].style.height = arrayBars[animations[i].toCompareSecond].style.height;
          arrayBars[animations[i].toCompareSecond].style.height = tmp;
        }, i*50 + 30);
        setTimeout(() => {
          arrayBars[animations[i].toCompareFirst].style.backgroundColor = 'green';
          arrayBars[animations[i].toCompareSecond].style.backgroundColor = 'green';
        }, i*50 + 30);
      } else {
        setTimeout(() => {
          arrayBars[animations[i].toCompareFirst].style.backgroundColor = 'green';
          arrayBars[animations[i].toCompareSecond].style.backgroundColor = 'green';
        }, i*50 + 30);
      }
      setTimeout(() => {
          arrayBars[animations[i].toCompareFirst].style.backgroundColor = 'yellow';
          arrayBars[animations[i].toCompareSecond].style.backgroundColor = 'yellow';
      }, i*50 + 70);
    }
  };

  const handleSortPress = () => {
    setCurrSorting(true);
    if(sortAlg==="Bubble sort") {
      animate(bubbleSortAlg(array));
    } else if(sortAlg==="Heap sort") {
      //animate(heapSortAlg());
    } else if(sortAlg==="Quick sort") {
      //animate(quickSortAlg());
    } else if(sortAlg==="Gnome sort") {
      animate(gnomeSortAlg(array));
    }
  }

  const dropdownSize = (value) => {
    setSize(value);
    setArray(randomArray(value));
  }

    return (
    <div className="h-screen w-screen items-center">
      <div className="flex flex-row w-full items-center justify-around" style={{ height: '8%', backgroundColor: currSorting ? 'darkred' : 'red', pointerEvents: currSorting ? 'none' : 'all' }} >
        <div onMouseEnter={() => setHoveredSize(true)} onMouseLeave={() => setHoveredSize(false)} className="bg-blue-400 cursor-pointer">
          {size} 
          {hoveredSize &&
            <div className="absolute flex flex-col bg-white cursor-pointer" onClick={() => {setHoveredSize(false)}}>
              <div onClick={() => dropdownSize(50)}>50</div>
              <div onClick={() => dropdownSize(100)}>100</div>
              <div onClick={() => dropdownSize(150)}>150</div>
              <div onClick={() => dropdownSize(200)}>200</div>
            </div>}
        </div>
        <div onMouseEnter={() => setHoveredAlg(true)} onMouseLeave={() => setHoveredAlg(false)} className="bg-blue-400 cursor-pointer">
          {sortAlg} 
          {hoveredAlg &&
            <div className="absolute flex flex-col bg-white cursor-pointer" onClick={() => {setHoveredAlg(false)}}>
              <div onClick={() => {setSortAlg('Bubble sort')}}>Bubble sort</div>
              <div onClick={() => {setSortAlg('Heap sort')}}>Heap sort</div>
              <div onClick={() => {setSortAlg('Quick sort')}}>Quick sort</div>
              <div onClick={() => {setSortAlg('Gnome sort')}}>Gnome sort</div>
            </div>}
        </div>
        <button onClick={() => handleSortPress()} disabled={currSorting}>
          sort
        </button>
      </div>
      <div className="w-full bg-green-400" style={{ height: '92%' }}>
        <div className="flex flex-row justify-evenly" >
            {array.map((number, index) => <div key={index} className="arrayBar" style={{ height: `${number/4}vh`, width: `${1000/size}px`, backgroundColor: 'yellow' }} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
