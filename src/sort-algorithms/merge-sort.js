function mergeSort(array, startIndex, endIndex, toAnimate) {
    if(endIndex - startIndex >= 2) {
        var middleIndex = startIndex + Math.floor((endIndex-startIndex)/2);
        mergeSort(array, startIndex, middleIndex, toAnimate);
        mergeSort(array, middleIndex, endIndex, toAnimate);

        var i = startIndex;
        var j = middleIndex;
        while(i<middleIndex && j<endIndex) {
            if(array[i] < array[j]) {
                i++;
            } else {
                var saveValue = array[j];
                var moveIndex = j;

                while(moveIndex !== i) {
                    var animation = {toCompareFirst: moveIndex, toCompareSecond: moveIndex-1, toSwap: true};
                    toAnimate.push(animation);
                    array[moveIndex] = array[moveIndex-1];
                    moveIndex -= 1;
                }

                array[i] = saveValue;

                i++;
                middleIndex++;
                j++;
            }
        }
    } 
}


export default function mergeSortAlg(array) {
    var arr = array.slice()
    var toAnimate = [];
    mergeSort(arr, 0, arr.length, toAnimate);
    return {toAnimate: toAnimate, arr: arr};
}