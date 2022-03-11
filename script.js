const gameBoard = document.querySelector(".game-board");
const input = document.querySelector("input");
const btn = document.querySelector(".submit-btn");
const answersDiv = document.querySelector(".answers");

console.log(answersDiv);

const solution = "apple";
const answers = ["", "", "", "", "", ""];
let attemptNumber = 0;

btn.addEventListener("click", () => {
  const inputText = input.value;
  // if inputText is 5 characters long
  answers[attemptNumber] = inputText;

  console.log(answers);

  attemptNumber++;
  updateHtml();
  input.value = "";
  // end if
});

function updateHtml() {
  const htmlContent = answers.map((answer) => `<div>${answer}</div>`).join("");
  answersDiv.innerHTML = htmlContent.toUpperCase();
}
