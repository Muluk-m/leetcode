function a(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}
function b() { }
b.prototype = {
  methods: function() {
    return this.x + this.y + this.z
  }
}
a.prototype = new b()
var c = new a(2,2,2)
console.log(c.hasOwnProperty('method1'))
console.log(c.hasOwnProperty('x'))

