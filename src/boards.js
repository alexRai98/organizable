const colors = document.querySelectorAll(".color");
colors.forEach((color) => {
  color.style.background = color.dataset.color;
});

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

function createBoard(data, destiny) {
  const yourBoards = document.querySelector(destiny);
  let modelType = destiny == ".your-boards" ? ".board-model" : ".starred-model";
  const boardModel = document.querySelector(modelType);
  const newBoard = boardModel.cloneNode(true);
  newBoard.dataset.id = data.id;
  newBoard.classList.remove("hidden");
  newBoard.style.background = data.color;
  newBoard.children[0].textContent = data.name;
  yourBoards.append(newBoard);
}

function getBoards(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const boards = fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let destiny;
      data.forEach((element) => {
        if (!element.closed) {
          destiny = element.starred ? ".starred-boards" : ".your-boards";
          createBoard(element, destiny);
        }
      });
    });
}

getBoards(token);
