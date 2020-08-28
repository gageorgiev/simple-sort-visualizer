function quickSortPartition(array, left, right, toAnimate) {
    var pivotIndex = Math.floor((right + left)/2);
    var pivot = array[pivotIndex];
    var i = left;
    var j = right;
    while(i <= j) {
        var animation = {toCompareFirst: i, toCompareSecond: pivotIndex, toSwap: false};
        toAnimate.push(animation);
        while(array[i] < pivot) {
            i++;
            animation = {toCompareFirst: i, toCompareSecond: pivotIndex, toSwap: false};
            toAnimate.push(animation);
        }
        animation = {toCompareFirst: j, toCompareSecond: pivotIndex, toSwap: false};
        toAnimate.push(animation);
        while(array[j] > pivot) {
            j--;
            animation = {toCompareFirst: j, toCompareSecond: pivotIndex, toSwap: false};
            toAnimate.push(animation);
        }
        if(i <= j) {
            animation = {toCompareFirst: i, toCompareSecond: j, toSwap: true};
            toAnimate.push(animation);
            let tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;

            i++;
            j--;
        }
    }
    return i;
}

function quickSortMain(array, left, right, toAnimate) {
    var index;
    if(array.length > 1) {
        index = quickSortPartition(array, left, right, toAnimate);
        if(left < index - 1) {
            quickSortMain(array, left, index - 1, toAnimate);
        }
        if(index < right) {
            quickSortMain(array, index, right, toAnimate);
        }
    }
}

export default function quickSortAlg(array) {
    var arr = array.slice();
    var toAnimate = [];
    quickSortMain(arr, 0, arr.length-1, toAnimate);
    return toAnimate;
}