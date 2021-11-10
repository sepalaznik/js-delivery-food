const auth = () => {
    const buttonAuth = document.querySelector(".button-auth");
    const modalAuth = document.querySelector(".modal-auth");
    const buttonOut = document.querySelector(".button-out");
    const userLogin = document.querySelector(".user-login");
    const userName = document.querySelector(".user-name");
    const closeAuth = document.querySelector(".close-auth");
    const logInForm = document.getElementById("logInForm");
    const buttonCart = document.getElementById("cart-button");

    const login = (user) => {
        buttonAuth.style.display = "none";
        buttonOut.style.display = "flex";
        buttonCart.style.display = "flex";
        userLogin.style.display = "flex";
        userName.textContent = user.login;
        modalAuth.style.display = "none";
    };

    const logout = () => {
        buttonAuth.style.display = "flex";
        buttonOut.style.display = "none";
        buttonCart.style.display = "none";
        userLogin.style.display = "none";
        userName.textContent = "";
        localStorage.removeItem("customer")
    };

    buttonAuth.addEventListener("click", () => {
        modalAuth.style.display = "flex";
    });

    buttonOut.addEventListener("click", () => {
        logout();
    });

    closeAuth.addEventListener("click", () => {
        modalAuth.style.display = "none";
    });

    logInForm.addEventListener("submit", (event) => {
        const inputLogin = document.getElementById("login");
        const inputPassword = document.getElementById("input-password");

        event.preventDefault();
        const user = {
            login: inputLogin.value,
            password: inputPassword.value
        }
        if (user.login === "") {
            inputLogin.style.backgroundColor = "#ffc0cb";
            inputLogin.placeholder = "Заполните это поле!";
            setTimeout(() => { 
                inputLogin.style.backgroundColor = ""; 
                inputLogin.placeholder = "";
            }, 1500);
            
            return;
        }

        localStorage.setItem("customer", JSON.stringify(user));
        login(user);
    });

    if (localStorage.getItem("customer")) {
        login(JSON.parse(localStorage.getItem("customer")))
    };
};

auth();
