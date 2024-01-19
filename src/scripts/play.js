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
  const update = document.getElementById("update")
  let guesses = 3
  let score = 0

  button.addEventListener("click", handleButtonClick)

  guessInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleButtonClick()
    }
  })
  function handleButtonClick() {
    if (localStorage.getItem("score") != null) {
      score = localStorage.getItem("score")
      update.innerHTML = localStorage.getItem("score")
    }

    resultMsg.innerText = ""
    const word = document
      .querySelector("#random-font")
      .textContent.toLowerCase()
    const guess = guessInput.value.toLowerCase()

    if (word === guess) {
      score++
      document.querySelector("#update").innerText = score
      localStorage.setItem("score", score)
      update.innerHTML = localStorage.getItem("score")
      generateNewWords()
    } else {
      resultMsg.innerText = "Not correct. Try again."
      guesses--
      setTimeout(() => {
        resultMsg.innerText = ""
      }, 5000)
      document.querySelector("#guesses-left").innerText = guesses
      if (guesses == 0) {
        resultMsg.innerText = `You've run out of guesses! The correct answer was ${word}. Use Reset Game button to start over`
      }
    }
    document.querySelector("#update").innerText = score
    localStorage.setItem("score", score)

    document.querySelector(".reset-game").addEventListener("click", () => {
      score = 0
      guesses = 3
      localStorage.setItem("score", score)
      update.innerHTML = localStorage.getItem("score")
      location.reload()
    })
  }

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
