// 随机时间返回随机数字
function fetchRandomNum(url: string, t: number) {
  return new Promise<[string, number]>((resolve) => {
    const time = ~~(t * 1000)
    setTimeout(() => {
      resolve([url, time])
    }, time)
  })
}

function scheduler(promise) {
  const queue: (() => void)[] = []
  const maxConcurrency = 5
  let count = 0

  const next = async () => {
    if (queue.length && count <= maxConcurrency) {
      count++
      await queue.shift()!()
      count--
    }
  }

  return new Promise((resolve) => {
    queue.push(() => resolve(promise()))

    next()
  })

}

// 并发调度
async function batchFetch(urlList: number[]) {
  Promise.all(
    urlList.map(
      (url) => scheduler(
        async () => {
          const res = await fetchRandomNum(url + '', url)
          console.log(res)
        }
      )
    )
  )
}

// batchFetch([3, 2, 2, 2, 2, 4, 2, 2, 2, 3, 3, 7])

// sum(1)(2).count() -> 3
// sum(1)(2)(5,6).count() -> 14

let count = 0

interface sum {
  count
}

function sum(...args: number[]) {
  count += args.reduce((a, b) => a + b, 0)

  const count = function () {
    return count
  }

  return sum
}



console.log(sum(1)(2).count())
console.log(sum(1)(2)(5, 6).count())