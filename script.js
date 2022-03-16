const gameBoard = document.querySelector(".game-board");
const howToPlayBtn = document.querySelector(".how-to-play button");
const howToPlayContent = document.querySelector(".howtoplay-content-container");
const input = document.querySelector("input");
const invalidAlert = document.querySelector(".invalidword-alert");
const answersDiv = document.querySelector(".answer-grid");
const answerCorrect = document.querySelector(".success-container");
const answerWrong = document.querySelector(".fail-container");
const solutionSpan = document.querySelector(".fail span");

const answers = ["", "", "", "", "", ""];
let solution = "apple";
let attemptNumber = 0;

// const solutionReqOptions = {
//   method: "GET",
//   url: "https://random-words5.p.rapidapi.com/getRandom",
//   params: { wordLength: "5" },
//   headers: {
//     "x-rapidapi-host": "random-words5.p.rapidapi.com",
//     "x-rapidapi-key": "235a134858mshf090c59729af53ap1e1eabjsn6b31f2f933a7",
//   },
// };

// axios
//   .request(solutionReqOptions)
//   .then((response) => {
//     console.log(response.data);
//     // solution = response.data;
//     // input.addEventListener("keyup", submitAnswer);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

input.addEventListener("keyup", submitAnswer);

input.addEventListener("change", () => {
  const inputText = input.value;

  if (inputText.length !== 5) {
    input.classList.add("invalid-answer");
  } else {
    input.classList.remove("invalid-answer");
  }
});

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
  if (e.code !== "Enter") return;

  const inputText = input.value;

  if (inputText === solution && attemptNumber < 5) {
    answers[attemptNumber] = inputText.toLowerCase();
    attemptNumber++;
    updateHtml();
    checkAnswers();
    answerCorrect.classList.add("display");
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
    solutionSpan.innerHTML = solution;
    answerWrong.classList.add("display");
    input.removeEventListener("keyup", submitAnswer);
    return;
  }
}

function checkValidWord(word) {
  const isOnlyLetters = /^[a-zA-Z]+$/.test(word);
  const isFiveLetters = word.length === 5;
  return isFiveLetters && isOnlyLetters;
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
