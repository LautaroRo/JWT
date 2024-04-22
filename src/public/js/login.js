const form = document.getElementById("loginForm")
const button = document.getElementById("button")

button.addEventListener("click", () => {
    console.log("hola desde lgoin")
})
form.addEventListener("submit", e => {
    e.preventDefault()

    const data = new FormData(form)
    console.log("hola")
    const obj = {}

    data.forEach((value,key) => obj[key] = value)

    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(data => {
        localStorage.setItem("token", data.acces_token)
        console.log(data)
    })
} )