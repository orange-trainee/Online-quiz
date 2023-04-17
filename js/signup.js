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

//confirm password show and hide using eye icon
var conf_password = document.getElementById("confirm-password");
var conf_pass_img = document.getElementById("conf-view-img");
var a = 1;

function conf_pass_show() {
    if (a == 1) {
        conf_password.type = 'password';
        conf_pass_img.src = 'img/view.png';
        a = 0;
    }
    else {
        conf_password.type = 'text';
        conf_pass_img.src = 'img/hide.png';
        a = 1;
    }
}

let full_name = document.getElementById("full-name");
let email = document.getElementById("email");
let pass = document.getElementById("password");
let cpass = document.getElementById("confirm-password");
let check = document.getElementById("policy-terms");

// variables to handle errors 
let err_name = document.getElementById("err_name");
let err_email = document.getElementById("err_email");
let err_pass = document.getElementById("err_pass");
let err_cpass = document.getElementById("err_cpass");
let err_check = document.getElementById("err_check");

// Form validation and storing in local storage
let submitbtn = document.getElementById("submitbtn");

//use this array to push data from form to local storage
let users = [];

// form validation function
submitbtn.addEventListener('click', validate_form)
function validate_form(e) {

    // use a variable to cheeck validity in easy way
    let bool = true;


    //check validity of name
    if (full_name.value == "") {
        err_name.textContent = "User name is empty";
        full_name.style.borderColor = "RGB(246 81 41)";
        bool = false;
    } else {
        err_name.textContent = "";
        full_name.style.borderColor = "green";
    }

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
    if (pass.value !== cpass.value) {
        err_cpass.textContent = "Passwords do not match";
        cpass.style.borderColor = "RGB(246 81 41)";
        bool = false;
    } else {
        err_cpass.textContent = "";
        cpass.style.borderColor = "green";
    }



    // check checkbox if checked
    if (!check.checked) {
        err_check.textContent = "you have to accept the policy and terms";
        bool = false;
    } else {
        err_check.textContent = "";
    }



    if (bool == false) {
        e.preventDefault();
    } else {
        window.alert('accepted registration')
        // store values to local storage
        // Get existing users from local storage or create empty array
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Create user object from form data
        let user = {
            full_name: full_name.value,
            email: email.value,
            password: pass.value,
            confirm_password: cpass.value,
        };

        // Append user object to users array
        users.push(user);

        // Store updated users array in local storage
        localStorage.setItem("users", JSON.stringify(users));

        sessionStorage.setItem("currentUser", JSON.stringify(user));
        if (sessionStorage.getItem("currentUser")) {
            // Retrieve user object from session storage
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            // Log the user in automatically
            // ...
        }

        // Clear form inputs for next user
        full_name.value = "";
        email.value = "";
        pass.value = "";
        cpass.value = "";

    }
}
sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");
