const button = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const clearAllButton = document.getElementById('clearAll');

function jokesDom (joke) {
    const createLi = document.createElement("li");
    createLi.textContent = joke;
    jokeList.appendChild(createLi);
    const clearButton = document.createElement("button")
    clearButton.textContent = "Eliminar"
    createLi.appendChild(clearButton)

    clearButton.addEventListener('click', () => {
        createLi.remove();

        let chuckJokes = JSON.parse(localStorage.getItem("joke")) || [];
        chuckJokes = chuckJokes.filter(j => j!== joke);
        localStorage.setItem("joke", JSON.stringify(chuckJokes));

        console.log("LocalStorage después de borrar :", JSON.parse(localStorage.getItem("joke")));
    });

    clearAllButton.addEventListener('click', () => {
        jokeList.innerHTML = "";

        localStorage.clear();
    })
}


function jokesStorage () {
    jokeList.innerHTML = "";
    let chuckJokes = JSON.parse(localStorage.getItem("joke")) || [];
    for (let i = 0; i < chuckJokes.length; i++) {
        jokesDom(chuckJokes[i])
    }
}
jokesStorage();

button.addEventListener('click', () => {
    fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => {
            if (!response.ok) {
                throw new Error ("Se ha producido un error")
            }
            return response.json()
        })
        .then((data) => {
            let chuckJokes = JSON.parse(localStorage.getItem("joke")) || [];
            chuckJokes.unshift(data.value);
            localStorage.setItem("joke", JSON.stringify(chuckJokes))
            jokesStorage();
        })
        .catch(error => {
            console.log("Error obteniendo los chistes:", error);
        });
})


console.log(localStorage)