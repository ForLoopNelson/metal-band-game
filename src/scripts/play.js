const fonts = [
  "Onerock",
  "MaskdownOne-BWV7V",
  "DeadwaxEx",
  "Rusuck",
  "Gorezack",
]
const firstWords = [
  "Disaster",
  "Morbid",
  "Sword",
  "Pickled",
  "Carnage",
  "Brutal",
  "Doom",
  "Swell",
  "Giant",
  "Grasping",
  "Flightless",
  "Fungal",
  "Trash",
  "Spine",
  "Bruised",
  "Accordian",
  "Helmet",
  "Fragile",
  "Exiled",
  "Magic",
  "Chains",
  "Corruption",
  "Rat",
  "Infested",
  "Rotted",
  "Glowing",
  "Looking",
]
const secondWords = [
  "Fish",
  "Meal",
  "Bike",
  "Crow",
  "Pool",
  "Crank",
  "Water",
  "Fire",
  "Skull",
  "Broom",
  "Hooks",
  "Storm",
  "Flesh",
  "Nails",
  "Pocket",
  "Zebra",
  "Fatal",
  "Dirt",
  "Snail",
  "Despair",
  "Nothing",
  "Raven",
  "Frown",
  "Boom",
]

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
  let score = 0
  let guesses = 3

  button.addEventListener("click", () => {
    const word = document
      .querySelector("#random-font")
      .textContent.toLowerCase()
    const guess = guessInput.value.toLowerCase()

    if (word === guess) {
      score++
      document.querySelector("#update").innerText = score
      generateNewWords()
    } else {
      alert("That is incorrect. Try again")
      guesses--
      document.querySelector("#guesses-left").innerText = guesses
      if (guesses == 0) {
        alert(`You've run out of guesses! The correct answer was ${word}.`)
      }
    }
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
