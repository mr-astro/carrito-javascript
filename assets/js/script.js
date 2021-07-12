const result = document.getElementById("result")
const cartTable = document.getElementById("cart-table")
const cartFooter = document.getElementById("cart-footer")
const templateCard = document.getElementById("template-card").content
const templateCart = document.getElementById("template-cart").content
const templateFooter = document.getElementById("template-footerCart").content
const fragment = document.createDocumentFragment()
let cart = {}

document.addEventListener('DOMContentLoaded', () => {
    catchTitle()
    if(localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
        saveCart()
    }

})

result.addEventListener("click", event => {
    addCart(event)
})

cartTable.addEventListener("click", event => {
    btnPlussLess(event)
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
    if(event.target.classList.contains("btn")) setCart(event.target.parentElement)
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
    saveCart()
}

const saveCart = () => {
    cartTable.innerHTML = ""
    Object.values(cart).forEach(product => {
        templateCart.querySelector("th").textContent = product.id
        templateCart.querySelectorAll("td")[0].textContent = product.title
        templateCart.querySelectorAll("td")[1].textContent = product.stock
        templateCart.querySelector(".btnPluss").dataset.id = product.id
        templateCart.querySelector(".btnLess").dataset.id = product.id
        templateCart.querySelector("span").textContent = product.stock * product.price

        const clone = templateCart.cloneNode(true)
        fragment.appendChild(clone)
    })

    cartTable.appendChild(fragment)
    totalFooter()

    localStorage.setItem("cart", JSON.stringify(cart))
}

const totalFooter = () => {
    cartFooter.innerHTML = " "
    if(Object.keys(cart).length === 0) {
        cartFooter.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }

    const sumStock = Object.values(cart).reduce((acum, {stock} ) => acum + stock, 0)
    const sumPrice = Object.values(cart).reduce((acum, {stock, price} ) => acum + (stock * price),0) 
    
    templateFooter.querySelectorAll("td")[0].textContent = sumStock
    templateFooter.querySelector("span").textContent = sumPrice

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    cartFooter.appendChild(fragment)

    const btnDelete = document.getElementById("delete-cart")
    btnDelete.addEventListener("click", () => {
        cart = {}
        saveCart()
    })
}

const btnPlussLess = event => {
    if(event.target.classList.contains("btnPluss")) {
        const pluss = cart[event.target.dataset.id]
        pluss.stock++
        cart[event.target.dataset.id] = {...pluss}
        saveCart()
    }

    if(event.target.classList.contains("btnLess")) {
        const pluss = cart[event.target.dataset.id]
        pluss.stock--
        if(pluss.stock === 0) {
            delete cart[event.target.dataset.id]
        }
        saveCart()
    }

    event.stopPropagation()
}