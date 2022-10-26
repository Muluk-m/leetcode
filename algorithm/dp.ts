/**
 * 动态规划
 * 最长回文串
 */

// 1. 最长回文串
const str = "abababadsdab";

const dp = (s) => {
  const len = s.length;
  if (len < 2) return s;

  const d = Array.from({ length: len }, () => new Array(len).fill(false));

  let res = "";

  for (let i = len - 1; i >= 0; i--)
    for (let j = i; j < len; j++) {
      // d[i][j]表示子串i～j是否是回文子串
      // 回文子串必须满足s[i]，s[j]相等。并且向外扩展一个字符也相等，即d[i + 1][j - 1]也是回文子串
      // j - i < 2表示子串小于等于1也是回文串
      d[i][j] = s[i] === s[j] && (j - i < 2 || d[i + 1][j - 1]);

      if (d[i][j] && j - i + 1 > res.length) {
        // 当前回文子串比之前的大，更新最大长度
        res = s.substring(i, j + 1);
      }
    }

  return res;
};

console.log(dp(str));
