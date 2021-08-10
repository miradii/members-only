const form = document.querySelector("form");
const firstnameError = document.querySelector("#firstname-error");
const lastnameError = document.querySelector("#lastname-error");
const passwordError = document.querySelector("#password-error");
const emailError = document.querySelector("#email-error");
const confirmError = document.querySelector("#confirm-error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    firstnameError.textContent = "";
    lastnameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";

    //get the values
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordConfirmation = form.confirm.value;
    try {
        const res = await fetch("/signup", {
            method: "POST",
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
                passwordConfirmation,
            }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log(data);
        if (data.errors) {
            firstnameError.textContent = data.errors.firstname;
            lastnameError.textContent = data.errors.lastname;
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            confirmError.textContent = data.errors.confirm;
        }
        if (data.user) {
            location.assign("/");
        }
    } catch (error) {
        console.error(error);
    }
});
