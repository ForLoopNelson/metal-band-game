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
    const normalizedGuess = guess.padEnd(word.length, " ").slice(0, word.length)
    console.log("Normalized Guess:", normalizedGuess)
    console.log("Word:", word)

    // Show correct letters and incorrect ones with _ code looks correct but sometimes it shows incorrectly (WIP)************************************************
    let correctLetters = ""

    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      const guessedChar = normalizedGuess[i]
      correctLetters += char === " " ? " " : guessedChar === char ? char : "💥"
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
    generateNewGame()
  })

  function generateNewWords() {
    const newFirstWord = getRandomWord(firstWords)
    const newSecondWord = getRandomWord(secondWords)
    const newWords = `${newFirstWord} ${newSecondWord}`
    const randomFont = getRandomWord(fonts)

    // Update the content of #random-font with the new words
    const randomFontElement = document.querySelector("#random-font")
    randomFontElement.textContent = newWords

    // Dynamically update CSS variables for the font family and size
    const root = document.documentElement
    root.style.setProperty("--selectedFont", randomFont)
    root.style.setProperty(
      "--selectedFontSize",
      randomFont === "CronicleDemo" ? "2.5rem" : randomFont ===  "Snaokesur-Regular"
 ? "5rem"  : "4rem"
    )

    // Apply the font family
   randomFontElement.style.fontFamily = randomFont

    
    // Reset input field and set it to empty string
    guessInput.value = ""
    // Ensure font is applied correctly
    requestAnimationFrame(() => {
        console.log(
            "Applied Font (after render):",
            getComputedStyle(randomFontElement).fontFamily
        );
        console.log(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--selectedFontSize"
      )
    )
    });
    
  }
  function generateNewGame() {
    console.log("Generating new game...")
    document.querySelector("#update").innerText = score
    document.querySelector("#guesses-left").innerText = guesses
    score = 0
    guesses = 5
    localStorage.setItem("score", score)
    console.log("Score:", score, "Guesses:", guesses)
    resultMsg.innerText = " "
    letterCorrectMsg.innerText = ""

    // Update elements on the screen
    updateScoreElement()
    updateGuessesElement()

    // Generate new words
    generateNewWords()
  }

  function updateScoreElement() {
    document.querySelector("#update").innerText = score
  }

  function updateGuessesElement() {
    document.querySelector("#guesses-left").innerText = guesses
  }
})
