const getUser = () => JSON.parse(localStorage.getItem("user"));
const userId = getUser.id;
const token = `Token token="${getUser().token}"`;
let url = "https://peaceful-inlet-99002.herokuapp.com/boards";
const URL_BASE = "https://peaceful-inlet-99002.herokuapp.com/";
const btnLogout = document.querySelector("#logout");

const fetchToServer = async (enpoint, obj) => {
  const response = await fetch(enpoint, obj);
  return response;
};

const logout = async () => {
  const arrguments = {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Token token="${getUser().token}"`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetchToServer(`${URL_BASE}logout`, arrguments);
  if (response.ok) {
    window.location.href = "login.html";
  } else {
    alert("Upps!. Try Again");
  }
};

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});
