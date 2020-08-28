import swap from "./helpers/swap";

function oddEvenSort(array, toAnimate) {
    var sorted = false;
    while(!sorted) {
        sorted = true;
        for(let i=1; i<array.length - 1; i+=2) {
            if(array[i] > array[i+1]) {
                var animation = {toCompareFirst: i, toCompareSecond: i+1, toSwap: true};
                toAnimate.push(animation);
                swap(array, i, i+1);
                sorted = false;
            }
        }

        for(let i=0; i<array.length-1; i+=2) {
            if(array[i] > array[i+1]) {
                animation = {toCompareFirst: i, toCompareSecond: i+1, toSwap: true};
                toAnimate.push(animation);
                swap(array, i, i+1);
                sorted = false;
            }
        }
    }
}

export default function oddEvenSortAlg(array) {
    var arr = array.slice();
    var toAnimate = [];
    oddEvenSort(arr, toAnimate);
    return toAnimate;
}