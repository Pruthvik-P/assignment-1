///const rules = document.querySelector(".rules");
//const close = document.querySelector(".close");
//const box = document.querySelector(".box");
//const choose = document.querySelectorAll(".chose");
//const main = document.querySelector(".main");
//const outcome = document.querySelector(".outcome");
//const out = document.querySelectorAll(".outcome_out");
//const win = document.querySelector(".outcome__win");
//const tex = document.querySelector(".outcome__h");
//const again = document.querySelector(".again");
//const next = document.querySelector(".next");
//const scoreNumber = document.querySelector(".com_score");
//const userScoreNumber = document.querySelector(".my_score");




const btnRules = document.querySelector(".rules");
const btnClose = document.querySelector(".close");
const modalRules = document.querySelector(".box");
const choiceButtons = document.querySelectorAll(".chose");
const mainDiv = document.querySelector(".main");
const resultsDiv = document.querySelector(".outcome");
const resultDivs = document.querySelectorAll(".outcome_out");
const resultWinner = document.querySelector(".outcome__win");
const resultText = document.querySelector(".outcome__h");
const playAgainBtn = document.querySelector(".again");
const nextBtn = document.querySelector(".next");
const scoreNumber = document.querySelector(".com_score");
const userScoreNumber = document.querySelector(".my_score");



const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
let userScore = getStoredUserScore() || 0;
let com_score = getStoredcom_score() || 0;



function getStoredUserScore() {
  return parseInt(localStorage.getItem("userScore")) || 0;
}

function getStoredcom_score() {
  return parseInt(localStorage.getItem("com_score")) || 0;
}

function storeUserScore(score) {
  localStorage.setItem("userScore", score);
}

function storecom_score(score) {
  localStorage.setItem("com_score", score);
}

function updateScoreDisplay() {
  userScoreNumber.innerText = userScore;
  scoreNumber.innerText = com_score;
}



function keepScore(point, winner) {
  if (winner === "user") {
    userScore += point;
    userScore = Math.max(userScore, 0);
    storeUserScore(userScore);
  } else if (winner === "pc") {
    com_score += point;
    com_score = Math.max(com_score, 0);
    storecom_score(com_score);
  }
  updateScoreDisplay();
}



choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}



function displayResults(results) {
  const basePath = window.location.href.replace("index.html", "");
  resultDivs.forEach((resultDiv, ex) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[ex].name}">
          <img src="${basePath}images/${results[ex].name}.png" alt="${results[ex].name}" />
        </div>
      `;
    }, ex * 100);
  });

  mainDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}





function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const pcWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerHTML = "You win<br><p class='against-pc'>Against pc</p>";
      resultDivs[0].classList.toggle("winner");
      keepScore(1, "user");
      nextBtn.classList.remove("hidden");
      positionButtonsForWin();
    } else if (pcWins) {
      resultText.innerHTML = "You lost<br><p class='against-pc'>Against pc</p>";
      resultDivs[1].classList.toggle("winner");
      keepScore(1, "pc");
      nextBtn.classList.add("hidden");
    } else {
      resultText.innerHTML = "tie up";
      playAgainBtn.textContent = "replay";
      resultDivs[0].classList.toggle("winner");
      resultDivs[0].classList.toggle("winner");
      nextBtn.classList.add("hidden");
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 100);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}



playAgainBtn.addEventListener("click", () => {
  mainDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});



function homepage() {
  window.location.href = 'index.html';
  }

function nextButton() {
  window.location.href = 'hurray.html';
}

document.querySelector('.next-btn').addEventListener('click', function() {
  nextButton();
})

document.querySelector('.play-again').addEventListener('click', function() {
  homepage();
});



btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-box");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-box");
});
updateScoreDisplay();

setTimeout(() => {
  document.body.classList.remove("page");
}, 500);



function positionButtonsForWin() {
  nextBtn.style.position = "absolute";
  nextBtn.style.bottom = "1.5rem";
  nextBtn.style.right = "2rem";
  btnRules.style.position = "absolute";
  btnRules.style.bottom = "1.5rem";
  btnRules.style.right = "9rem";
}
