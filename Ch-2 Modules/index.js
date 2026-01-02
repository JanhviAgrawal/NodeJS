const { add, sub, mul } = require('./module/math');

console.log(add(10, 20));
console.log(sub(50, 20));
console.log(mul(5, 72));

const student = {
    name: "Piyush",
    age: 22,
    course: "Full Stack Development"
}
const array = [10, 20, 30, 40, 50, "Hello World", 34.91, true];

let { name, age, course } = student;

let [a, b, c, d, e, f, g, h] = array;

console.log(name);
console.log(age);
console.log(course);

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
console.log(f);
console.log(g);
console.log(h);