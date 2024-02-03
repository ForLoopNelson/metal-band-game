import { fonts, firstWords, secondWords } from "../scripts/collection"

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function getRandomWord(array) {
  const randomIndex = getRandomIndex(array)
  return array[randomIndex]
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("guess-btn")
  const guessInput = document.querySelector(".guess")
  const resultMsg = document.querySelector("#guess-msg")
  const letterCorrectMsg = document.querySelector("#correct-letters") //testing
  const update = document.getElementById("update")
  const updateHighScore = document.getElementById("update-hi")
  let guesses = 5
  let score = parseInt(localStorage.getItem("score")) || 0
  let highScore = parseInt(localStorage.getItem("highScore")) || 0

  button.addEventListener("click", handleButtonClick)

  guessInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleButtonClick()
    }
  })
  function handleButtonClick() {
    if (localStorage.getItem("score") != null) {
      score = parseInt(localStorage.getItem("score")) || 0
      update.innerHTML = localStorage.getItem("score")
    }
    if (localStorage.getItem("highScore") != null) {
      highScore = parseInt(localStorage.getItem("highScore")) || 0
      updateHighScore.innerHTML = localStorage.getItem("highScore")
    }

    resultMsg.innerText = ""
    letterCorrectMsg.innerText = "" //testing
    const word = document
      .querySelector("#random-font")
      .textContent.trim()
      .toLowerCase()

    const guess = guessInput.value.trim().toLowerCase()
    console.log(guess)
    console.log(word)
    // Show correct letters and incorrect ones with _  (WIP)************************************************
    let correctLetters = ""

    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (word[i] === " ") {
        correctLetters += " "
      } else {
        correctLetters += guess.includes(char) ? char : "💥"
      }
    }

    if (correctLetters.includes("💥")) {
      letterCorrectMsg.innerText = correctLetters
    }
    // End of test section. Don't mess with other code ********************************************************************************************************************************************************************************************************************
    if (word === guess) {
      score++
      document.querySelector("#update").innerText = score
      if (score > highScore) {
        highScore = score
        updateHighScore.innerText = highScore
        localStorage.setItem("highScore", highScore)
      }
      localStorage.setItem("score", score)
      update.innerHTML = localStorage.getItem("score")
      generateNewWords()
    } else {
      resultMsg.innerText = "Not correct. Try again."
      guesses--

      setTimeout(() => {
        resultMsg.innerText = ""
      }, 15000)
      document.querySelector("#guesses-left").innerText = guesses
      if (guesses == 0) {
        resultMsg.innerText = `You've run out of guesses! The correct answer was ${word}. Use Reset Game button to start over`
      }
    }
  }

  document.querySelector("#update").innerText = score
  localStorage.setItem("score", score)

  document.querySelector(".reset-game").addEventListener("click", () => {
    score = 0
    guesses = 3
    update.innerHTML = score
    localStorage.setItem("score", score)

    generateNewWords()
  })

  function generateNewWords() {
    const newFirstWord = getRandomWord(firstWords)
    const newSecondWord = getRandomWord(secondWords)
    const newWords = `${newFirstWord} ${newSecondWord}`
    const randomFont = getRandomWord(fonts)

    // Update the content of #random-font with the new words
    document.querySelector("#random-font").textContent = newWords
    // Update the font dynamically
    document.querySelector("#random-font").style.fontFamily = randomFont
    // Reset input field and set it to empty string
    guessInput.value = ""
  }
})
