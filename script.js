const gameBoard = document.querySelector(".game-board");
const input = document.querySelector("input");
const btn = document.querySelector(".submit-btn");

btn.addEventListener("click", () => {
  const inputText = input.value;
  // create string for html for div with content inputText
  const string = `<div>${inputText}</div>`;
  // insert this html string onto the page using insertAdjacentHtml
  btn.insertAdjacentHTML("afterend", string);
  // empty the input
  input.value = "";
});
