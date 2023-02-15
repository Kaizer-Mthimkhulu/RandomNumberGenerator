let lottoNumbers = [];
let numbers = [];

function generate() {
  let size = parseInt(document.getElementById('length').value);
  let highestNumber = parseInt(document.getElementById('values').value);
  let output = document.getElementById('output');
  let message = document.getElementById('message');
 
  // Check for valid input
  if (isNaN(size) || isNaN(highestNumber) || size <= 0 || highestNumber <= 0) {
    message.innerHTML = "Invalid input! Please enter positive numbers only.";
    return;
  }
 
  // Generate unique random numbers
  lottoNumbers = [];
  while (lottoNumbers.length < size) {
    let randomNumber = Math.floor(Math.random() * highestNumber) + 1;
    if (!lottoNumbers.includes(randomNumber)) {
      lottoNumbers.push(randomNumber);
    }
  }
 
  // Sort the numbers in ascending order
  lottoNumbers.sort(function(a, b) {
    return a - b;
  });
 
  // Calculate the number of combinations and the probability of winning
  let combinations = factorial(highestNumber) / (factorial(highestNumber - size) * factorial(size));
  let sample = numbers.length + 1;
  let probability = (sample / combinations) * 100;
 
  // Display the results
  output.innerHTML = `<div>${lottoNumbers.join("-")}</div><div>There are ${combinations} different combinations and a ${probability.toFixed(2)}% chance for this combination to win.</div>`;
 
  // Store the combination to local storage
  numbers.push(lottoNumbers.join("-"));
  localStorage.setItem('numbers', JSON.stringify(numbers));
  let storedNumbers = JSON.parse(localStorage.getItem('numbers'));
  message.innerHTML = `<div>Stored Combinations:<br>${storedNumbers.join("<br>")}</div>`;
}

// Function to calculate the factorial
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  return num * factorial(num - 1);
}

// Clear the output and message elements
function clearOutput() {
  document.getElementById('output').innerHTML = "";
  document.getElementById('message').innerHTML = "";
}

// Remove all numbers from local storage
function clearLocalStorage() {
  localStorage.removeItem('numbers');
  numbers = [];
  clearOutput();
}
