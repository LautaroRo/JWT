
fetch("/api/current", {
    method: "GET",
    headers: {
        "authorization":`Bearer ${localStorage.getItem("token")}`
    }
}).then(response => {
    if(response.status === 401){
        window.location.replace("/login")
    }else{
        return response.json()
    }
}).then(data =>  {
    const parrafo = document.getElementById("result")

    parrafo.innerHTML= `Hola tus datos son ${data.payload.email}`
})