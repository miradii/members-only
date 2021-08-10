const form = document.querySelector("form");
const passwordError = document.querySelector("#password-error");
const emailError = document.querySelector("#email-error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    emailError.textContent = "";
    passwordError.textContent = "";
    console.log("here");
    //get the values
    const email = form.email.value;
    const password = form.password.value;
    try {
        const res = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
        }
        if (data.user) {
            location.assign("/");
        }
    } catch (error) {
        console.log(error);
    }
});
