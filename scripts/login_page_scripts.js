
const loginButton = document.querySelector("#loginButton")


loginButton.addEventListener("click", login)
/*
ENTER key trigger the login procedure
*/
document.querySelector(".login-box").addEventListener("keypress", (event) => {
    if(event.keyCode == 13) {
        login();
    }
})

async function login() {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const info = {
        'username': username.value,
        'password': password.value
    }
    fetch("https://orbital-2024-peeka-book.onrender.com/login",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify( info )
    })
    .then(response =>response.json())
    .then(data => {
        if(data.message == "success") {
            proceedlogin();
        } else {
            proceedWrongIdentity();
        }
    })
}

function proceedWrongIdentity() {
    const wrongPasswordBox = document.querySelector("#wrongPassword");
    wrongPasswordBox.style.display="block";
    console.log(wrongPasswordBox);
}

function proceedlogin() {
    window.location.href="./main_page.html"
}
