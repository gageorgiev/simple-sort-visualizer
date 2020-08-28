import React, { useState } from 'react';
import sortIcon from './images/sortIcon.svg';
import sortAlgMenu from './images/sortAlgMenu.svg';

//import { bubbleSortAlg, gnomeSortAlg, quickSortAlg } from './sort-algorithms/sorting-algs'; 
import bubbleSortAlg from './sort-algorithms/bubble-sort';
import gnomeSortAlg from './sort-algorithms/gnome-sort';
import quickSortAlg from './sort-algorithms/quick-sort';
import mergeSortAlg from './sort-algorithms/merge-sort';
import heapSortAlg from './sort-algorithms/heap-sort';
import oddEvenSortAlg from './sort-algorithms/odd-even-sort';

function randomArray(size) { //array of random numbers of size size
  var array = [];
  for(let i=0;i<size;i++) {
    array.push(Math.floor(Math.random() * 300) + 10);
  }

  return array;
}

function App() {
  //all states
  const [sortAlg, setSortAlg] = useState('Gnome sort'); //sorting alg to be used

  const [size, setSize] = useState(50); //size of array
  const [array, setArray] = useState(randomArray(50)); //array that is to be sorted
  const [sortSpeed, setSortSpeed] = useState(80);

  const [currSorting, setCurrSorting] = useState(false); //flag to disable the button during sorting
  const [isSorted, setIsSorted] = useState(false);

  const [hoveredSize, setHoveredSize] = useState(false); //true if dropdown menu for alg selection is hovered
  const [hoveredAlg, setHoveredAlg] = useState(false); //true if dropdown menu for alg selection is hovered

  const defaultBarColor = '#777777';
  const compareBarColor = '#fff82b';
  const correctBarColor = '#45ff54';

  //animation function that receives an array of animations by one of the funcs in sorting-algs.js and animates the bars based on it
  const animate = (animations) => {
    const arrayBars = document.getElementsByClassName('arrayBar'); //get elements to change css for animations
    for(let i=0;i<animations.length;i++) {
      setTimeout(() => { //set them to red at start of comparison
        arrayBars[animations[i].toCompareFirst].style.backgroundColor = compareBarColor;
        arrayBars[animations[i].toCompareSecond].style.backgroundColor = compareBarColor;
      }, (i+0.5)*sortSpeed);
      if(animations[i].toSwap) { //if they are to be swapped
        setTimeout(() => { //swap their heights
          const tmp = arrayBars[animations[i].toCompareFirst].style.height;
          arrayBars[animations[i].toCompareFirst].style.height = arrayBars[animations[i].toCompareSecond].style.height;
          arrayBars[animations[i].toCompareSecond].style.height = tmp;
        }, (i+1)*sortSpeed);
        setTimeout(() => { //set colour to green to indicate that they are now in the correct position
          arrayBars[animations[i].toCompareFirst].style.backgroundColor = correctBarColor;
          arrayBars[animations[i].toCompareSecond].style.backgroundColor = correctBarColor;
        }, (i+1)*sortSpeed);
      } else { //if they are not to be swapped
        setTimeout(() => { //only set colour to green
          arrayBars[animations[i].toCompareFirst].style.backgroundColor = correctBarColor;
          arrayBars[animations[i].toCompareSecond].style.backgroundColor = correctBarColor;
        }, (i+1)*sortSpeed);
      }
      setTimeout(() => { //set them back to yellow
          arrayBars[animations[i].toCompareFirst].style.backgroundColor = defaultBarColor;
          arrayBars[animations[i].toCompareSecond].style.backgroundColor = defaultBarColor;
      }, (i+2)*sortSpeed);
    }
    setTimeout(() => {
      setCurrSorting(false);
      setIsSorted(true);
    }, animations.length*(sortSpeed)+20);
  };

  const handleSortPress = () => {
    if(isSorted) {
      alert("The array is sorted.");
    }
    else {
      setCurrSorting(true);
      if(sortAlg==="Bubble sort") {
        animate(bubbleSortAlg(array));
      } else if(sortAlg==="Heap sort") {
        animate(heapSortAlg(array));
      } else if(sortAlg==="Quick sort") {
        animate(quickSortAlg(array));
      } else if(sortAlg==="Gnome sort") {
        animate(gnomeSortAlg(array));
      } else if(sortAlg==="Odd-Even sort") {
        animate(oddEvenSortAlg(array));
      } else if(sortAlg==="Merge sort") {
        animate(mergeSortAlg(array));
      }
    }
  }

  const handleSliderChange = (event) => {
    sliderSize(event.target.value);
  }

  const sliderSize = (sizeValue) => {
    setIsSorted(false);

    setSize(sizeValue);
    setArray(randomArray(sizeValue));

    setSortSpeed(Math.floor(4000/sizeValue));
  }

    return (
    <div className="h-screen w-screen items-center">
      <div className="flex flex-row w-full justify-around select-none" style={{ height: '8%', backgroundColor: currSorting ? '#CCCCCC' : '#EEEEEE', pointerEvents: currSorting ? 'none' : 'all' }} >

        <a href="/" className="w-12 font-bold text-xl self-center text-blue-500 hover:text-blue-700">
          {!isSorted && !currSorting && "Sorting vizualizer"}
          {isSorted && "Sorted"}
          {currSorting && "Sorting..."}
        </a>
        <div className="flex flex-row w-3/4 px-2 bg-blue-100 items-center justify-around shadow-lg rounded-full">
          <div onMouseEnter={() => setHoveredSize(true)} onMouseLeave={() => setHoveredSize(false)} className="cursor-pointer">
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg select-none w-24 text-center " >Size: {size}</div>
              {hoveredSize && 
              <div className="flex absolute px-2 py-4 items-center bg-white rounded-lg">
                <input
                  type="range"
                  onChange={handleSliderChange}
                  min={50}
                  max={250}
                  value={size}
                />
              </div>
              }
          </div>
          <div onMouseEnter={() => setHoveredAlg(true)} onMouseLeave={() => setHoveredAlg(false)} className="py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-700 font-bold text-white cursor-pointer">
            <div className="flex flex-row">
              <img src={sortAlgMenu} alt="" />
              <p className="ml-1">{sortAlg}</p>
            </div>
            {hoveredAlg &&
              <div className="absolute flex flex-col text-black bg-white cursor-pointer py-2 px-4 mt-2 rounded-lg" onClick={() => {setHoveredAlg(false)}}>
                <div onClick={() => {setSortAlg('Bubble sort')}} className="hover:underline">Bubble sort</div>
                <div onClick={() => {setSortAlg('Heap sort')}} className="hover:underline">Heap sort</div>
                <div onClick={() => {setSortAlg('Quick sort')}} className="hover:underline">Quick sort</div>
                <div onClick={() => {setSortAlg('Gnome sort')}} className="hover:underline">Gnome sort</div>
                <div onClick={() => {setSortAlg('Odd-Even sort')}} className="hover:underline">Odd-Even sort</div>
              </div>}
          </div>
          <button onClick={() => handleSortPress()} className="flex flex-row bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" > 
            <img src={sortIcon} alt="" />
            <p className="ml-1 select-none">Sort</p>
          </button>
        </div>
      </div>
      <div className="w-full bg-blue-200" style={{ height: '92%' }}>
        <div className="flex flex-row justify-evenly" >
            {array.map((number, index) => <div key={index} className="arrayBar" style={{
                                            height: `${number/4}vh`,
                                            width: `${1000/size}px`,
                                            backgroundColor: defaultBarColor,
                                          }}
                                          />
                      )
            }
        </div>
      </div>
    </div>
  );
}

export default App;



/*
<ReactSlider
                  className="vertical-slider"
                  orientation="vertical"
                  onChange={value => sliderSize(value)}
                  min={50}
                  max={250}
                  defaultValue={50}
                  
                />*/