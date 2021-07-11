const button = document.getElementById("button")
const result = document.getElementById("result")

const catchTitle = async () => {
    const baseUrl = 'http://www.omdbapi.com/'
    try {
        const response = await fetch(`${baseUrl}/?apikey=f105dfc8&s="star wars"&type="movie"&page=1`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('ALGO SALIO MAL', error)
    }
}

document.addEventListener('DOMContentLoaded', () => catchTitle().then(res => {
    const list = res.Search
    list.map(l => {result.innerHTML += `
        <div class="card col-12 col-md-6 col-lg-4">
            <img src="${l.Poster}" alt="Poster" style="width: 100%">
            <div class="containerCard">
                <h4><b>Titulo: ${l.Title}</b></h4>
                <p>Valor $10.000</p>
            </div>
            <button>Detalles</button> <button>Comprar</button>
        </div>
    `})
}))




