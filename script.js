const gameBoard = document.querySelector(".game-board");
const input = document.querySelector("input");
const btn = document.querySelector(".submit-btn");
const answersDiv = document.querySelector(".answers");
const answerCorrect = document.querySelector(".correct");
const answerWrong = document.querySelector(".wrong");
const answerWrongSpan = document.querySelector(".wrong span");
const invalidGuess = document.querySelector(".invalidword-alert");
const howToPlay = document.querySelector(".how-to-play");
const instructions = document.querySelector(".instructions-content-container");

const answers = ["", "", "", "", "", ""];
let solution = "apple";
let attemptNumber = 0;

const solutionReqOptions = {
  method: "GET",
  url: "https://random-words5.p.rapidapi.com/getRandom",
  params: { wordLength: "5" },
  headers: {
    "x-rapidapi-host": "random-words5.p.rapidapi.com",
    "x-rapidapi-key": "235a134858mshf090c59729af53ap1e1eabjsn6b31f2f933a7",
  },
};

input.addEventListener("keyup", submitAnswer);

axios
  .request(solutionReqOptions)
  .then((response) => {
    console.log(response.data);
    // solution = response.data;
    // btn.addEventListener("click", submitAnswer);
    // input.addEventListener("keyup", submitAnswer);
  })
  .catch((error) => {
    console.error(error);
  });

input.addEventListener("change", () => {
  const inputText = input.value;
  if (inputText.length !== 5) {
    input.classList.add("invalid-answer");
    invalidGuess.classList.add("activate");
  } else {
    input.classList.remove("invalid-answer");
    invalidGuess.classList.remove("activate");
  }
});

howToPlay.addEventListener("click", () => {
  instructions.classList.add("display");
});
instructions.addEventListener("click", () => {
  instructions.classList.remove("display");
});

function submitAnswer(e) {
  if (e.code && e.code !== "Enter") return;

  const inputText = input.value;

  if (inputText === solution && attemptNumber < 5) {
    answers[attemptNumber] = inputText.toLowerCase();
    attemptNumber++;
    updateHtml();
    checkAnswers();
    answerCorrect.classList.add("display");
    // btn.removeEventListener("click", submitAnswer);
    input.removeEventListener("keyup", submitAnswer);
    return;
  }

  if (checkValidWord(inputText) && attemptNumber < 5) {
    answers[attemptNumber] = inputText.toLowerCase();
    attemptNumber++;
    updateHtml();
    checkAnswers();
    input.value = "";
  }

  if (
    checkValidWord(inputText) &&
    attemptNumber === 5 &&
    inputText !== solution
  ) {
    answerWrongSpan.innerHTML = solution;
    answerWrong.classList.add("display");
    // btn.removeEventListener("click", submitAnswer);
    input.removeEventListener("keyup", submitAnswer);
    return;
  }
}

answerCorrect.addEventListener("click", () => {
  answerCorrect.classList.remove("display");
});
answerWrong.addEventListener("click", () => {
  answerWrong.classList.remove("display");
});

function checkValidWord(word) {
  const isOnlyLetters = /^[a-zA-Z]+$/.test(word);
  const isFiveLetters = word.length === 5;
  return isFiveLetters && isOnlyLetters;
}

function checkAnswers() {
  const answerRows = document.querySelectorAll(".answer");

  answers.forEach((answer, rowIndex) => {
    const answerRow = answerRows[rowIndex];
    const answerSpans = answerRow.querySelectorAll(".letter-span");
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
          .map((letter) => `<span class='letter-span'>${letter}</span>`)
          .join("")}</div>`
    )
    .join("");
  answersDiv.innerHTML = htmlContent;
}
