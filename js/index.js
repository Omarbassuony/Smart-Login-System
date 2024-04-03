var uesrName = document.getElementById("uesrName");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var signupbtn = document.getElementById("signupbtn");
var loginbtn = document.getElementById("loginbtn");
var welcommsg = document.getElementById("welcommsg");
var nameRegex = /^[a-zA-Z]{3,}$/;
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegex = /^(?=.*[a-zA-Z\d]{9}).{9,}$/;

function validate(element, regex) {
    if (regex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}
if(uesrName!=null){
    uesrName.addEventListener("input", function() {
        validate(uesrName, nameRegex);
    });
    
    userEmail.addEventListener("input", function() {
        validate(userEmail, emailRegex);
    });
    
    userPassword.addEventListener("input", function() {
        validate(userPassword, passwordRegex);
    });
}

function signup() {
    if (!validate(uesrName, nameRegex) || !validate(userEmail, emailRegex) || !validate(userPassword, passwordRegex)) {
        document.querySelector(".dangeralert").classList.replace("d-none", "d-block");
        document.querySelector(".successalert").classList.replace("d-block", "d-none");
        document.querySelector(".dangeralert1").classList.replace("d-block", "d-none");
        return;
    }
    
    var userEmailValue = userEmail.value;
    var savedUserInfoJSON = localStorage.getItem("userInfo");
    var userInfoArray = [];

    if (savedUserInfoJSON) {
        userInfoArray = JSON.parse(savedUserInfoJSON);
        for (var i = 0; i < userInfoArray.length; i++) {
            if (userInfoArray[i].email === userEmailValue) {
                document.querySelector(".dangeralert1").classList.replace("d-none", "d-block");
                document.querySelector(".successalert").classList.replace("d-block", "d-none");
                document.querySelector(".dangeralert").classList.replace("d-block", "d-none");
                return;
            }
        }
    }

    var userNameValue = uesrName.value;
    var userPasswordValue = userPassword.value;

    var userInfo = {
        name: userNameValue,
        email: userEmailValue,
        password: userPasswordValue
    };
    userInfoArray.push(userInfo);
    var userInfoJSON = JSON.stringify(userInfoArray);
    localStorage.setItem("userInfo", userInfoJSON);
    resetinputs()
    document.querySelector(".successalert").classList.replace("d-none", "d-block");
    document.querySelector(".dangeralert").classList.replace("d-block", "d-none");
    document.querySelector(".dangeralert1").classList.replace("d-block", "d-none");
}
var usernamelogin = localStorage.getItem("usernamelogin");

if(signupbtn!=null){

    signupbtn.addEventListener("click",signup)
}

function resetinputs()
{
    uesrName.value=null;
    uesrName.classList.remove("is-valid","is-invalid");
    userEmail.value=null;
    userEmail.classList.remove("is-valid","is-invalid");
    userPassword.value=null;
    userPassword.classList.remove("is-valid","is-invalid");
    document.querySelector(".successalert").classList.replace("d-block", "d-none");
}

function login() {
    var userEmailValue = userEmail.value;
    var userPasswordValue = userPassword.value;
    
    if (!userEmailValue || !userPasswordValue) {
        document.querySelector(".dangeralert").classList.replace("d-none", "d-block");
        document.querySelector(".dangeralert1").classList.replace("d-block", "d-none");
        return;
    }

    var savedUserInfoJSON = localStorage.getItem("userInfo");
    if (savedUserInfoJSON) {
        var savedUsers = JSON.parse(savedUserInfoJSON);
        var isUserFound = false;

        for (var i = 0; i < savedUsers.length; i++) {
            var savedUser = savedUsers[i];
            if (savedUser.email === userEmailValue && savedUser.password === userPasswordValue) {
                isUserFound = true;
                localStorage.setItem("usernamelogin",savedUser.name);
                window.location.href = "./home.html";
                break;
            }
        }

        if (!isUserFound) {
            document.querySelector(".dangeralert1").classList.replace("d-none", "d-block");
            document.querySelector(".dangeralert").classList.replace("d-block", "d-none");
        }
    } else {
        document.querySelector(".dangeralert1").classList.replace("d-none", "d-block");
        document.querySelector(".dangeralert").classList.replace("d-block", "d-none");
    }
}

if(loginbtn!=null){

    loginbtn.addEventListener("click", login);
}

if(welcommsg!=null){

    welcommsg.append(usernamelogin);
}

