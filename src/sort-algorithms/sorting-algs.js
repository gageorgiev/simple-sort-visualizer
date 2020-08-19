//generate animations to be executed based on how the array is sorted

//bubble sort
export function bubbleSortAlg(array) {
    var arr = array.slice();
    var toAnimate = [];
    for(let i=0;i<arr.length-1;i++) {
        for(let j=0;j<arr.length-i-1;j++) {
            var animation = {toCompareFirst: j, toCompareSecond: j+1, toSwap: false}
            if(arr[j] > arr[j+1]) {
                const tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
                animation.toSwap = true;
            }
            toAnimate.push(animation);
        }
    }

    return toAnimate;
};


//gnome sort
function gnomeSortHelper(arr, upperBound, toAnimate) {
    var i = upperBound;
    while(i>0 && arr[i-1] > arr[i]) {
        var animation = {toCompareFirst: i, toCompareSecond: i-1, toSwap: true};
        toAnimate.push(animation);
        const tmp = arr[i];
        arr[i] = arr[i-1];
        arr[i-1] = tmp;
        i = i-1;
    }
}

export function gnomeSortAlg(array) {
    var arr = array.slice();
    var toAnimate = [];
    for(let i=1;i<arr.length;i++) {
        gnomeSortHelper(arr, i, toAnimate);
    }
    return toAnimate;
}

//old gnome sort(unoptimized)
/*
export function gnomeSortAlg(array) {
    var arr = array.slice();
    var toAnimate = [];
    var i = 0;
    while(i < arr.length) {
        if(i === 0 || arr[i] >= arr[i-1]) {
            var animation = {toCompareFirst: i, toCompareSecond: i, toSwap: false};
            i = i + 1;
        }
        else {
            var animation = {toCompareFirst: i, toCompareSecond: i-1, toSwap: true};
            const tmp = arr[i];
            arr[i] = arr[i-1];
            arr[i-1] = tmp;
            i = i - 1;
        }
        toAnimate.push(animation);
    }
    return toAnimate;
}*/