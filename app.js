var vid = document.getElementById("myVideo");
let videoSrc = document.querySelector("source")
let guessWord = document.querySelector(".word")
let letters = document.querySelectorAll(".letter")
let shots = document.getElementById("shots")
let shotsRemaining = document.getElementById("shots").textContent.split("")
let shotsRemainingNum = Number(shotsRemaining[shotsRemaining.length - 1])

let count = 0
let result = "dunk"
let randomWord = "Michael Jordan".toUpperCase().split("")
let videoTime = 0

// Filtering random word to remove duplicate letters.  Will use later to check length against visible letters array to find winner
let uniqueRandomWord = [...new Set(randomWord)]
let randomWordFiltered = randomWord.filter((v, i) => randomWord.indexOf(v) === i)
let uniqueRandomWordNoEmptyChar = uniqueRandomWord.filter(char => char !== " ")
let randomWordFilteredNoEmptyChar = randomWordFiltered.filter(char => char !== " ")

let visibleLetters = []
// let div = ''
let row = '<div class="row">'

randomWord.forEach(char => {
  if (char === " ") {
    row += `</div><div class="row"><div class="guess-letter-space">${char}</div></div><div class="row">`
  } else {
    char = ''
    row += `<div class="guess-letter-char">${char}</div>`
  }

  // char === " "
  //   ? div += `<div class="guess-letter-space">${char}</div>`
  //   : div += `<div class="guess-letter-char">${char}</div>`
})
// guessWord.innerHTML = div
row += '</div>'
guessWord.innerHTML = row

function winner() {
  vid.playbackRate = 0.3;
  vid.currentTime = 4.4
  vid.play()
}

function pauseVid() {
  vid.pause();
  console.log(vid.currentTime)
  videoTime = vid.currentTime
}

// function checkResult() {
//   if (result === "blocked") {
//     console.log('blocked')
//   }
// }

function playVid() {

  if (result === "blocked") {
    console.log('blocked')
    videoSrc.setAttribute('src', 'jordandunks_trim.mp4')
    vid.load();
    vid.currentTime = videoTime
    vid.playbackRate = 0.4;
    vid.play()
  } else {
    count++
    vid.playbackRate = 0.75;
    if (count > 6) {
      vid.play();
      count = 0
      setTimeout(function () { winner(); }, 3000);
    } else {
      vid.play();
      setTimeout(function () { pauseVid(); }, 1000);
    }
  }
}

function checkForWin() {
  if (visibleLetters.length === uniqueRandomWordNoEmptyChar.length) {
    console.log("winner")
    return "blocked"
  } else {
    return "dunk"
  }
}

function updateWord(displayChar) {
  row = '<div class="row">'

  randomWord.forEach(char => {
    if (char === " ") {
      row += `</div><div class="row"><div class="guess-letter-space">${char}</div></div><div class="row">`
    } else if (char === displayChar || visibleLetters.includes(char)) {
      char === displayChar ? char = displayChar : char = char
      row += `<div class="guess-letter-char">${char}</div>`
    } else {
      char = ''
      row += `<div class="guess-letter-char">${char}</div>`
    }
  })

  row += '</div>'
  guessWord.innerHTML = row
}

function isLetterInWord(char) {
  if (randomWord.includes(char)) {
    updateWord(char)
    return randomWord.includes(char)
  } else {
    return randomWord.includes(char)
  }
}

function updateShotsRemaining() {
  shotsRemainingNum -= 1
  shots.innerHTML = `Shots Remaining </br>${shotsRemainingNum} `
}

function letterClick(e) {
  e.target.classList.toggle("clicked")
  let character = e.target.textContent
  if (isLetterInWord(character)) {
    visibleLetters = [...visibleLetters, character]
    result = checkForWin()
    console.log(result)
    if (result === "blocked") {
      playVid()
    }
  } else {
    updateShotsRemaining()
    playVid()
  }
}

function checkVidCurrentTime() {
  if (vid.currentTime > 4.5 && result === "blocked") {
    result = "dunk"
    vid.pause();
    videoSrc.setAttribute('src', 'blocked_shot_trim.mp4')
    vid.load();
    vid.playbackRate = 0.4;
    vid.play();
    count = 0
  }
}

setInterval(function () { checkVidCurrentTime(); }, 500);

letters.forEach(letter => letter.addEventListener('click', letterClick))