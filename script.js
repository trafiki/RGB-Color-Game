var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var easy = document.querySelector("easy");
var hard = document.querySelector("hard");
var resetButton = document.querySelector("#reset");
var gameModes = document.querySelectorAll(".mode");

init();

function init() {
  //Add event listeners to game mode buttons to determine the number of squares to use in game.
  gameModeListeners();
  //Add event listeners to all the squares to check if user's choice is correct
  squareListeners();
  //Generate new colors, pick a new random color, change the RGB at the header to match chosen color, add colors to squares.
  reset();
}

//Add event listeners to game mode buttons to determine the number of squares to use in game.
function gameModeListeners() {
  for (var i = 0; i < gameModes.length; i++) {
    gameModes[i].addEventListener("click", function() {
      //ask why if i===0 won't work
      numSquares = (this.textContent === "EASY") ? 3 : 6;
      gameModes[0].classList.remove("selected");
      gameModes[1].classList.remove("selected");
      this.classList.add("selected");
      reset();
    });
  }
}
//Generate new colors, pick a new random color, change the RGB at the header to match chosen color, add colors to squares.
function reset() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match color
  colorDisplay.textContent = pickedColor;
  //add random colors generated to squares
  for (var i = 0; i < squares.length; i++) {
    if (i < numSquares) {
      //add initial colors to squares
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.background = "steelblue";
  message.textContent = "";
  resetButton.textContent = "NEW COLORS";
}

resetButton.addEventListener("click", function() {
  reset()
});



//Add event listeners to all the squares to check if user's choice is correct
function squareListeners() {
  for (var i = 0; i < squares.length; i++) {
    //add click listeners to squares and also write the game logic
    squares[i].addEventListener("click", function() {
      if (this.style.background !== pickedColor) {
        this.style.background = "#232323";
        message.textContent = "Try again";
      } else {
        message.textContent = "Correct!";
        changeColors(pickedColor);
        h1.style.background = pickedColor;
        resetButton.textContent = "PLAY AGAIN?";
      }
    });
  }
}

//change colors of all the squares when the right answer is selected
function changeColors(color) {
  //loop through every color in the colors array
  for (var i = 0; i < squares.length; i++) {
    //change each color to match the correct color
    squares[i].style.background = color;
  }
}

//Picks a color at random from an array of RGB colors
function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

//Generate an array of random colors(RGB)
function generateRandomColors(num) {
  var arr = [];
  //add num random colors to array
  for (var i = 0; i < num; i++) {
    arr.push("rgb(" + randomColor() + ", " + randomColor() +
      ", " + randomColor() + ")");
  }
  return arr;
}

//helps generateRandomColors() to generate a number between 0 and 255;
function randomColor() {
  return Math.floor(Math.random() * 256);
}