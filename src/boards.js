const colors = document.querySelectorAll(".color");
colors.forEach((color) => {
  color.style.background = color.dataset.color;
  color.addEventListener("click", changeFormColor);
});

function changeFormColor() {
  const newBoardInput = document.querySelector(".new-board-input");
  newBoardInput.style.background = this.style.background;
}

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
      let destiny;
      data.forEach((element) => {
        if (!element.closed) {
          destiny = element.starred ? ".starred-boards" : ".your-boards";
          loadBoards(element, destiny);
        }
      });
    });
}

getBoards(token);

function loadBoards(data, destiny) {
  const yourBoards = document.querySelector(destiny);
  let modelType = destiny == ".your-boards" ? ".board-model" : ".starred-model";
  const boardModel = document.querySelector(modelType);
  const newBoard = boardModel.cloneNode(true);
  newBoard.dataset.id = data.id;
  newBoard.classList.remove("hidden");
  newBoard.style.background = data.color;
  newBoard.children[0].textContent = data.name;
  if (destiny == ".your-boards") {
    const btnStar = newBoard.querySelector(".board-options .icon-star");
    btnStar.addEventListener("click", starBoard);
    const btnClose = newBoard.querySelector(".board-options .icon-close");
    btnClose.addEventListener("click", closeBoard);
  } else if (destiny == ".starred-boards") {
    const btnStar = newBoard.querySelector(".board-options .icon-unstar");
    btnStar.addEventListener("click", unstarBoard);
  }

  yourBoards.append(newBoard);
}

function starBoard() {
  id = this.parentElement.parentElement.dataset.id;
  url += `/${id}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board: {
        starred: true,
      },
    }),
  };

  fetch(url, options).then(() => {
    location.reload();
  });
}

function unstarBoard() {
  id = this.parentElement.parentElement.dataset.id;
  url += `/${id}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board: {
        starred: false,
      },
    }),
  };

  fetch(url, options).then(() => {
    location.reload();
  });
}

function closeBoard() {
  id = this.parentElement.parentElement.dataset.id;
  url += `/${id}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board: {
        closed: true,
      },
    }),
  };

  fetch(url, options).then(() => {
    location.reload();
  });
}

function createBoard() {
  const formNewBoard = document.querySelector(".new-board-form");
  formNewBoard.addEventListener("submit", (event) => {
    event.preventDefault();
    const formInput = document.querySelector(".new-board-input");
    const color = window.getComputedStyle(formInput).backgroundColor;
    const name = formInput.children[0].value;
    postBoardData(color, name, userId);
  });
}

createBoard();

function postBoardData(color, name, userId) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board: {
        user_id: userId,
        name: name,
        color: color,
      },
    }),
  };

  fetch(url, options).then(() => {
    location.reload();
  });
}
