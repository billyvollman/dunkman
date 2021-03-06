let vid = document.getElementById("myVideo");
let videoSrc = document.querySelector("source")
let guessWord = document.querySelector(".word")
let letters = document.querySelectorAll(".letter")
let shots = document.querySelector(".count")
let guessWordSection = document.querySelector(".guess-word-section")
let span = document.querySelectorAll("span")
let dunkedOn = document.querySelector(".got-dunked-on")
let dunkBlocked = document.querySelector(".dunk-block")
let bullsLogo = document.querySelector(".img-bull-logo")
let playAgain = document.querySelector(".play-again")

let count = 0
let dunkCount = 0
let blockCount = 0
let result = ""
let videoTime = 0
let visibleLetters = []
let randomWord = ""
let prevRandomWords = []

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var modalBtn = document.querySelector(".rules");

// Get the <span> element that closes the modal
var closeModal = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
modalBtn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function loadGuessWordToDom() {
  let row = '<div class="row">'

  randomWord.forEach(char => {
    if (char === " ") {
      row += `</div><div class="row"><div class="guess-letter-space">${char}</div></div><div class="row">`
    } else {
      char = ''
      row += `<div class="guess-letter-char">${char}</div>`
    }
  })
  row += '</div>'
  guessWord.innerHTML = row
}

function createGuessWord(teamsAndPlayersNamesArr) {

  let randomNum = Math.floor(Math.random() * teamsAndPlayersNamesArr.length - 1) + 1
  randomWord = teamsAndPlayersNamesArr[randomNum].toUpperCase().split("")
  loadGuessWordToDom()
}

const teamNamesIfApiFail = () => {
  let teamNamesManual = [
    "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"
  ]
  return teamNamesManual
}

const saveTeamsAndPlayers = (teams) => {
  let playerNames = ["Michael Jordan", "Kareem AbdulJabbar", "Carmelo Anthony", "Ray Allen", "Kobe Bryant", "Larry Bird", "Julius Erving", "Patrick Ewing", "Tim Duncan", "Kevin Durant", "Clyde Drexler", "Kevin Garnett", "Dwight Howard", "James Harden", "LeBron James", "Magic Johnson", "Karl Malone", "Reggie Miller", "Dirk Nowitzki", "Steve Nash", "Shaquille ONeal", "Hakeem Olajuwon", "Charles Barkley", "Wilt Chamberlain", "Vince Carter", "Stephen Curry", "Dominique Wilkins", "John Stockton", "John Starks", "Steve Francis", "Tracy McGrady", "Bob Cousy", "Scottie Pippen", "BJ Armstrong", "Bill Cartwright", "Horace Grant", "John Paxson", "Will Perdue", "Dennis Rodman", "Luc Longley", "Toni Kukoc", "Steve Kerr", "Ron Harper", "Phil Jackson", "Rudy Tomjanovich", "Dikembe Mutombo"]
  let teamNames = []
  teams.forEach(team => {
    if (team.full_name) {
      if (team.full_name === "Philadelphia 76ers") {
        teamNames = [...teamNames, "Philadelphia Seventy Sixers"]
      } else {
        teamNames = [...teamNames, team.full_name]
      }
    } else {
      if (team === "Philadelphia 76ers") {
        teamNames = [...teamNames, "Philadelphia Seventy Sixers"]
      } else {
        teamNames = [...teamNames, team]
      }
    }
  })
  // teams.forEach(team => teamNames = [...teamNames, team])

  teamsAndPlayersNames = [...teamNames, ...playerNames]
  let teamsAndPlayersNamesNotSeenBefore = []

  if (prevRandomWords.length < teamsAndPlayersNames.length) {
    teamsAndPlayersNames.forEach(str => {
      if (!prevRandomWords.includes(str.toUpperCase())) {
        teamsAndPlayersNamesNotSeenBefore = [...teamsAndPlayersNamesNotSeenBefore, str]
      }
    })
    createGuessWord(teamsAndPlayersNamesNotSeenBefore)
  } else {
    createGuessWord(teamsAndPlayersNames)
  }
}

const fetchTeams = () => {
  axios.get('https://cors-anywhere.herokuapp.com/https://www.balldontlie.io/api/v1/teams')
    .then(response => {
      const teams = response.data.data;
      saveTeamsAndPlayers(teams)
    })
    .catch(error => {
      console.error(error)
      saveTeamsAndPlayers(teamNamesIfApiFail())
    });
  // saveTeamsAndPlayers(["San Antonio Spurs Miami Heat San Antonio Spurs Miami Heat"])
  // saveTeamsAndPlayers(["San Antonio Spurs"])
};

fetchTeams();

function turnOnPlayAgainBtn() {
  bullsLogo.style.filter = "unset"
  playAgain.style.color = "black"
  playAgain.classList.toggle("heartbeat")
}

function dunk() {
  dunkCount++
  vid.currentTime = 4.4
  vid.playbackRate = 0.3;
  vid.style.opacity = 0.35
  vid.play()
  dunkedOn.style.display = 'unset'
  turnOnPlayAgainBtn()
}

function block() {
  vid.poster = "jordan_vid_poster.jpg"
  blockCount++
  vid.currentTime = 0
  vid.playbackRate = 0.3;
  vid.style.opacity = 0.35
  vid.play()
  dunkBlocked.style.display = 'unset'
  turnOnPlayAgainBtn()
}

function pauseVid() {
  guessWordSection.classList.remove("animate__animated")
  guessWordSection.classList.remove("animate__shakeX")
  vid.pause();
  videoTime = vid.currentTime
}

function playVid() {
  if (result === "dunk") {
    vid.playbackRate = 0.7
    vid.play()
    count = 0
  } else {
    count++
    vid.playbackRate = 0.7;
    if (count > 6) {
      result = "blocked"
      vid.poster = "block_vid_poster.jpg"
      vid.play();
      count = 0
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
    return "dunk"
  } else {
    return ""
  }
}

function changeColor() {
  shots.classList.toggle("red")
  if (shots.textContent === "00") {
    updateWord()
  }
}

function updateWord(displayChar) {
  row = '<div class="row">'

  if (shots.textContent === "00") {
    randomWord.forEach(char => {
      if (char === " ") {
        row += `</div><div class="row"><div class="guess-letter-space">${char}</div></div><div class="row">`
      } else {
        char = char
        row += `<div class="guess-letter-char"><span>${char}</span></div>`
      }
    })

  } else {
    randomWord.forEach(char => {
      if (char === " ") {
        row += `</div><div class="row"><div class="guess-letter-space">${char}</div></div><div class="row">`
      } else if (char === displayChar || visibleLetters.includes(char)) {
        if (char === displayChar) {
          char = displayChar
          row += `<div class="guess-letter-char"><span>${char}</span></div>`
        } else {
          row += `<div class="guess-letter-char">${char}</div>`
        }
      } else {
        char = ''
        row += `<div class="guess-letter-char">${char}</div>`
      }
    })

  }

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
  shots.textContent = (Number(shots.textContent) - 1).toString().padStart(2, 0)
  shots.classList.toggle("red")
  setTimeout(function () { changeColor(); }, 1000);
}

function letterPressed(e) {
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && playAgain.classList.contains("heartbeat")) {
    newGame()
  }

  letters.forEach(letter => {
    if (e.code.split('Key')[1] === letter.textContent) {
      if (!letter.classList.contains("clicked") && result !== "blocked" && result !== "dunk" && vid.paused) {
        letter.classList.toggle("clicked")
        if (isLetterInWord(letter.textContent)) {
          visibleLetters = [...visibleLetters, letter.textContent]
          result = checkForWin()
          if (result === "dunk") {
            playVid()
          }
        } else {
          guessWordSection.classList.add("animate__animated")
          guessWordSection.classList.add("animate__shakeX")
          updateShotsRemaining()
          playVid()
        }
      }
    }
  })

}

function letterClick(e) {
  let character = e.target.textContent
  if (!e.target.classList.contains("clicked") && result !== "blocked" && result !== "dunk" && vid.paused) {
    e.target.classList.toggle("clicked")
    if (isLetterInWord(character)) {
      visibleLetters = [...visibleLetters, character]
      result = checkForWin()
      if (result === "dunk") {
        playVid()
      }
    } else {
      guessWordSection.classList.add("animate__animated")
      guessWordSection.classList.add("animate__shakeX")
      updateShotsRemaining()
      playVid()
    }
  }
}

function checkVidCurrentTime() {
  if (vid.currentTime > 4.4 && result === "blocked") {
    vid.pause();
    videoSrc.setAttribute('src', 'blocked_shot_trim.mp4')
    vid.load();
    vid.playbackRate = 0.4;
    vid.play();
    count = 0
    setTimeout(function () { block(); }, 3500);
  }

  if (vid.currentTime > 6.25 && result === "dunk" && dunkCount === 0) {
    dunk()
  }
}

function newGame() {
  if (dunkCount > 0 || blockCount > 0) {
    playAgain.classList.toggle("heartbeat")
    guessWordSection.classList.remove("animate__animated")
    guessWordSection.classList.remove("animate__shakeX")
    bullsLogo.style.filter = "grayscale(1) brightness(2.5)"
    playAgain.style.color = "#7b7b7b"
    prevRandomWords = [...prevRandomWords, randomWord.join("")]
    letters.forEach(letter => {
      if (letter.outerHTML.includes("clicked")) {
        letter.classList.toggle("clicked")
      }
    })
    shots.textContent = "07"
    fetchTeams()
    result = ""
    dunkCount = 0
    blockCount = 0
    visibleLetters = []
    videoSrc.setAttribute('src', 'jordandunks_trim_edit.mp4')
    vid.currentTime = 0
    vid.load();
    vid.style.opacity = 1
    dunkedOn.style.display = 'none'
    dunkBlocked.style.display = 'none'
  }
}

setInterval(function () { checkVidCurrentTime(); }, 500);


letters.forEach(letter => letter.addEventListener('click', letterClick))
window.addEventListener('keydown', letterPressed);
playAgain.addEventListener('click', newGame)