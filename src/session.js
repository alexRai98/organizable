const inputs = document.getElementsByTagName("input");
const sessionsForm = document.querySelector("#form-sessions");
const linkRedirect = document.querySelector('.link-login');

const URL_BASE ="https://peaceful-inlet-99002.herokuapp.com/";

const getData = async(enpoint,obj)=>{
    const response = await fetch(enpoint,obj);
    const data = await response.json();
    return {
        data:data,
        response:response
    };
}

const sessionsUser =async(method,body,param,error)=>{
    const arrguments = {
        method: method,
        mode: 'cors',
        body: JSON.stringify(body),
        headers:{
            "Content-Type": "application/json"
        }
    }
    const userData = await getData(URL_BASE+param,arrguments);
    if(userData.response.ok){
        localStorage.setItem("user",JSON.stringify(userData.data));
        window.location.href = "my-boards.html";
    }else{
        alert(error);
    }
}

const login = ()=>{
    const body ={
        "username": inputs.username.value,
        "password": inputs.password.value
    }
    const errorMessage = "Username or password incorrect";
    sessionsUser("POST",body,"login",errorMessage);
};


const singUp = ()=>{
    const body ={
        "user": {
            "username": inputs.username.value,
            "email": inputs.email.value,
            "first_name": inputs.firstName.value,
            "last_name": inputs.lastName.value,
            "password": inputs.password.value
        }
    };
    const errorMessage = "Error creating account";
    sessionsUser("POST",body,"users",errorMessage);
}

sessionsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(sessionsForm.name === "login"){
        login();
    }else{
        singUp();
    }
});

linkRedirect.addEventListener('click',(e)=>{
    e.preventDefault();
    if(linkRedirect.name === "go_login"){
        window.location.href = "login.html";
    }else{
        window.location.href = "signUp.html";
    }
})