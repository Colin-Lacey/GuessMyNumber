'use strict'

let secretNumber
let score
let highscore = 0
let won

const displayScore = function () {
  document.querySelector('.score').textContent = score
}
const displayHighscore = function () {
  document.querySelector('.highscore').textContent = highscore
}
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message
}
const changeBackgroundColor = function (color) {
  document.querySelector('body').style.backgroundColor = color
}
const guessBox = document.querySelector('.guess')
const numberBox = document.querySelector('.number')
const changeNumberWidth = function (width) {
  document.querySelector('.number').style.width = width
}

// reset will set up the whole game even at start
reset()

document.querySelector('.check').addEventListener('click', function () {
  const guess = +guessBox.value
  // check if the game is already won
  if (won) {
    displayMessage('You already won! Press "Again!" to play again')
    // check if the user entered a guess
  } else if (!guess) {
    displayMessage('No Number!')
    // check if the user has lost
  } else if (score < 2) {
    displayMessage('You lost!')
    score = 0
    displayScore()
    // check if they guessed right
    // if they did, update the game and display for the win state
  } else if (guess === secretNumber) {
    won = true
    displayMessage('Correct!')
    numberBox.textContent = secretNumber
    changeBackgroundColor('#60b347')
    changeNumberWidth('30rem')
    // when they guess right, check if the resulting score beats the highscore
    if (score > highscore) {
      highscore = score
      displayHighscore()
    }
    // at else the guess is wrong; inform user whether it's too high or too low
    // decrease the score by 1
  } else {
    displayMessage(`${guess} is too ${guess > secretNumber ? 'high' : 'low'}!`)
    decrementScore()
  }

  guessBox.value = ''
})

// when the user clicks the again button reset the game
document.querySelector('.again').addEventListener('click', function () {
  reset()
})

// resets the game's logic and the interface back to the start
// while maintaining highscore
function reset() {
  won = false
  secretNumber = Math.trunc(Math.random() * 20) + 1
  score = 20
  displayScore()
  numberBox.textContent = '?'
  changeBackgroundColor('#222')
  changeNumberWidth('15rem')
  guessBox.value = ''
  displayMessage('Start guessing...')
}

function decrementScore() {
  score -= 1
  displayScore()
}
