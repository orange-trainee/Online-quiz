// password show and hide using eye icon
var a;
var password = document.getElementById("password");
var pass_img = document.getElementById("view-img");

function pass_show() {
    if (a == 1) {
        password.type = 'password';
        pass_img.src = 'img/view.png';
        a = 0;
    }
    else {
        password.type = 'text';
        pass_img.src = 'img/hide.png';
        a = 1;
    }
}


let email = document.getElementById("email");
let pass = document.getElementById("password");


// variables to handle errors 
let err_email = document.getElementById("err_email");
let err_pass = document.getElementById("err_pass");

// Form validation and storing in local storage
let submitbtn = document.getElementById("submitbtn");


// form validation function
submitbtn.addEventListener('click', validate_form)

function validate_form(e) {
    // Prevent form from submitting
    e.preventDefault();

    // use a variable to check validity in easy way
    let bool = true;

    // check validity of email
    if (email.value == "") {
        err_email.textContent = "email is empty";
        email.style.borderColor = "RGB(246 81 41)";
        bool = false;
    }
    else if (!email.value.match(/^[\w\.\-]+@(gmail|yahoo|hotmail)\.com$/)) {
        err_email.textContent = "The email is not valid";
        email.style.borderColor = "RGB(246 81 41)";
        bool = false;
    } else {
        err_email.textContent = "";
        email.style.borderColor = "green";
    }

    // check validity of password and confirm password
    if (!pass.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        err_pass.textContent = "Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number";
        pass.style.borderColor = "RGB(246 81 41)";
        bool = false;
    } else {
        err_pass.textContent = "";
        pass.style.borderColor = "green";
    }

    // Retrieve user data from local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email and password match an existing user
    let foundUser = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email.value && users[i].password == pass.value) {
            foundUser = true;
            // Set session for current user with ID and name
            let currentUser = {
                id: i,
                name: users[i].full_name
            };
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
            break;
        }
    }

    if (foundUser) {
        // Redirect to dashboard page
        window.location.href = "user.html";
    } else {
        // Display error message for invalid login
        err_pass.textContent = "Invalid email or password";
        pass.style.borderColor = "RGB(246 81 41)";
        email.style.borderColor = "RGB(246 81 41)";
    }
}