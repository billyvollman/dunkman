let vid = document.getElementById("myVideo");
let videoSrc = document.querySelector("source")
let guessWord = document.querySelector(".word")
let letters = document.querySelectorAll(".letter")
let shots = document.getElementById("shots")
let shotsRemaining = document.getElementById("shots").textContent.split("")
let shotsRemainingNum = Number(shotsRemaining[shotsRemaining.length - 1])

let count = 0
let result = ""
let videoTime = 0
let visibleLetters = []
let teamNames = []
let randomWord = ""

function loadGuessWordToDom() {
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
}

function createGuessWord() {
  let randomNum = Math.floor(Math.random() * teamNames.length - 1) + 1
  randomWord = teamNames[randomNum].toUpperCase().split("")
  loadGuessWordToDom()
}

const saveTeams = (teams) => {
  teams.forEach(team => teamNames = [...teamNames, team.full_name])
  // teams.forEach(team => teamNames = [...teamNames, team])
  createGuessWord()
}

const fetchTeams = () => {
  axios.get('https://www.balldontlie.io/api/v1/teams')
    .then(response => {
      const teams = response.data.data;
      console.log(`GET list teams`, teams);
      saveTeams(teams)
    })
    .catch(error => console.error(error));
  // saveTeams(["San Antonio Spurs Miami Heat San Antonio Spurs Miami Heat"])
};

fetchTeams();


// const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)


// let randomNum = Math.floor(Math.random() * teamNames.length - 1) + 1
// console.log(randomNum)
// console.log(teamNames[randomNum])
// let randomWord = teamNames[randomNum].toUpperCase().split("")


// Filtering random word to remove duplicate letters.  Will use later to check length against visible letters array to find winner
// let uniqueRandomWord = [...new Set(randomWord)]
// let randomWordFiltered = randomWord.filter((v, i) => randomWord.indexOf(v) === i)
// let uniqueRandomWordNoEmptyChar = uniqueRandomWord.filter(char => char !== " ")
// let randomWordFilteredNoEmptyChar = randomWordFiltered.filter(char => char !== " ")


// let div = ''
// let row = '<div class="row">'

// randomWord.forEach(char => {
//   if (char === " ") {
//     row += `</div><div class="row"><div class="guess-letter-space">${char}</div></div><div class="row">`
//   } else {
//     char = ''
//     row += `<div class="guess-letter-char">${char}</div>`
//   }

//   // char === " "
//   //   ? div += `<div class="guess-letter-space">${char}</div>`
//   //   : div += `<div class="guess-letter-char">${char}</div>`
// })
// // guessWord.innerHTML = div
// row += '</div>'
// guessWord.innerHTML = row


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

function playVid() {
  if (result === "blocked") {
    console.log('blocked')
    videoSrc.setAttribute('src', 'jordandunks_trim.mp4')
    // vid.load();
    vid.currentTime = videoTime
    vid.playbackRate = 0.75;
    vid.play()
  } else {
    count++
    vid.playbackRate = 0.75;
    if (count > 6) {
      result = "dunk"
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
  // Filtering random word to remove duplicate letters.  When you click letter button it adds the letter only once to the visible letters array.  If random word is not filtered to remove duplicates the lengths will always be different.
  let uniqueRandomWord = [...new Set(randomWord)]
  let randomWordFiltered = randomWord.filter((v, i) => randomWord.indexOf(v) === i)
  let uniqueRandomWordNoEmptyChar = uniqueRandomWord.filter(char => char !== " ")
  let randomWordFilteredNoEmptyChar = randomWordFiltered.filter(char => char !== " ")
  if (visibleLetters.length === uniqueRandomWordNoEmptyChar.length) {
    console.log("winner")
    return "blocked"
  } else {
    return ""
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
  if (!e.target.classList.contains("clicked") && result !== "blocked" && result !== "dunk" && vid.paused) {
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
}

function checkVidCurrentTime() {
  if (vid.currentTime > 4.5 && result === "blocked") {
    // result = "dunk"
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
