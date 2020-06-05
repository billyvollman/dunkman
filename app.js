let vid = document.getElementById("myVideo");
let videoSrc = document.querySelector("source")
let guessWord = document.querySelector(".word")
let letters = document.querySelectorAll(".letter")
let shots = document.querySelector(".count")
let guessWordSection = document.querySelector(".guess-word-section")
let span = document.querySelectorAll("span")

let bullsLogo = document.querySelector(".img-bull-logo")
let playAgain = document.querySelector(".play-again")


// let shotsRemaining = document.querySelector(".shots").textContent.split("")
// let shotsRemainingNum = Number(shotsRemaining[shotsRemaining.length - 1])

let count = 0
let result = ""
let videoTime = 0
let visibleLetters = []
// let teamNames = []
// let playerNames = ["Michael Jordan", "Kareem AbdulJabbar", "Carmelo Anthony", "Ray Allen", "Kobe Bryant", "Larry Bird", "Julius Erving", "Patrick Ewing", "Tim Duncan", "Kevin Durant", "Clyde Drexler", "Kevin Garnett", "Dwight Howard", "James Harden", "LeBron James", "Magic Johnson", "Karl Malone", "Reggie Miller", "Dirk Nowitzki", "Steve Nash", "Shaquille ONeal", "Hakeem Olajuwon", "Charles Barkley", "Wilt Chamberlain", "Vince Carter", "Stephen Curry", "Dominique Wilkins", "John Stockton", "John Starks", "Steve Francis", "Tracy McGrady", "Bob Cousy", "Scottie Pippen", "BJ Armstrong", "Bill Cartwright", "Horace Grant", "John Paxson", "Will Perdue", "Dennis Rodman", "Luc Longley", "Toni Kukoc", "Steve Kerr", "Ron Harper", "Phil Jackson", "Rudy Tomjanovich", "Dikembe Mutombo"]
let randomWord = ""

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

    // char === " "
    //   ? div += `<div class="guess-letter-space">${char}</div>`
    //   : div += `<div class="guess-letter-char">${char}</div>`
  })
  // guessWord.innerHTML = div
  row += '</div>'
  guessWord.innerHTML = row
}

function createGuessWord(teamsAndPlayersNames) {

  let randomNum = Math.floor(Math.random() * teamsAndPlayersNames.length - 1) + 1
  randomWord = teamsAndPlayersNames[randomNum].toUpperCase().split("")
  loadGuessWordToDom()
  console.log(randomNum)
  console.log(teamsAndPlayersNames.length)
  console.log(teamsAndPlayersNames)

}

const saveTeamsAndPlayers = (teams) => {
  let playerNames = ["Michael Jordan", "Kareem AbdulJabbar", "Carmelo Anthony", "Ray Allen", "Kobe Bryant", "Larry Bird", "Julius Erving", "Patrick Ewing", "Tim Duncan", "Kevin Durant", "Clyde Drexler", "Kevin Garnett", "Dwight Howard", "James Harden", "LeBron James", "Magic Johnson", "Karl Malone", "Reggie Miller", "Dirk Nowitzki", "Steve Nash", "Shaquille ONeal", "Hakeem Olajuwon", "Charles Barkley", "Wilt Chamberlain", "Vince Carter", "Stephen Curry", "Dominique Wilkins", "John Stockton", "John Starks", "Steve Francis", "Tracy McGrady", "Bob Cousy", "Scottie Pippen", "BJ Armstrong", "Bill Cartwright", "Horace Grant", "John Paxson", "Will Perdue", "Dennis Rodman", "Luc Longley", "Toni Kukoc", "Steve Kerr", "Ron Harper", "Phil Jackson", "Rudy Tomjanovich", "Dikembe Mutombo"]
  let teamNames = []
  teams.forEach(team => {
    if (team.full_name === "Philadelphia 76ers") {
      console.log(team.full_name)
      teamNames = [...teamNames, "Philadelphia Seventy Sixers"]
    } else {
      teamNames = [...teamNames, team.full_name]
    }
  })
  // teams.forEach(team => teamNames = [...teamNames, team])

  teamsAndPlayersNames = [...teamNames, ...playerNames]
  createGuessWord(teamsAndPlayersNames)
}

const fetchTeams = () => {
  axios.get('https://www.balldontlie.io/api/v1/teams')
    .then(response => {
      const teams = response.data.data;
      console.log(`GET list teams`, teams);
      saveTeamsAndPlayers(teams)
    })
    .catch(error => console.error(error));
  // saveTeamsAndPlayers(["San Antonio Spurs Miami Heat San Antonio Spurs Miami Heat"])
  // saveTeamsAndPlayers(["San Antonio Spurs"])
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
  guessWordSection.classList.remove("animate__animated")
  guessWordSection.classList.remove("animate__shakeX")
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

function changeColor() {
  // span.forEach(char => char.classList.toggle("black"))
  // span.forEach(char => char.style.color = "black")
  shots.classList.toggle("red")
}

function updateWord(displayChar) {
  row = '<div class="row">'

  randomWord.forEach(char => {
    if (char === " ") {
      row += `</div><div class="row"><div class="guess-letter-space">${char}</div></div><div class="row">`
    } else if (char === displayChar || visibleLetters.includes(char)) {
      // char === displayChar ? char = displayChar : char = char
      // row += `<div class="guess-letter-char"><span>${char}</span></div>`
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
  // shotsRemainingNum -= 1
  // shots.innerHTML = `Shots Remaining </br>${shotsRemainingNum.toString().padStart(2, 0)} `

  shots.textContent = (Number(shots.textContent) - 1).toString().padStart(2, 0)
  shots.classList.toggle("red")
  setTimeout(function () { changeColor(); }, 1000);

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
      guessWordSection.classList.add("animate__animated")
      guessWordSection.classList.add("animate__shakeX")
      updateShotsRemaining()
      playVid()
    }
  }
}

function mousedown(e) {
  console.log('mouse down working')
  if (!e.target.classList.contains("clicked") && result !== "blocked" && result !== "dunk" && vid.paused) {
    console.log(e.target.classList)
  }
}

function checkVidCurrentTime() {
  if (vid.currentTime > 4.4 && result === "blocked") {
    // result = "dunk"
    vid.pause();
    videoSrc.setAttribute('src', 'blocked_shot_trim.mp4')
    vid.load();
    vid.playbackRate = 0.4;
    vid.play();
    count = 0
  }
}

function newGame() {
  location.reload()
}

setInterval(function () { checkVidCurrentTime(); }, 500);


letters.forEach(letter => letter.addEventListener('click', letterClick))
letters.forEach(letter => letter.addEventListener('mousedown', mousedown))
bullsLogo.addEventListener('click', newGame)
playAgain.addEventListener('click', newGame)