// Promise Scheduler
class Scheduler {
  queue: ((...arg: any[]) => any)[] = []

  activeCount = 0

  concurrency = 2

  add(task) {
    return new Promise((resolve) => {
      this.queue.push(this.run.bind(this, task, resolve))
      this.next()
    })
  }

  async run(task, resolve) {
    this.activeCount++
    resolve(await task())
    this.activeCount--
    this.next()
  }

  next() {
    if (this.activeCount < this.concurrency && this.queue.length) {
      this.queue.shift()?.()
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