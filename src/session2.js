const btnLogout = document.querySelector('#logout');
const URL_BASE ="https://peaceful-inlet-99002.herokuapp.com/";
const inputs = document.getElementsByTagName("input");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");
const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");
const formButtons = document.querySelectorAll(".form-buttons__edit");

const getUser =()=> JSON.parse(localStorage.getItem('user'));

const fetchToServer = async(enpoint,obj)=>{
    const response = await fetch(enpoint,obj);
    return response;
}

const logout =async()=>{
    const arrguments={
        method: 'POST',
        mode: 'cors',
        headers:{
            'Authorization': `Token token="${getUser().token}"`,
            'Content-Type': "application/json",
        }
    }

    const response = await fetchToServer(`${URL_BASE}logout`,arrguments);
    if(response.ok){
        window.location.href = "login.html";
    }else{
        alert("Upps!. Try Again");
    }
}

btnLogout.addEventListener('click',(e)=>{
    e.preventDefault();
    logout();
})

const loadInputs = ()=>{
    for(let input in inputs){
        const name = inputs[input].name
        inputs[input].value= getUser()[name];
    }
}

loadInputs();

btnEdit.addEventListener('click',(e)=>{
    e.preventDefault();
    formButtons[0].classList.add("hidden");
    formButtons[1].classList.remove("hidden");
});

const editUser = async()=>{
    const arrguments={
        method: 'PATCH',
        mode: 'cors',
        body:JSON.stringify({
            "user": {
                "username": inputs.username.value,
                "email": inputs.email.value,
                "first_name": inputs.firstName.value,
                "last_name": inputs.lastName.value
            }
        }),
        headers:{
            'Authorization': `Token token="${getUser().token}"`,
            'Content-Type': "application/json",
        }
    }

    const response = await fetchToServer(`${URL_BASE}users/${getUser().id}`,arrguments);
    const userData = await response.json();
    if(response.ok){
        alert("Update success")
        localStorage.setItem("user",JSON.stringify(userData));
        loadInputs();
    }else{
        alert("Upps!. Try Again");
    }
}

btnSave.addEventListener('click',(e)=>{
    e.preventDefault();
    editUser();
    formButtons[0].classList.remove("hidden");
    formButtons[1].classList.add("hidden");
})

btnCancel.addEventListener('click',(e)=>{
    e.preventDefault(); 
    formButtons[0].classList.remove("hidden");
    formButtons[1].classList.add("hidden");
})

const deleteUser = async()=>{
    const arrguments={
        method: 'DELETE',
        mode: 'cors',
        headers:{
            'Authorization': `Token token="${getUser().token}"`,
            'Content-Type': "application/json",
        }
    }

    const response = await fetchToServer(`${URL_BASE}users/${getUser().id}`,arrguments);
    if(response.ok){
        window.location.href = "login.html";
    }else{
        alert("Upps!. Try Again");
    }
}

btnDelete.addEventListener('click',(e)=>{
    e.preventDefault(); 
    deleteUser();
})