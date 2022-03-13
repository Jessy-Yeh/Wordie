const gameBoard = document.querySelector(".game-board");
const input = document.querySelector("input");
const btn = document.querySelector(".submit-btn");
const answersDiv = document.querySelector(".answers");

const solution = "apple";
const answers = ["", "", "", "", "", ""];
let attemptNumber = 0;

btn.addEventListener("click", submitAnswer);

input.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    submitAnswer();
  }
});

// btn.addEventListener("change", () => {
//   const inputText = input.value;
//   if () {
//     input.classList.add("invalid-answer");
//     console.log(inputText);
//   }
// });

function submitAnswer() {
  const inputText = input.value;
  if (inputText.length === 5) {
    answers[attemptNumber] = inputText;
    attemptNumber++;
    updateHtml();
    checkAnswers();
    input.value = "";
  }
}

function checkAnswers() {
  const answerRows = document.querySelectorAll(".answer");
  answers.forEach((answer, rowIndex) => {
    const answerRow = answerRows[rowIndex];
    const answerSpans = answerRow.querySelectorAll("span");
    answer.split("").forEach((letter, letterIndex) => {
      if (solution[letterIndex] === letter.toLowerCase()) {
        answerSpans[letterIndex].classList.add("green");
        return;
      }
      if (solution.includes(letter.toLowerCase())) {
        answerSpans[letterIndex].classList.add("yellow");
      }
      if (!solution.includes(letter.toLocaleLowerCase())) {
        answerSpans[letterIndex].classList.add("grey");
      }
    });
  });
}
// function checkAnswers() {
//   const answerRows = document.querySelectorAll(".answer");
//   answers.forEach((answer, rowIndex) => {
//     const answerRow = answerRows[rowIndex];
//     const answerSpans = answerRow.querySelectorAll("span");
//     answer.split("").map((letter, letterIndex) => {
//       if (letter === "A" || "P" || "L" || "E") {
//         answerSpans[letterIndex].classList.add("green");
//         console.log(answerSpans[letterIndex]);
//       }
//     });
//   });
// }

function updateHtml() {
  const htmlContent = answers
    .map(
      (answer) =>
        `<div class='answer'>${answer
          .split("")
          .map((letter) => `<span>${letter}</span>`)
          .join("")}</div>`
    )
    .join("");
  answersDiv.innerHTML = htmlContent;
}
