/*
给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

 

示例 1：

输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。

示例 2：

输入：target = 4, nums = [1,4,4]
输出：1
示例 3：

输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0

 */
/**
 * 解题思路
 * 1.滑动窗口可以理解为双指针法的一种！只不过这种解法更像是一个窗口的移动，所以叫做滑动窗口
 * 2.窗口就是满足其和 ≥ target 的长度最小的连续子数组；窗口的起始位置如何移动：如果当前窗口的值大于target了，窗口就要向前移动了（也就是该缩小了）；窗口的结束位置如何移动：窗口的结束位置就是遍历数组的指针
 * 3.窗口的起始位置初始化为数组的起始位置即可
 */
var minSubArrayLen = function (target, nums) {
  const len = nums.length
  let r = 0,
    l = 0,
    optimal = len + 1, // 初始值为越界
    sum = 0
  while (r < len) {
    sum += nums[r++]
    while (sum >= target) { // 满足题目条件
      // 判断此次窗口结果是否为最优，如果是保留，不是被更优覆盖
      optimal = Math.min(optimal,r - l)
      sum -= nums[l++] // 左指针移动，并且调整起始位置，去除原指针位置对应的值

      // 如果依然满足条件 则继续执行逻辑，如果不满足，则拓展窗口，既移动右指针
    }
  }
  // 如果数据中所有中所有值加起来都不大于target 则r为越界既 optimal > len 则返回0
  return optimal > len ? 0 : optimal
};

// 最长递增子序列
// 给定一个无序的整数数组，找到其中最长上升子序列的长度。
// 示例:
// 输入: [10,9,2,5,3,7,101,18]
// 输出: 4
// 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
// 说明:
// 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
// 你算法的时间复杂度应该为 O(n2) 。
// 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
const lengthOfLIS = function (nums) {
  const len = nums.length
  if (len === 0) return 0
  let dp = new Array(len).fill(1)
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}


// 全序列
// 给定一个无重复元素的序列，返回其所有可能的全排列。
// 示例:
// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

const permute = function (nums) {
  const len = nums.length
  if (len === 0) return []
  let res = []
  const dfs = (nums, path) => {
    if (path.length === len) {
      res.push(path)
      return
    }
    for (let i = 0; i < len; i++) {
      if (path.includes(nums[i])) continue
      dfs(nums, path.concat(nums[i]))
    }
  }
  dfs(nums, [])
  return res
}
/a/
