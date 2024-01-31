// 回文串
const isPalindrome = (s, left = 0, right = str.length - 1) => {
  return s === s.split('').reverse().join('');
  // while (left < right) {
  //   if (str[left] !== str[right]) {
  //     return false
  //   }
  //   right--
  //   left++
  // }

  // return true
}

// 包含子回文串
function hasPalindromeSubstr(str) {
  const len = str.length;

  // 遍历所有子串
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j <= len; j++) {
      // 获取子串
      const substr = str.slice(i, j);

      // 检查子串是否是回文
      if (isPalindrome(substr)) {
        // 如果找到了回文子串，返回 true
        return true;
      }
    }
  }
  'abcdefgopqlsjuvwxyz'
  // 如果没有找到回文子串，返回 false
  return false;
}

function hasPalindromeSubstr2(str) {
  const len = str.length;

  // 遍历所有子串
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (isPalindrome(str.slice(i, j))) {
        return true
      }
    }
  }

  // 如果没有找到回文子串，返回 false
  return false;
}

// 如果你想要优化这个算法的时间复杂度，你可以使用 Manacher's Algorithm。这是一个线性时间复杂度的算法，用于找到一个字符串中最长的回文子串。如果最长的回文子串的长度大于1，那么这个字符串就包含子回文串。
// 以下是 Manacher's Algorithm 的 JavaScript 实现：
function hasPalindromeSubstr1(s) {
  if (s === null || s.length === 0) {
    return false;
  }

  let str = '^#' + s.split('').join('#') + '#$';
  let center = 0, right = 0;
  let P = new Array(str.length).fill(0);

  for (let i = 1; i < str.length - 1; i++) {
    let mirror = 2 * center - i;

    if (right > i) {
      P[i] = Math.min(right - i, P[mirror]);
    }

    while (str[i + 1 + P[i]] === str[i - 1 - P[i]]) {
      P[i]++;
      // if(P[i]>1) return true
    }

    if (i + P[i] > right) {
      center = i;
      right = i + P[i];
    }
  }

  let maxLen = Math.max(...P);
  return maxLen > 1;
}