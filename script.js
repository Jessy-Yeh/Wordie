const gameBoard = document.querySelector(".game-board");
const input = document.querySelector("input");
const btn = document.querySelector(".submit-btn");
const answersDiv = document.querySelector(".answers");

const answers = ["", "", "", "", "", ""];
let solution = "";
let attemptNumber = 0;

const options = {
  method: "GET",
  url: "https://random-words5.p.rapidapi.com/getRandom",
  params: { wordLength: "5" },
  headers: {
    "x-rapidapi-host": "random-words5.p.rapidapi.com",
    "x-rapidapi-key": "235a134858mshf090c59729af53ap1e1eabjsn6b31f2f933a7",
  },
};

axios
  .request(options)
  .then((response) => {
    solution = response.data;
    btn.addEventListener("click", submitAnswer);

    input.addEventListener("keyup", (e) => {
      if (e.code === "Enter") {
        submitAnswer();
      }
    });
  })
  .catch((error) => {
    console.error(error);
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
  if (checkValidWord(inputText)) {
    answers[attemptNumber] = inputText.toLowerCase();
    attemptNumber++;
    updateHtml();
    checkAnswers();
    input.value = "";
  }
}

function checkValidWord(word) {
  return word.length === 5;
}

function checkAnswers() {
  const answerRows = document.querySelectorAll(".answer");

  answers.forEach((answer, rowIndex) => {
    const answerRow = answerRows[rowIndex];
    const answerSpans = answerRow.querySelectorAll("span");
    const solutionLetters = [...solution];
    const answerLetters = answer.split("");

    answerLetters.forEach((letter, index) => {
      if (solutionLetters[index] === letter) {
        answerSpans[index].classList.add("green");
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
