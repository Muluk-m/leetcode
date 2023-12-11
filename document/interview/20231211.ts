// Promise Scheduler
class Scheduler {
  queue: { resolve: (value?: unknown) => void, task: () => void }[] = []

  activeCount = 0

  concurrency = 2

  add(task) {
    return new Promise((resolve) => {
      this.queue.push({
        task,
        resolve,
      })
      this.next()
    })

  }

  async next() {
    if (this.activeCount < this.concurrency && this.queue.length) {
      const { resolve, task } = this.queue.shift()!

      this.activeCount++
      await task()
      resolve()
      this.activeCount--

      this.next()
    }
  }
}

const scheduler = new Scheduler()

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4