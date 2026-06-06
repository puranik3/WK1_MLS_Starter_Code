// Part 1 Exercises (use Copilot inline suggestions)

// Exercise 1: Comment-Driven Development
// Function to calculate the factorial of a number
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Exercise 2: Array Operations
const nums = [1, 2, 3, 4, 5];

// Filter even numbers
const evenNumbers = nums.filter(num => num % 2 === 0);

console.log(evenNumbers); // Output: [2, 4]

// Exercise 3: Function from Signature
// Type this on a new line and press Enter:
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString("Hello, World!")); // Output: !dlroW ,olleH


// Exercise 4: Process User Data
function processUserData(users) {
  if (!Array.isArray(users)) {
    throw new Error("Input must be an array");
  }
  return users
    .filter(user => {
      if (user.age === undefined || user.age === null) {
        throw new Error(`User ${user.name} is missing age property`);
      }
      return user.age >= 18;
    })
    .map(({ name, email }) => ({ name, email }));
}

const users = [
  { name: "Alice", age: 25, email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
  { name: "Charlie", age: 30, email: "charlie@example.com" }
];

try {
  console.log(processUserData(users));
} catch (error) {
  console.error(error.message);
}