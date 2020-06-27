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
      data.forEach((element) => {
        if (element.closed) {
          createClosedBoard(element);
        }
      });
    });
}
getBoards(token);

function createClosedBoard(data) {
  const yourBoards = document.querySelector(".closed-boards");
  const boardModel = document.querySelector(".closed-model");
  const newBoard = boardModel.cloneNode(true);
  newBoard.dataset.id = data.id;
  newBoard.classList.remove("hidden");
  newBoard.style.background = data.color;
  newBoard.children[0].textContent = data.name;
  const trashbtn = newBoard.querySelector(".board-options .icon-trash");
  const recoverbtn = newBoard.querySelector(".board-options .icon-recover");
  recoverbtn.addEventListener("click", recoverBoard);
  trashbtn.addEventListener("click", deleteBoard);
  yourBoards.append(newBoard);
}

function deleteBoard() {
  id = this.parentElement.parentElement.dataset.id;
  url += `/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  fetch(url, options).then(() => {
    location.reload();
  });
}

function recoverBoard() {
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
        closed: false,
      },
    }),
  };

  fetch(url, options).then(() => {
    location.reload();
  });
}
