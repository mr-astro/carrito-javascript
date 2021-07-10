const button = document.getElementById("button")
const result = document.getElementById("result")

const catchTitle = async () => {
    const baseUrl = 'http://www.omdbapi.com/'
    const title = document.querySelector("#texto").value
    try {
        const response = await fetch(`${baseUrl}/?apikey=f105dfc8&t=${title}`)
        const data = await response.json()
        //console.log(title)
        console.log(data)
        return data

    } catch (error) {
        console.error('ALGO SALIO MAL', error)
    }
}

button.addEventListener('click', () => catchTitle().then(res => {
    result.innerHTML += `
    <img src="${res.Poster}" alt="Poster">
    <p>El titulo de la pelicula es ${res.Title} y su año de estreno es ${res.Year}<p>
    <p>${res.Plot}</p>
    `
}))




