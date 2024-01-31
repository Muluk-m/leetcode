/**
 * 二分算法
 */
const arr = [1, 3, 5, 7, 9, 22, 44, 55, 66, 223, 333];

const binarySearch = (arr, t, l = 0, r = arr.length) => {
  // const m = Math.floor((l + r) / 2);
  const m = (l + r) >>> 1;

  if (arr[m] === t) return m;
  if (arr[m] < t) return binarySearch(arr, t, m + 1, r);
  if (arr[m] > t) return binarySearch(arr, t, l, m - 1);
};

const binarySearch1 = (arr, t, l = 0, r = arr.length) => {
  while (l <= r) {
    const m = (l + r) >>> 1;
    if (arr[m] === t) return m;
    if (arr[m] < t) l = m + 1;
    if (arr[m] > t) r = m - 1;
  }
};

console.log(binarySearch1(arr, 44));


const binarySearch2 = (arr = [], target, start = 0, end = arr.length) => {

  while (start < end) {
    const middle = (end + start) >>> 1
    if (arr[middle] === target) return middle
    if (arr[middle] > target) end = middle - 1
    if (arr[middle] < target) start = middle + 1
  }
}
