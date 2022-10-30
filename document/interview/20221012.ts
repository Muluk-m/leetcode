// 1. BCE
// 2. a 先执行、b，c并发，随后打印 done
const randomTime = () => Math.random() * 1000;

const a = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(console.log("a"));
    }, randomTime())
  );
};
const b = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(console.log("b"));
    }, randomTime())
  );
};
const c = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(console.log("c"));
    }, randomTime())
  );
};

async function main() {
  await a();
  await Promise.allSettled([b(), c()]);
  console.log("done");
}

// 3.
for (let a = 0; a < 10; a++) console.log(a);

// 4.
const intersection = (a: any[], b: any[]) => {
  let result: any[] = [];

  for (const [_, value] of a.entries())
    if (b.includes(value)) result.push(value);

  return result;
};

const union = (a: any[], b: any[]) => [...new Set([...a, ...b])];

// 6.
function Vue(config: any) {}

let vm = new Vue({
  data: { a: 1 },
  computed: {
    b: {
      get() {
        return this.a;
      },
      set(newValue) {
        this.a = newValue;
      },
    },
  },
});

vm.b = 5;

// 8.
