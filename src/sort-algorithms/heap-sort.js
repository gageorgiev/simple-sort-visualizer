import swap from './helpers/swap';

function heapify(array, size, i, toAnimate) {
    var largest = i;
    var left = 2*i + 1;
    var right = 2*i +2;

    if(left < size) {
        var animation = {toCompareFirst: left, toCompareSecond: largest, toSwap: false}
        toAnimate.push(animation);
    }
    if(left < size && array[left] > array[largest]) {
        largest = left;
    }

    if(right < size) {
        animation = {toCompareFirst: left, toCompareSecond: largest, toSwap: false}
        toAnimate.push(animation);
    }
    if(right < size && array[right] > array[largest]) {
        largest = right;
    }
    
    animation = {toCompareFirst: largest, toCompareSecond: i, toSwap: false}
    if(largest !== i) {
        animation.toSwap = true;
        toAnimate.push(animation);
        swap(array, i, largest);

        heapify(array, size, largest, toAnimate);
    }
}

function heapSort(array, size, toAnimate) {
    for(let i=Math.floor(size/2 - 1); i >= 0; i--) {
        heapify(array, size, i, toAnimate);
    }
    for(let i=size-1;i>0;i--) {
        var animation = {toCompareFirst: 0, toCompareSecond: i, toSwap: true};
        toAnimate.push(animation);
        swap(array, 0, i);

        heapify(array, i, 0, toAnimate);
    }
}



export default function heapSortAlg(array) {
    var arr = array.slice();
    var toAnimate = [];
    heapSort(arr, arr.length, toAnimate);
    return {toAnimate: toAnimate, arr: arr};
}