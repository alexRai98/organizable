function setColors() {
  const colors = document.querySelectorAll(".color");
  colors.forEach((color) => {
    color.style.background = color.dataset.color;
  });
}

setColors();

const btnNewBoard = document.querySelector(".btn-newBoard");
btnNewBoard.addEventListener("click", openNewBoardForm);

function openNewBoardForm() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("hidden");
}

const btnCloseForm = document.querySelector(".btn-closeForm");
btnCloseForm.addEventListener("click", closeNewBoardForm);

function closeNewBoardForm() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.add("hidden");
}

const iconStar = document.querySelectorAll(".icon-star");
iconStar.forEach((star) => star.addEventListener("click", starBoard));

function starBoard() {
  const starredBoards = document.querySelector(".starred-boards");
  const board = this.parentElement.parentElement;
  const starredBoard = board.cloneNode(true);
  const boardOptions = starredBoard.querySelector(".board-options");
  const deleteIcon = boardOptions.children[0];
  const starIcon = boardOptions.children[1];
  deleteIcon.classList.add("hidden");
  starIcon.addEventListener("click", unstarBoard);
  starredBoards.append(starredBoard);
  board.remove();
}
function unstarBoard() {
  const yourBoards = document.querySelector(".your-boards");
  const board = this.parentElement.parentElement;
  const simpleBoard = board.cloneNode(true);
  const boardOptions = simpleBoard.querySelector(".board-options");
  const closeIcon = boardOptions.children[0];
  const starIcon = boardOptions.children[1];
  closeIcon.classList.remove("hidden");
  starIcon.addEventListener("click", starBoard);
  yourBoards.append(simpleBoard);
  board.remove();
}
