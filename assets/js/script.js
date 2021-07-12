const result = document.getElementById("result")
const templateCard = document.getElementById("template-card").content
const fragment = document.createDocumentFragment()
let cart = {}

document.addEventListener('DOMContentLoaded', () => catchTitle())

result.addEventListener("click", event => {
    addCart(event)
})

const catchTitle = async () => {
    const baseUrl = 'http://www.omdbapi.com/'
    try {
        const response = await fetch(`${baseUrl}/?apikey=f105dfc8&s="star wars"&type="movie"&page=1`)
        const data = await response.json()
        listMovies(data.Search)
    } catch (error) {
        console.error('ALGO SALIO MAL', error)
    }
}

const listMovies = data => {
    console.log(data)
    data.map(movies => {
        templateCard.querySelector("h5").textContent = movies.Title
        templateCard.querySelector("span").textContent = 10000
        templateCard.querySelector("img").setAttribute("src", movies.Poster)
        templateCard.querySelector(".btn").dataset.id = movies.imdbID
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    result.appendChild(fragment)
}

const addCart = event => {
    if(event.target.classList.contains("btn")) {
        setCart(event.target.parentElement)
    }
    event.stopPropagation()
}

const setCart = obj => {
    const movie = {
        id : obj.querySelector(".btn").dataset.id,
        title : obj.querySelector("h5").textContent,
        price : obj.querySelector("span").textContent,
        stock : 1
    }

    if(cart.hasOwnProperty(movie.id)) movie.stock = cart[movie.id].stock + 1

    cart[movie.id] = {...movie}
    console.log(cart)
}
