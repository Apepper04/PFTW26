// Select the empty div and assign it to a variable
const myEmptyDiv = document.querySelector('#myEmptyDiv');

// Create a new headline element
const heading = document.createElement('h2');
heading.innerHTML = 'Llamas hum when they are happy or curious.';
heading.style.cursor = 'pointer';

// Add a click event listener to the heading
heading.addEventListener('click', handleHeadingClick);

// Append the heading to the div
myEmptyDiv.appendChild(heading);

// Function to change background color on click
function handleHeadingClick() {
    document.body.style.backgroundColor = 'coral';
}