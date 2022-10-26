/**
 * 快排
 * 1. 选择基准值：从数列中挑出一个元素，称为 基准（Pivot）（有不同的选择方法）
 * 2. 分割：重新排序数列，所有元素比基准值小的摆放在基准前面，所有比基准大的元素摆在基准的后面（相同的数可以到任意一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作
 * 3. 递归排序子序列：递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序
 */
const arr = [2, 34, 14, 44, 22, 15, 53, 23, 55, 11, 32, 5, 32, 93, 26, 21, 23];

const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left >= right) return;

  let partitionIndex = left - 1;

  for (let i = left; i <= right; i++) {
    if (arr[i] <= arr[right]) {
      partitionIndex++;
      [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
    }
  }
  quickSort(arr, left, partitionIndex - 1);
  quickSort(arr, partitionIndex + 1, right);

  return arr;
};

console.log(quickSort(arr));
