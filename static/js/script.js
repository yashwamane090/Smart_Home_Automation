/* =====================================================
   SMART HOME AUTOMATION
   COMPLETE SCRIPT.JS
===================================================== */


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let currentUser = null;
let esp32Connected = false;


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Smart Home Dashboard Loaded");

    updateTime();

    setInterval(updateTime, 1000);

    loadSavedUser();

});


/* =====================================================
   TIME
===================================================== */

function updateTime() {

    const timeElement = document.getElementById("currentTime");

    if (!timeElement) {
        return;
    }

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const date = now.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    timeElement.innerText = `${date} | ${time}`;
}


/* =====================================================
   LANGUAGE
===================================================== */

function changeLanguage() {

    const language =
        document.getElementById("languageSelect").value;

    localStorage.setItem(
        "smartHomeLanguage",
        language
    );

    console.log("Language selected:", language);
}


/* =====================================================
   SHOW LOGIN
===================================================== */

function showLogin() {

    const welcome =
        document.getElementById("welcomeScreen");

    const login =
        document.getElementById("loginScreen");

    const signup =
        document.getElementById("signupScreen");

    const esp =
        document.getElementById("espSetupScreen");

    welcome.style.display = "none";

    login.style.display = "flex";

    signup.style.display = "none";

    esp.style.display = "none";
}


/* =====================================================
   SHOW SIGNUP
===================================================== */

function showSignup() {

    document.getElementById("welcomeScreen").style.display =
        "none";

    document.getElementById("loginScreen").style.display =
        "none";

    document.getElementById("signupScreen").style.display =
        "flex";

    document.getElementById("espSetupScreen").style.display =
        "none";
}


/* =====================================================
   CREATE ACCOUNT
===================================================== */

function createAccount() {

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("signupConfirm").value;


    if (name === "") {

        alert("Please enter your name.");

        return;
    }


    if (email === "") {

        alert("Please enter your email.");

        return;
    }


    if (!email.includes("@")) {

        alert("Please enter a valid email.");

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    const user = {

        name: name,

        email: email,

        password: password

    };


    /*
       Demo storage only.

       Later we will replace this with
       Flask + SQLite database.
    */

    localStorage.setItem(
        "smartHomeUser",
        JSON.stringify(user)
    );


    alert(
        "Account created successfully! Please login."
    );


    document.getElementById("signupName").value = "";

    document.getElementById("signupEmail").value = "";

    document.getElementById("signupPassword").value = "";

    document.getElementById("signupConfirm").value = "";


    showLogin();
}


/* =====================================================
   LOGIN
===================================================== */

function loginUser() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (email === "") {

        alert("Please enter your email.");

        return;
    }


    if (password === "") {

        alert("Please enter your password.");

        return;
    }


    const savedUser =
        JSON.parse(
            localStorage.getItem("smartHomeUser")
        );


    /*
       If no account exists,
       create demo login.
    */

    if (!savedUser) {

        if (
            email === "admin@smarthome.com" &&
            password === "123456"
        ) {

            currentUser = {

                name: "Admin",

                email: email

            };

            openESP32Setup();

            return;

        }


        alert(
            "No account found.\n\nCreate an account first."
        );

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        currentUser = {

            name: savedUser.name,

            email: savedUser.email

        };


        const remember =
            document.getElementById("rememberMe").checked;


        if (remember) {

            localStorage.setItem(
                "smartHomeLoggedIn",
                "true"
            );

        }


        alert("Login successful!");


        openESP32Setup();

    }

    else {

        alert(
            "Invalid email or password."
        );

    }

}


/* =====================================================
   GOOGLE LOGIN
===================================================== */

function googleLogin() {

    /*
       Real Google authentication will be added later
       using Google OAuth + Flask backend.
    */

    alert(
        "Google Login will be connected in the next step."
    );

}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

function forgotPassword() {

    const email =
        prompt(
            "Enter your registered email:"
        );


    if (!email) {

        return;
    }


    const savedUser =
        JSON.parse(
            localStorage.getItem("smartHomeUser")
        );


    if (
        savedUser &&
        email === savedUser.email
    ) {

        alert(
            "Password recovery will be connected to email service later."
        );

    }

    else {

        alert(
            "Email address not found."
        );

    }

}


/* =====================================================
   ESP32 SETUP
===================================================== */

function openESP32Setup() {

    document.getElementById("welcomeScreen").style.display =
        "none";

    document.getElementById("loginScreen").style.display =
        "none";

    document.getElementById("signupScreen").style.display =
        "none";

    document.getElementById("espSetupScreen").style.display =
        "flex";

}


/* =====================================================
   FIND ESP32
===================================================== */

function findESP32() {

    const deviceFound =
        document.getElementById("deviceFound");


    if (deviceFound) {

        deviceFound.style.display = "block";

    }


    alert(
        "Searching for ESP32..."
    );


    setTimeout(function () {

        if (deviceFound) {

            deviceFound.style.display = "block";

        }

    }, 1000);

}


/* =====================================================
   SCAN QR
===================================================== */

function scanQR() {

    alert(
        "QR Scanner will be connected later."
    );

}


/* =====================================================
   CONNECT ESP32
===================================================== */

function connectESP32() {

    esp32Connected = true;


    alert(
        "ESP32 connected successfully!"
    );


    document.getElementById("espSetupScreen").style.display =
        "none";

    document.getElementById("dashboardArea").style.display =
        "block";


    updateUserName();

    addLog(
        "ESP32 connected successfully"
    );

}


/* =====================================================
   UPDATE USER NAME
===================================================== */

function updateUserName() {

    const userName =
        document.getElementById("userName");

    const profileName =
        document.getElementById("profileName");


    if (!currentUser) {

        return;
    }


    if (userName) {

        userName.innerText =
            currentUser.name;

    }


    if (profileName) {

        profileName.innerText =
            `${currentUser.name} (${currentUser.email})`;

    }

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutUser() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {

        return;
    }


    currentUser = null;

    esp32Connected = false;


    localStorage.removeItem(
        "smartHomeLoggedIn"
    );


    document.getElementById("dashboardArea").style.display =
        "none";

    document.getElementById("welcomeScreen").style.display =
        "flex";

}


/* =====================================================
   LOAD SAVED USER
===================================================== */

function loadSavedUser() {

    const savedLogin =
        localStorage.getItem(
            "smartHomeLoggedIn"
        );


    const savedUser =
        JSON.parse(
            localStorage.getItem("smartHomeUser")
        );


    if (
        savedLogin === "true" &&
        savedUser
    ) {

        currentUser = {

            name: savedUser.name,

            email: savedUser.email

        };

    }

}


/* =====================================================
   LIGHT CONTROL
===================================================== */

function lightOn() {

    const status =
        document.getElementById("lightStatus");


    if (status) {

        status.innerText = "ON";

    }


    addLog(
        "💡 Living Room Light turned ON"
    );


    /*
       Later:

       fetch("/api/light/on")
    */

}


function lightOff() {

    const status =
        document.getElementById("lightStatus");


    if (status) {

        status.innerText = "OFF";

    }


    addLog(
        "💡 Living Room Light turned OFF"
    );

}


/* =====================================================
   FAN CONTROL
===================================================== */

function fanOn() {

    const status =
        document.getElementById("fanStatus");


    if (status) {

        status.innerText = "ON";

    }


    addLog(
        "🌀 Fan turned ON"
    );

}


function fanOff() {

    const status =
        document.getElementById("fanStatus");


    if (status) {

        status.innerText = "OFF";

    }


    addLog(
        "🌀 Fan turned OFF"
    );

}


/* =====================================================
   SMART PLUG
===================================================== */

function plugOn() {

    const status =
        document.getElementById("plugStatus");


    if (status) {

        status.innerText = "ON";

    }


    addLog(
        "🔌 Smart Plug turned ON"
    );

}


function plugOff() {

    const status =
        document.getElementById("plugStatus");


    if (status) {

        status.innerText = "OFF";

    }


    addLog(
        "🔌 Smart Plug turned OFF"
    );

}


/* =====================================================
   DOOR LOCK
===================================================== */

function lockDoor() {

    const status =
        document.getElementById("doorStatus");


    if (status) {

        status.innerText = "LOCKED";

    }


    addLog(
        "🚪 Door locked"
    );

}


function unlockDoor() {

    const status =
        document.getElementById("doorStatus");


    if (status) {

        status.innerText = "UNLOCKED";

    }


    addLog(
        "🚪 Door unlocked"
    );

}


/* =====================================================
   ACTIVITY LOG
===================================================== */

function addLog(message) {

    const logs =
        document.getElementById("logs");


    if (!logs) {

        return;
    }


    const item =
        document.createElement("li");


    const now =
        new Date();


    const time =
        now.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });


    item.innerText =
        `${time} - ${message}`;


    logs.insertBefore(
        item,
        logs.firstChild
    );


    /*
       Keep only latest 10 logs.
    */

    while (
        logs.children.length > 10
    ) {

        logs.removeChild(
            logs.lastChild
        );

    }

}


/* =====================================================
   SIDEBAR PAGE NAVIGATION
===================================================== */

function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function (page) {

        page.style.display = "none";

    });


    const selectedPage =
        document.getElementById(pageName);


    if (selectedPage) {

        selectedPage.style.display =
            "block";

    }


    /*
       Update sidebar active item
    */

    const menuItems =
        document.querySelectorAll(".menu li");


    menuItems.forEach(function (item) {

        item.classList.remove("active");

    });


    const clickedItem =
        Array.from(menuItems).find(
            item =>
                item.innerText
                    .toLowerCase()
                    .includes(
                        pageName.toLowerCase()
                    )
        );


    if (clickedItem) {

        clickedItem.classList.add("active");

    }

}


/* =====================================================
   DEMO SENSOR DATA
===================================================== */

function updateSensors() {

    const temperature =
        document.getElementById("tempGauge");

    const humidity =
        document.getElementById("humidityGauge");

    const power =
        document.getElementById("powerGauge");

    const soil =
        document.getElementById("soilGauge");


    /*
       Demo values.

       Later these values will come
       directly from ESP32.
    */


    if (temperature) {

        const temp =
            (25 + Math.random() * 5)
                .toFixed(1);

        temperature.innerText =
            `${temp}°C`;

    }


    if (humidity) {

        const hum =
            Math.floor(
                50 + Math.random() * 20
            );

        humidity.innerText =
            `${hum}%`;

    }


    if (power) {

        const watts =
            Math.floor(
                400 + Math.random() * 200
            );

        power.innerText =
            `${watts}W`;

    }


    if (soil) {

        const moisture =
            Math.floor(
                55 + Math.random() * 20
            );

        soil.innerText =
            `${moisture}%`;

    }

}


/* =====================================================
   UPDATE DEMO SENSORS EVERY 5 SECONDS
===================================================== */

setInterval(
    updateSensors,
    5000
);


/* =====================================================
   LANGUAGE SELECT EVENT
===================================================== */

const languageSelect =
    document.getElementById("languageSelect");


if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        changeLanguage
    );

}


/* =====================================================
   INITIAL SENSOR UPDATE
===================================================== */

setTimeout(
    updateSensors,
    1000
);


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "🏠 Smart Home Automation JS Loaded Successfully"
);

console.log(
    "📡 ESP32 connection ready for integration"
);