import { words } from "./fiveLetterWords.js";

const howToPlayBtn = document.querySelector(".how-to-play button");
const howToPlayContent = document.querySelector(".howtoplay-content-container");
const input = document.querySelector("input");
const invalidAlert = document.querySelector(".invalidword-alert");
const answersDiv = document.querySelector(".answer-grid");
const answerCorrect = document.querySelector(".success-container");
const answerWrong = document.querySelector(".fail-container");
const solutionSpan = document.querySelector(".fail span");

const answers = ["", "", "", "", "", ""];
const solution = words[Math.floor(Math.random() * words.length)];
let attemptNumber = 0;

input.addEventListener("change", submitAnswer);

howToPlayBtn.addEventListener("click", () => {
  howToPlayContent.classList.add("display");
});

howToPlayContent.addEventListener("click", () => {
  howToPlayContent.classList.remove("display");
});

answerCorrect.addEventListener("click", () => {
  answerCorrect.classList.remove("display");
});

answerWrong.addEventListener("click", () => {
  answerWrong.classList.remove("display");
});

function submitAnswer(e) {
  const answer = e.target.value.toLowerCase();

  input.classList.remove("invalid-answer");

  if (answer.length !== 5) {
    input.classList.add("invalid-answer");
    invalidAlert.innerHTML = "Answer must have 5 letters";
    return;
  }

  if (!words.includes(answer)) {
    input.classList.add("invalid-answer");
    invalidAlert.innerHTML = "Answer is not in the word list";
    return;
  }

  answers[attemptNumber] = answer;
  attemptNumber++;
  updateHtml();
  colourAnswers();
  input.value = "";

  if (answer === solution) {
    answerCorrect.classList.add("display");
    input.removeEventListener("change", submitAnswer);
    return;
  }

  if (attemptNumber === 5) {
    solutionSpan.innerHTML = solution;
    answerWrong.classList.add("display");
    input.removeEventListener("change", submitAnswer);
  }
}

function updateHtml() {
  const htmlContent = answers
    .map(
      (answer) =>
        `<div class='answer'>${answer
          .split("")
          .map((letter) => `<span class='letter-span'>${letter}</span>`)
          .join("")}</div>`
    )
    .join("");
  answersDiv.innerHTML = htmlContent;
}

function colourAnswers() {
  const answerRows = document.querySelectorAll(".answer");

  answers.forEach((answer, rowIndex) => {
    const answerRow = answerRows[rowIndex];
    const answerSpans = answerRow.querySelectorAll(".letter-span");
    const solutionLetters = solution.split("");
    const answerLetters = answer.split("");

    answerLetters.forEach((letter, index) => {
      if (solutionLetters[index] === letter) {
        answerSpans[index].classList.add("green");
        answerLetters.splice(index, 1, "");
        solutionLetters.splice(index, 1, "");
      }
    });

    answerLetters.forEach((letter, index) => {
      if (solutionLetters.includes(letter)) {
        answerSpans[index].classList.add("yellow");
        const indexInSolution = solutionLetters.indexOf(letter);
        solutionLetters.splice(indexInSolution, 1, "");
      }
    });
  });
}
